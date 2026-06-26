import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Download, Eye, FileText, Loader2, Package, Search } from "lucide-react";
import { documentsApi, getApiErrorMessage, isTooManyRequests, softwareApi, tagsApi, type PaginatedResponse, type ResourceItem, type ResourceTag } from "@/api";
import { useAuth } from "@/store/auth";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

type ResourceType = "documents" | "software";

type FilterOption = { value: string; label: string };

function tagOptions(tags: ResourceTag[] | undefined, allLabel: string): FilterOption[] {
  // Be defensive: the API may return a non-array (e.g. {} when a list is empty),
  // so guard with Array.isArray instead of relying on `?? []` (which only catches null/undefined).
  return [
    { value: "", label: allLabel },
    ...(Array.isArray(tags) ? tags : [])
      .filter((tag) => tag.is_active)
      .map((tag) => ({ value: tag.value, label: tag.label_zh })),
  ];
}

function optionMap(options: FilterOption[]): Record<string, string> {
  return Object.fromEntries(options.filter((option) => option.value).map((option) => [option.value, option.label]));
}

function normalizeList(data: PaginatedResponse<ResourceItem> | ResourceItem[] | undefined, page: number, pageSize: number): PaginatedResponse<ResourceItem> {
  if (!data) return { items: [], total: 0, page, page_size: pageSize };
  if (Array.isArray(data)) return { items: data, total: data.length, page, page_size: pageSize };
  return {
    items: data.items ?? [],
    total: data.total ?? data.items?.length ?? 0,
    page: data.page ?? page,
    page_size: data.size ?? data.page_size ?? pageSize,
    pages: data.pages,
  };
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

function ChipBar({ label, options, selected, onSelect, disabled }: { label: string; options: FilterOption[]; selected: string; onSelect: (v: string) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="shrink-0 font-medium text-gray-500">{label}</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option.value)}
          className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-50 ${
            selected === option.value
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {option.value === "" ? "全部" : option.label}
        </button>
      ))}
    </div>
  );
}

function getTitle(item: ResourceItem) {
  return item.title || item.name || item.original_name || item.filename || `资源 #${item.id}`;
}

