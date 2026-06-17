import { describe, it, expect } from "vitest";
import { AxiosError } from "axios";
import type { AxiosResponse } from "axios";

// Import the functions to test — they use the real axios module (not mocked)
import {
  getApiErrorMessage,
  isTooManyRequests,
  authApi,
  documentsApi,
  softwareApi,
  portalApi,
} from "@/api";

describe("getApiErrorMessage", () => {
  it("should return detail from AxiosError response data", () => {
    const error = new AxiosError("Network Error", "ERR", undefined, undefined, {
      status: 400,
      data: { detail: "手机号格式错误" },
    } as AxiosResponse);

    expect(getApiErrorMessage(error)).toBe("手机号格式错误");
  });

  it("should return message from AxiosError response data", () => {
    const error = new AxiosError("Network Error", "ERR", undefined, undefined, {
      status: 400,
      data: { message: "请求参数错误" },
    } as AxiosResponse);

    expect(getApiErrorMessage(error)).toBe("请求参数错误");
  });

  it("should return AxiosError message if no detail/message", () => {
    const error = new AxiosError("Timeout", "ECONNABORTED");

    expect(getApiErrorMessage(error)).toBe("Timeout");
  });

  it("should return Error.message for non-Axios errors", () => {
    const error = new Error("Something went wrong");
    expect(getApiErrorMessage(error)).toBe("Something went wrong");
  });

  it("should return fallback for unknown errors", () => {
    expect(getApiErrorMessage("unknown", "默认错误")).toBe("默认错误");
  });

  it("should return default fallback when not provided", () => {
    expect(getApiErrorMessage("unknown")).toBe("请求失败，请稍后重试");
  });
});

describe("isTooManyRequests", () => {
  it("should return true for 429 status", () => {
    const error = new AxiosError("Too Many", "ERR", undefined, undefined, {
      status: 429,
      data: {},
    } as AxiosResponse);

    expect(isTooManyRequests(error)).toBe(true);
  });

  it("should return false for non-429 status", () => {
    const error = new AxiosError("Not Found", "ERR", undefined, undefined, {
      status: 404,
      data: {},
    } as AxiosResponse);

    expect(isTooManyRequests(error)).toBe(false);
  });

  it("should return false for non-Axios errors", () => {
    expect(isTooManyRequests(new Error("test"))).toBe(false);
  });
});

describe("API client functions (type definitions)", () => {
  it("authApi should have expected methods", () => {
    expect(typeof authApi.sendCode).toBe("function");
    expect(typeof authApi.login).toBe("function");
    expect(typeof authApi.register).toBe("function");
    expect(typeof authApi.refresh).toBe("function");
    expect(typeof authApi.me).toBe("function");
    expect(typeof authApi.logout).toBe("function");
  });

  it("documentsApi should have expected methods", () => {
    expect(typeof documentsApi.list).toBe("function");
    expect(typeof documentsApi.get).toBe("function");
    expect(typeof documentsApi.downloadLink).toBe("function");
  });

  it("softwareApi should have expected methods", () => {
    expect(typeof softwareApi.list).toBe("function");
    expect(typeof softwareApi.get).toBe("function");
    expect(typeof softwareApi.downloadLink).toBe("function");
  });

  it("portalApi should have expected methods", () => {
    expect(typeof portalApi.hero).toBe("function");
    expect(typeof portalApi.solutions).toBe("function");
    expect(typeof portalApi.carousel).toBe("function");
  });
});
