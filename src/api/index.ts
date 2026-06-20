import axios, { AxiosError, type AxiosResponse } from "axios";

export type UserRole = "user" | "member" | "admin";

export interface User {
  id: number | string;
  phone: string;
  role: UserRole;
  nickname?: string;
  is_active?: boolean;
  is_blacklisted?: boolean;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface AuthResponse extends AuthTokens {
  user?: User;
}

export interface NestedAuthResponse {
  user?: User;
  tokens?: AuthTokens & {
    expires_in?: number;
    access_jti?: string;
    refresh_jti?: string;
    access_expires_at?: string;
    refresh_expires_at?: string;
  };
}

export interface ApiEnvelope<T> {
  code?: number;
  data?: T;
  message?: string;
  detail?: string;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
  keyword?: string;
  brand?: string;
  category?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages?: number;
}

export interface ResourceItem {
  id: number | string;
  title?: string;
  name?: string;
  filename?: string;
  original_name?: string;
  brand?: string;
  category?: string;
  description?: string;
  file_size?: number;
  download_count?: number;
  version?: string;
  latest_version?: string;
  created_at?: string;
  upload_time?: string;
}

export interface DownloadLinkResponse {
  download_url?: string;
  url?: string;
  expires_in?: number;
  filename?: string;
}

export type OptionValue = string;


const STORAGE_KEYS = {
  token: "openindu_portal_token",
  refreshToken: "openindu_portal_refresh_token",
} as const;

function normalizeApiPath(url?: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.pathname.replace(/^\/api\/v\d+/, "");
  } catch {
    return url.split("?")[0].replace(/^\/api\/v\d+/, "");
  }
}

export function isPublicApiRequest(method?: string, url?: string) {
  if ((method ?? "get").toLowerCase() !== "get") return false;
  const path = normalizeApiPath(url);
  return (
    path === "/documents" ||
    path === "/software" ||
    path === "/documents/brands/list" ||
    path === "/documents/categories/list" ||
    path === "/software/brands/list" ||
    path === "/software/categories/list"
  );
}

export function shouldRedirectToLogin(method?: string, url?: string) {
  const path = normalizeApiPath(url);
  if (path.startsWith("/auth/")) return false;
  return !isPublicApiRequest(method, url);
}

export function unwrap<T>(response: AxiosResponse<ApiEnvelope<T> | T>): T {
  const body = response.data;
  if (body && typeof body === "object" && "data" in body) {
    return (body as ApiEnvelope<T>).data as T;
  }
  return body as T;
}