function formatFileSize(size?: number) {
  if (!size) return "未知大小";
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${(size / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

function getDownloadUrl(payload: { download_url?: string; url?: string }) {
  return payload.download_url || payload.url || "";
}

export function Resources() {
  const { isMember, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ResourceType>(() => location.pathname.endsWith("/software") ? "software" : "documents");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [series, setSeries] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<PaginatedResponse<ResourceItem>>({ items: [], total: 0, page: 1, page_size: 10 });
  const [brandOptions, setBrandOptions] = useState<FilterOption[]>([{ value: "", label: "全部品牌" }]);
  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([{ value: "", label: "全部类型" }]);
  const [seriesOptions, setSeriesOptions] = useState<FilterOption[]>([{ value: "", label: "全部系列" }]);
  const [allSeriesOptions, setAllSeriesOptions] = useState<FilterOption[]>([{ value: "", label: "全部系列" }]);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
  const [previewingId, setPreviewingId] = useState<string | number | null>(null);
  const [error, setError] = useState("");
  const [rateLimitError, setRateLimitError] = useState("");
  // Stays in lockstep with activeTab so async handlers can compare against
  // the latest value (the captured prop in their closure may be stale).
  const activeTabRef = useRef(activeTab);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const totalPages = useMemo(() => data.pages ?? Math.max(1, Math.ceil(data.total / data.page_size)), [data]);
  const brandMap = useMemo(() => optionMap(brandOptions), [brandOptions]);
  const categoryMap = useMemo(() => optionMap(categoryOptions), [categoryOptions]);
  const seriesMap = useMemo(() => optionMap(allSeriesOptions), [allSeriesOptions]);

  const loadResources = useCallback(async () => {
    setLoading(true);
    setError("");
    const requestedTab = activeTab;
    try {
      const baseParams = { page, size: pageSize, brand: brand || undefined, category: category || undefined, keyword: keyword || undefined, published_only: true };
      // Only documents have a "series" dimension. Do not leak the document
      // series filter into software requests; the backend has removed the
      // legacy software.series field entirely.
      const params = requestedTab === "software"
        ? { ...baseParams, expand_versions: true }
        : { ...baseParams, series: series || undefined };
      const result = requestedTab === "documents" ? await documentsApi.list(params) : await softwareApi.list(params);
      // Compare against the ref — if the user clicked the other tab while
      // this request was in flight, drop the stale result.
      if (requestedTab !== activeTabRef.current) return;
      setData(normalizeList(result, page, pageSize));
    } catch (err) {
      if (requestedTab !== activeTabRef.current) return;
      setError(getApiErrorMessage(err, "资源加载失败"));
      setData({ items: [], total: 0, page, page_size: pageSize });
    } finally {
      if (requestedTab === activeTabRef.current) setLoading(false);
    }
  }, [activeTab, brand, category, series, keyword, page, pageSize]);

  useEffect(() => {
    const routeTab = location.pathname.endsWith("/software") ? "software" : "documents";
    if (routeTab !== activeTab) {
      setActiveTab(routeTab);
      setBrand("");
      setCategory("");
      setSeries("");
      setPage(1);
    }
  }, [activeTab, location.pathname]);

  useEffect(() => {
    const loadFilters = async () => {
      setFiltersLoading(true);
      try {
        const tagPrefix = activeTab === "documents" ? "doc" : "sw";
        // Software has no "series" concept — only documents load series tags.
        const [nextBrands, nextCategories, nextSeries] = await Promise.all([
          tagsApi.list(`${tagPrefix}_brand`),
          tagsApi.list(`${tagPrefix}_category`),
          activeTab === "documents" ? tagsApi.list("doc_series") : Promise.resolve([]),
        ]);
        setBrandOptions(tagOptions(nextBrands, "全部品牌"));
        setCategoryOptions(tagOptions(nextCategories, "全部类型"));
        setAllSeriesOptions(tagOptions(nextSeries, "全部系列"));
      } catch (err) {
        setError(getApiErrorMessage(err, "筛选项加载失败"));
        setBrandOptions([{ value: "", label: "全部品牌" }]);
        setCategoryOptions([{ value: "", label: "全部类型" }]);
        setAllSeriesOptions([{ value: "", label: "全部系列" }]);
      } finally {
        setFiltersLoading(false);
      }
    };
    void loadFilters();
  }, [activeTab]);

  useEffect(() => {
    const loadSeries = async () => {
      // Software has no "series" concept — skip the cascading series fetch entirely.
      if (activeTab !== "documents" || !category) {
        setSeriesOptions([{ value: "", label: "全部系列" }]);
        setSeries("");
        return;
      }
      setFiltersLoading(true);
      try {
        const nextSeries = await tagsApi.list("doc_series", category, brand || undefined);
        setSeriesOptions(tagOptions(nextSeries, "全部系列"));
      } catch (err) {
        setError(getApiErrorMessage(err, "系列筛选项加载失败"));
        setSeriesOptions([{ value: "", label: "全部系列" }]);
      } finally {
        setFiltersLoading(false);
      }
    };
    void loadSeries();
  }, [activeTab, brand, category]);

  useEffect(() => {
    void loadResources();
  }, [loadResources]);

  function handleTabChange(nextTab: ResourceType) {
    setActiveTab(nextTab);
    setBrand("");
    setCategory("");
    setSeries("");
    setPage(1);
    setError("");
    navigate(nextTab === "documents" ? "/resources/documents" : "/resources/software");
  }

  function handleSearch() {
    setPage(1);
    void loadResources();
  }

  async function getLink(item: ResourceItem): Promise<string | null> {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: location.pathname } } });
      return null;
    }
    if (!isMember) {
      setError("在线预览和下载功能仅会员及以上角色可用，请联系管理员升级账号");
      return null;
    }
    setError("");
    setRateLimitError("");
    try {
      // Software in expand-versions mode carries version_id — request the
      // exact version's link, not just the latest.
      const result = activeTab === "documents"
        ? await documentsApi.downloadLink(item.id)
        : (item.version_id
            ? await softwareApi.downloadVersionLink(item.id, item.version_id)
            : await softwareApi.downloadLink(item.id));
      const url = getDownloadUrl(result);
      if (!url) throw new Error("后端未返回下载链接");
      void loadResources();
      return url;
    } catch (err) {
      if (isTooManyRequests(err)) {
        setRateLimitError("今日下载次数已用完，请明天再试");
      } else {
        setError(getApiErrorMessage(err, "下载链接获取失败"));
      }
      return null;
    }
  }

  async function getPreviewUrl(item: ResourceItem): Promise<string | null> {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: location.pathname } } });
      return null;
    }
    if (!isMember) {
      setError("在线预览和下载功能仅会员及以上角色可用，请联系管理员升级账号");
      return null;
    }
    setError("");
    setRateLimitError("");
    try {
      const result = await documentsApi.previewLink(item.id);
      const url = result.preview_url || result.url || "";
      if (!url) throw new Error("后端未返回预览链接");
      void loadResources();
      return url;
    } catch (err) {
      if (isTooManyRequests(err)) {
        setRateLimitError("今日文档预览次数已用完，请明天再试");
      } else {
        setError(getApiErrorMessage(err, "预览链接获取失败"));
      }
      return null;
    }
  }

  async function handlePreview(item: ResourceItem) {
    setPreviewingId(item.id);
    const url = await getPreviewUrl(item);
    setPreviewingId(null);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleDownload(item: ResourceItem) {
    setDownloadingId(item.id);
    const url = await getLink(item);
    setDownloadingId(null);
    if (!url) return;
    const filename = getTitle(item);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <SEO
        title="下载中心｜openIndu"
        description="openIndu 下载中心提供 PLC/HMI 开发资料、品牌手册、软件工具与最佳实践下载。"
        keywords="PLC手册,HMI手册,工业软件,品牌资料,openIndu下载中心"
        canonicalPath="/resources"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">下载中心</h1>
            <p className="mt-2 text-gray-600">按品牌、分类和关键词快速查找 PLC/HMI 开发资料与工具软件。</p>
          </div>
          {!isAuthenticated ? (
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              资源列表可直接浏览，在线预览和下载需要先登录。
            </div>
          ) : !isMember ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              当前账号可浏览列表，在线预览和下载仅会员及以上角色可用。
            </div>
          ) : null}
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-5">
              <Tabs>
                <TabsList>
                  <TabsTrigger active={activeTab === "documents"} onClick={() => handleTabChange("documents")}>文档</TabsTrigger>
                  <TabsTrigger active={activeTab === "software"} onClick={() => handleTabChange("software")}>软件</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3">
              <ChipBar label="品牌：" options={brandOptions} selected={brand} disabled={filtersLoading} onSelect={(value) => { setBrand(value); setSeries(""); setPage(1); }} />
              <ChipBar label="类型：" options={categoryOptions} selected={category} disabled={filtersLoading} onSelect={(value) => { setCategory(value); setSeries(""); setPage(1); }} />
              {activeTab === "documents" && category && seriesOptions.length > 1 ? (
                <ChipBar label="系列：" options={seriesOptions} selected={series} disabled={filtersLoading} onSelect={(value) => { setSeries(value); setPage(1); }} />
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[220px] flex-1 sm:max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input className="pl-9" value={keyword} onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") handleSearch(); }} placeholder="输入关键词搜索资源" />
                </div>
                <Button type="button" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">搜索</Button>
                {(brand || category || series || keyword) ? (
                  <Button type="button" variant="outline" onClick={() => { setBrand(""); setCategory(""); setSeries(""); setKeyword(""); setPage(1); }}>清空筛选</Button>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {rateLimitError && <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{rateLimitError}</div>}

        <div className="space-y-4">
          {loading ? (
            <Card><CardContent className="flex items-center justify-center gap-2 p-10 text-gray-600"><Loader2 className="animate-spin" /> 正在加载资源...</CardContent></Card>
          ) : data.items.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-gray-500">暂无匹配资源，请调整筛选条件后重试。</CardContent></Card>
          ) : (
            data.items.map((item) => (
              <Card key={`${item.id}-${item.version_id ?? 'none'}`} className="hover:border-blue-200 hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {activeTab === "documents" ? <FileText /> : <Package />}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{getTitle(item)}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description || "暂无资源简介"}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="rounded-full bg-gray-100 px-2 py-1">品牌：{item.brand ? (brandMap[item.brand] ?? item.brand) : "未分类"}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">类型：{item.category ? (categoryMap[item.category] ?? item.category) : "未分类"}</span>
                        {activeTab === "documents" && item.series ? <span className="rounded-full bg-gray-100 px-2 py-1">系列：{seriesMap[item.series] ?? item.series}</span> : null}
                        <span className="rounded-full bg-gray-100 px-2 py-1">大小：{formatFileSize(item.file_size ?? item.latest_version_size)}</span>
                        {activeTab === "software" && (item.version || item.latest_version) && (
                          <span className="rounded-full bg-gray-100 px-2 py-1">
                            版本：{item.version || item.latest_version}
                            {item.is_latest_version && <span className="ml-1 text-blue-600">(最新)</span>}
                          </span>
                        )}
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">下载 {item.download_count ?? 0} 次</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 md:self-center">
                    {activeTab === "documents" && (
                      <Button type="button" variant="outline" onClick={() => void handlePreview(item)} disabled={previewingId === item.id || downloadingId === item.id}>
                        {previewingId === item.id ? <Loader2 className="animate-spin" /> : <Eye />}
                        在线预览
                      </Button>
                    )}
                    <Button type="button" variant="outline" onClick={() => void handleDownload(item)} disabled={downloadingId === item.id || previewingId === item.id}>
                      {downloadingId === item.id ? <Loader2 className="animate-spin" /> : <Download />}
                      下载
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-500">第 {page} / {totalPages} 页</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">共 {data.total} 条资源</span>
            <Select className="h-9 w-24" value={String(pageSize)} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} aria-label="每页数量">
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n} 条/页</option>)}
            </Select>
            <div className="flex gap-2">
              <Button type="button" variant="outline" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(value - 1, 1))}>上一页</Button>
              <Button type="button" variant="outline" disabled={page >= totalPages || loading} onClick={() => setPage((value) => value + 1)}>下一页</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
