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

export interface PortalHero {
  title: string;
  subtitle?: string;
  primary_cta_text?: string;
  primary_cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
}

export interface PortalSolution {
  id: number | string;
  title: string;
  description: string;
  link?: string;
  icon?: string;
  status?: string;
}

export interface PortalCarouselItem {
  id: number | string;
  title: string;
  description?: string;
  image_url: string;
  alt?: string;
}

const STORAGE_KEYS = {
  token: "openindu_portal_token",
  refreshToken: "openindu_portal_refresh_token",
} as const;

function unwrap<T>(response: AxiosResponse<ApiEnvelope<T> | T>): T {
  const body = response.data;
  if (body && typeof body === "object" && "data" in body) {
    return (body as ApiEnvelope<T>).data as T;
  }
  return body as T;
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
      if (window.location.pathname !== "/login") {
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
    return unwrap(await apiClient.post<ApiEnvelope<AuthResponse>>("/auth/login", { phone, code }));
  },
  async register(phone: string, code: string) {
    return unwrap(await apiClient.post<ApiEnvelope<AuthResponse>>("/auth/register", { phone, code }));
  },
  async refresh(refreshToken: string) {
    return unwrap(await apiClient.post<ApiEnvelope<AuthResponse>>("/auth/refresh", { refresh_token: refreshToken }));
  },
  async me() {
    return unwrap(await apiClient.get<ApiEnvelope<User>>("/auth/me"));
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
};

export const portalApi = {
  async hero() {
    return unwrap(await apiClient.get<ApiEnvelope<PortalHero>>("/portal/hero"));
  },
  async solutions() {
    return unwrap(await apiClient.get<ApiEnvelope<PortalSolution[]>>("/portal/solutions"));
  },
  async carousel() {
    return unwrap(await apiClient.get<ApiEnvelope<PortalCarouselItem[]>>("/portal/carousel"));
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
