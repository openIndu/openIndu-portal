import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Download, FileText, Loader2, Package, Search } from "lucide-react";
import { documentsApi, getApiErrorMessage, isTooManyRequests, softwareApi, type PaginatedResponse, type ResourceItem } from "@/api";
import { useAuth } from "@/store/auth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

type ResourceType = "documents" | "software";

const brands = [
  { value: "", label: "全部品牌" },
  { value: "siemens", label: "西门子" },
  { value: "mitsubishi", label: "三菱" },
  { value: "omron", label: "欧姆龙" },
  { value: "keyence", label: "基恩士" },
  { value: "inovance", label: "汇川" },
  { value: "other", label: "其他" },
];

const documentCategories = [
  { value: "", label: "全部分类" },
  { value: "plc-manual", label: "PLC 编程手册" },
  { value: "hardware-manual", label: "硬件手册" },
  { value: "driver-manual", label: "驱动器手册" },
  { value: "hmi-manual", label: "HMI 手册" },
  { value: "software-manual", label: "软件手册" },
  { value: "best-practice", label: "最佳实践" },
  { value: "electrical-standard", label: "电气规范" },
  { value: "other", label: "其他" },
];

const softwareCategories = [
  { value: "", label: "全部分类" },
  { value: "plc-software", label: "PLC 编程软件" },
  { value: "hmi-software", label: "HMI 组态软件" },
  { value: "driver-software", label: "驱动调试软件" },
  { value: "utility", label: "工具软件" },
  { value: "other", label: "其他" },
];

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
  const { isMember } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ResourceType>(() => location.pathname.endsWith("/software") ? "software" : "documents");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PaginatedResponse<ResourceItem>>({ items: [], total: 0, page: 1, page_size: 10 });
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
  const [error, setError] = useState("");

  const categories = activeTab === "documents" ? documentCategories : softwareCategories;
  const totalPages = useMemo(() => data.pages ?? Math.max(1, Math.ceil(data.total / data.page_size)), [data]);

  const loadResources = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, page_size: 10, brand: brand || undefined, category: category || undefined, keyword: keyword || undefined };
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

  async function handleDownload(item: ResourceItem) {
    setDownloadingId(item.id);
    setError("");
    try {
      const result = activeTab === "documents" ? await documentsApi.downloadLink(item.id) : await softwareApi.downloadLink(item.id);
      const url = getDownloadUrl(result);
      if (!url) throw new Error("后端未返回下载链接");
      window.open(url, "_blank", "noopener,noreferrer");
      void loadResources();
    } catch (err) {
      if (isTooManyRequests(err)) {
        window.alert("今日下载次数已用完");
      } else {
        setError(getApiErrorMessage(err, "下载链接获取失败"));
      }
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">成员资源中心</p>
            <h1 className="text-3xl font-bold text-gray-900">文档与软件下载</h1>
            <p className="mt-2 text-gray-600">按品牌、分类和关键词快速查找 PLC/HMI 开发资料与工具软件。</p>
          </div>
          {!isMember && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              当前账号可浏览列表，下载功能仅 member 及以上角色可见。
            </div>
          )}
        </div>

        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Tabs>
                <TabsList>
                  <TabsTrigger active={activeTab === "documents"} onClick={() => handleTabChange("documents")}>文档</TabsTrigger>
                  <TabsTrigger active={activeTab === "software"} onClick={() => handleTabChange("software")}>软件</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="text-sm text-gray-500">共 {data.total} 条资源</div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_200px_1fr_auto]">
              <Select value={brand} onChange={(event) => { setBrand(event.target.value); setPage(1); }} aria-label="品牌筛选">
                {brands.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </Select>
              <Select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }} aria-label="分类筛选">
                {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
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
                  {isMember && (
                    <Button type="button" variant="outline" onClick={() => void handleDownload(item)} disabled={downloadingId === item.id} className="md:self-center">
                      {downloadingId === item.id ? <Loader2 className="animate-spin" /> : <Download />}
                      下载
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-500">第 {page} / {totalPages} 页</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(value - 1, 1))}>上一页</Button>
            <Button type="button" variant="outline" disabled={page >= totalPages || loading} onClick={() => setPage((value) => value + 1)}>下一页</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