export function normalizeAuthResponse(payload: AuthResponse | NestedAuthResponse): AuthResponse {
  if ("tokens" in payload && payload.tokens) {
    return {
      ...payload.tokens,
      user: payload.user,
    };
  }
  return payload as AuthResponse;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api/v1",
  timeout: 15_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiEnvelope<unknown>>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
      localStorage.removeItem("openindu_portal_user");
      if (window.location.pathname !== "/login" && shouldRedirectToLogin(error.config?.method, error.config?.url)) {
        window.location.assign(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      }
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  async sendCode(phone: string) {
    return unwrap(await apiClient.post<ApiEnvelope<{ success: boolean }>>("/auth/send-code", { phone }));
  },
  async login(phone: string, code: string) {
    return normalizeAuthResponse(unwrap(await apiClient.post<ApiEnvelope<AuthResponse | NestedAuthResponse>>("/auth/login", { phone, code })));
  },
  async register(phone: string, code: string) {
    return normalizeAuthResponse(unwrap(await apiClient.post<ApiEnvelope<AuthResponse | NestedAuthResponse>>("/auth/register", { phone, code })));
  },
  async refresh(refreshToken: string) {
    return normalizeAuthResponse(unwrap(await apiClient.post<ApiEnvelope<AuthResponse | NestedAuthResponse>>("/auth/refresh", { refresh_token: refreshToken })));
  },
  async me() {
    return unwrap(await apiClient.get<ApiEnvelope<User>>("/auth/me"));
  },
  async updateMe(payload: { nickname?: string | null }) {
    return unwrap(await apiClient.patch<ApiEnvelope<User>>("/auth/me", payload));
  },
  async logout() {
    return unwrap(await apiClient.post<ApiEnvelope<{ success: boolean }>>("/auth/logout"));
  },
};

export const documentsApi = {
  async list(params: PaginationParams) {
    return unwrap(await apiClient.get<ApiEnvelope<PaginatedResponse<ResourceItem>>>("/documents", { params }));
  },
  async get(id: number | string) {
    return unwrap(await apiClient.get<ApiEnvelope<ResourceItem>>(`/documents/${id}`));
  },
  async downloadLink(id: number | string) {
    return unwrap(await apiClient.get<ApiEnvelope<DownloadLinkResponse>>(`/documents/${id}/download-link`));
  },
  async brands() {
    return unwrap(await apiClient.get<ApiEnvelope<OptionValue[]>>("/documents/brands/list"));
  },
  async categories() {
    return unwrap(await apiClient.get<ApiEnvelope<OptionValue[]>>("/documents/categories/list"));
  },
};

export const softwareApi = {
  async list(params: PaginationParams) {
    return unwrap(await apiClient.get<ApiEnvelope<PaginatedResponse<ResourceItem>>>("/software", { params }));
  },
  async get(id: number | string) {
    return unwrap(await apiClient.get<ApiEnvelope<ResourceItem>>(`/software/${id}`));
  },
  async downloadLink(id: number | string) {
    return unwrap(await apiClient.get<ApiEnvelope<DownloadLinkResponse>>(`/software/${id}/download-link`));
  },
  async brands() {
    return unwrap(await apiClient.get<ApiEnvelope<OptionValue[]>>("/software/brands/list"));
  },
  async categories() {
    return unwrap(await apiClient.get<ApiEnvelope<OptionValue[]>>("/software/categories/list"));
  },
};

export const visitsApi = {
  async track(path = window.location.pathname) {
    return unwrap(await apiClient.post<ApiEnvelope<{ tracked: boolean }>>("/visits/track", { path }));
  },
};

export interface PortalContentRecord<T = Record<string, unknown>> {
  id: number;
  content?: T | null;
}

export function unwrapPortalContent<T>(value: T | PortalContentRecord<T>): T {
  if (value !== null && typeof value === "object" && "content" in value) {
    const record = value as PortalContentRecord<T>;
    return (record.content ?? {}) as T;
  }
  return value as T;
}

export function unwrapPortalList<T>(
  value: T[] | { items?: Array<T | PortalContentRecord<T>> | null } | undefined,
): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if ("items" in value) {
    const items = (value as { items?: unknown[] | null }).items;
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => unwrapPortalContent(item as T | PortalContentRecord<T>)) as T[];
  }
  return [];
}

export const portalApi = {
  async hero() {
    const raw = unwrap(await apiClient.get<ApiEnvelope<unknown>>("/portal/hero"));
    return unwrapPortalContent(raw);
  },
  async solutions() {
    const raw = unwrap(await apiClient.get<ApiEnvelope<unknown>>("/portal/solutions"));
    return unwrapPortalList(raw as unknown[] | { items?: Array<unknown> | null });
  },
  async carousel() {
    const raw = unwrap(await apiClient.get<ApiEnvelope<unknown>>("/portal/carousel"));
    return unwrapPortalList(raw as unknown[] | { items?: Array<unknown> | null });
  },
};


export function getApiErrorMessage(error: unknown, fallback = "请求失败，请稍后重试") {
  if (axios.isAxiosError<ApiEnvelope<unknown>>(error)) {
    const data = error.response?.data;
    return data?.detail || data?.message || error.message || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export function isTooManyRequests(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 429;
}
