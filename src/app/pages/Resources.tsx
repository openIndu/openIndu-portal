import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Download, Eye, FileText, Loader2, Package, Search } from "lucide-react";
import { documentsApi, getApiErrorMessage, isTooManyRequests, softwareApi, type PaginatedResponse, type ResourceItem } from "@/api";
import { useAuth } from "@/store/auth";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

type ResourceType = "documents" | "software";

type FilterOption = { value: string; label: string };

const brandLabels: Record<string, string> = {
  siemens: "西门子",
  mitsubishi: "三菱",
  omron: "欧姆龙",
  keyence: "基恩士",
  inovance: "汇川",
  other: "其他",
};

const categoryLabels: Record<string, string> = {
  "plc-manual": "PLC 编程手册",
  "hardware-manual": "硬件手册",
  "driver-manual": "驱动器手册",
  "hmi-manual": "HMI 手册",
  "software-manual": "软件手册",
  "best-practice": "最佳实践",
  "electrical-standard": "电气规范",
  "plc-ide": "PLC 编程软件",
  "hmi-ide": "HMI 组态软件",
  "plc-driver": "PLC 驱动/通信组件",
  utility: "工具软件",
  firmware: "固件",
  other: "其他",
};

function toOptions(values: string[], allLabel: string, labels: Record<string, string>): FilterOption[] {
  return [
    { value: "", label: allLabel },
    ...values.map((value) => ({ value, label: labels[value] ?? value })),
  ];
}

function normalizeList(data: PaginatedResponse<ResourceItem> | ResourceItem[] | undefined, page: number): PaginatedResponse<ResourceItem> {
  if (!data) return { items: [], total: 0, page, page_size: 10 };
  if (Array.isArray(data)) return { items: data, total: data.length, page, page_size: 10 };
  return {
    items: data.items ?? [],
    total: data.total ?? data.items?.length ?? 0,
    page: data.page ?? page,
    page_size: data.page_size ?? 10,
    pages: data.pages,
  };
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
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PaginatedResponse<ResourceItem>>({ items: [], total: 0, page: 1, page_size: 10 });
  const [brandOptions, setBrandOptions] = useState<FilterOption[]>([{ value: "", label: "全部品牌" }]);
  const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([{ value: "", label: "全部分类" }]);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
  const [previewingId, setPreviewingId] = useState<string | number | null>(null);
  const [error, setError] = useState("");
  const [rateLimitError, setRateLimitError] = useState("");

  const totalPages = useMemo(() => data.pages ?? Math.max(1, Math.ceil(data.total / data.page_size)), [data]);

  const loadResources = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, page_size: 10, brand: brand || undefined, category: category || undefined, keyword: keyword || undefined, ...(activeTab === "documents" ? { published_only: true } : {}) };
      const result = activeTab === "documents" ? await documentsApi.list(params) : await softwareApi.list(params);
      setData(normalizeList(result, page));
    } catch (err) {
      setError(getApiErrorMessage(err, "资源加载失败"));
      setData({ items: [], total: 0, page, page_size: 10 });
    } finally {
      setLoading(false);
    }
  }, [activeTab, brand, category, keyword, page]);

  useEffect(() => {
    const routeTab = location.pathname.endsWith("/software") ? "software" : "documents";
    if (routeTab !== activeTab) {
      setActiveTab(routeTab);
      setCategory("");
      setPage(1);
    }
  }, [activeTab, location.pathname]);

  useEffect(() => {
    const loadFilters = async () => {
      setFiltersLoading(true);
      try {
        const [nextBrands, nextCategories] = activeTab === "documents"
          ? await Promise.all([documentsApi.brands(), documentsApi.categories()])
          : await Promise.all([softwareApi.brands(), softwareApi.categories()]);
        setBrandOptions(toOptions(nextBrands, "全部品牌", brandLabels));
        setCategoryOptions(toOptions(nextCategories, "全部分类", categoryLabels));
      } catch (err) {
        setError(getApiErrorMessage(err, "筛选项加载失败"));
        setBrandOptions([{ value: "", label: "全部品牌" }]);
        setCategoryOptions([{ value: "", label: "全部分类" }]);
      } finally {
        setFiltersLoading(false);
      }
    };
    void loadFilters();
  }, [activeTab]);

  useEffect(() => {
    void loadResources();
  }, [loadResources]);

  function handleTabChange(nextTab: ResourceType) {
    setActiveTab(nextTab);
    setCategory("");
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
      setError("下载功能仅会员及以上角色可用，请联系管理员升级账号");
      return null;
    }
    setError("");
    setRateLimitError("");
    try {
      const result = activeTab === "documents" ? await documentsApi.downloadLink(item.id) : await softwareApi.downloadLink(item.id);
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

  async function handlePreview(item: ResourceItem) {
    setPreviewingId(item.id);
    const url = await getLink(item);
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
        title="资源中心｜openIndu"
        description="openIndu 资源中心提供 PLC/HMI 开发资料、品牌手册、软件工具与最佳实践下载。"
        keywords="PLC手册,HMI手册,工业软件,品牌资料,openIndu资源中心"
        canonicalPath="/resources"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">文档与软件下载</h1>
            <p className="mt-2 text-gray-600">按品牌、分类和关键词快速查找 PLC/HMI 开发资料与工具软件。</p>
          </div>
          {!isAuthenticated ? (
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              资源列表可直接浏览，点击下载时需要先登录。
            </div>
          ) : !isMember ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              当前账号可浏览列表，下载功能仅会员及以上角色可用。
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

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_200px_1fr_auto]">
              <Select value={brand} onChange={(event) => { setBrand(event.target.value); setPage(1); }} aria-label="品牌筛选" disabled={filtersLoading}>
                {brandOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </Select>
              <Select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} aria-label="分类筛选" disabled={filtersLoading}>
                {categoryOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </Select>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input className="pl-9" value={keyword} onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") handleSearch(); }} placeholder="输入关键词搜索资源" />
              </div>
              <Button type="button" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">搜索</Button>
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
              <Card key={item.id} className="hover:border-blue-200 hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {activeTab === "documents" ? <FileText /> : <Package />}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{getTitle(item)}</h2>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description || "暂无资源简介"}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="rounded-full bg-gray-100 px-2 py-1">品牌：{item.brand || "未分类"}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">分类：{item.category || "未分类"}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-1">大小：{formatFileSize(item.file_size)}</span>
                        {activeTab === "software" && (item.latest_version || item.version) && <span className="rounded-full bg-gray-100 px-2 py-1">版本：{item.latest_version || item.version}</span>}
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">下载 {item.download_count ?? 0} 次</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2 md:self-center">
                    <Button type="button" variant="outline" onClick={() => void handlePreview(item)} disabled={previewingId === item.id || downloadingId === item.id}>
                      {previewingId === item.id ? <Loader2 className="animate-spin" /> : <Eye />}
                      在线预览
                    </Button>
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
