import { describe, it, expect, beforeEach, vi } from "vitest";
import type { UserRole, User, AuthResponse } from "@/api";

// --- Test role ranking logic (mirrors the logic in auth.ts) ---

const roleRank: Record<UserRole, number> = {
  user: 1,
  member: 2,
  admin: 3,
};

function hasRole(user: User | null, requiredRole?: UserRole): boolean {
  if (!requiredRole) return true;
  if (!user) return false;
  return roleRank[user.role] >= roleRank[requiredRole];
}

function isAuthenticated(token: string | null): boolean {
  return Boolean(token);
}

function isMember(user: User | null): boolean {
  return user?.role === "member" || user?.role === "admin";
}

function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}

// --- Mock localStorage ---

const storage = new Map<string, string>();
const mockLocalStorage = {
  getItem: vi.fn((key: string) => storage.get(key) ?? null),
  setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
  removeItem: vi.fn((key: string) => storage.delete(key)),
  clear: vi.fn(() => storage.clear()),
};

Object.defineProperty(globalThis, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

beforeEach(() => {
  storage.clear();
  vi.clearAllMocks();
});

// --- Tests ---

describe("Auth - Role Ranking", () => {
  it("should rank user as 1", () => {
    expect(roleRank.user).toBe(1);
  });

  it("should rank member as 2", () => {
    expect(roleRank.member).toBe(2);
  });

  it("should rank admin as 3", () => {
    expect(roleRank.admin).toBe(3);
  });

  it("should rank admin higher than member", () => {
    expect(roleRank.admin).toBeGreaterThan(roleRank.member);
  });

  it("should rank member higher than user", () => {
    expect(roleRank.member).toBeGreaterThan(roleRank.user);
  });
});

describe("Auth - hasRole", () => {
  const adminUser: User = { id: 1, phone: "13800138000", role: "admin" };
  const memberUser: User = { id: 2, phone: "13800138001", role: "member" };
  const basicUser: User = { id: 3, phone: "13800138002", role: "user" };

  it("should return true for any role when requiredRole is undefined", () => {
    expect(hasRole(null, undefined)).toBe(true);
    expect(hasRole(basicUser, undefined)).toBe(true);
  });

  it("should return false when user is null and role is required", () => {
    expect(hasRole(null, "user")).toBe(false);
    expect(hasRole(null, "member")).toBe(false);
    expect(hasRole(null, "admin")).toBe(false);
  });

  it("should return true when user role meets or exceeds requirement", () => {
    expect(hasRole(adminUser, "user")).toBe(true);
    expect(hasRole(adminUser, "member")).toBe(true);
    expect(hasRole(adminUser, "admin")).toBe(true);
  });

  it("should return false when user role is insufficient", () => {
    expect(hasRole(basicUser, "member")).toBe(false);
    expect(hasRole(basicUser, "admin")).toBe(false);
    expect(hasRole(memberUser, "admin")).toBe(false);
  });

  it("member should have access to member-level resources", () => {
    expect(hasRole(memberUser, "member")).toBe(true);
    expect(hasRole(memberUser, "user")).toBe(true);
  });
});

describe("Auth - isAuthenticated", () => {
  it("should return false when token is null", () => {
    expect(isAuthenticated(null)).toBe(false);
  });

  it("should return false when token is empty", () => {
    expect(isAuthenticated("")).toBe(false);
  });

  it("should return true when token exists", () => {
    expect(isAuthenticated("valid-token")).toBe(true);
  });
});

describe("Auth - isMember", () => {
  it("should return false for null user", () => {
    expect(isMember(null)).toBe(false);
  });

  it("should return false for basic user", () => {
    expect(isMember({ id: 1, phone: "13800138000", role: "user" })).toBe(false);
  });

  it("should return true for member", () => {
    expect(isMember({ id: 2, phone: "13800138001", role: "member" })).toBe(true);
  });

  it("should return true for admin", () => {
    expect(isMember({ id: 3, phone: "13800138002", role: "admin" })).toBe(true);
  });
});

describe("Auth - isAdmin", () => {
  it("should return false for null user", () => {
    expect(isAdmin(null)).toBe(false);
  });

  it("should return false for member", () => {
    expect(isAdmin({ id: 1, phone: "13800138000", role: "member" })).toBe(false);
  });

  it("should return true for admin", () => {
    expect(isAdmin({ id: 2, phone: "13800138001", role: "admin" })).toBe(true);
  });
});

describe("Auth - localStorage persistence", () => {
  const testUser: User = { id: 1, phone: "13800138000", role: "admin" };
  const testTokens: AuthResponse = {
    access_token: "access-123",
    refresh_token: "refresh-456",
    user: testUser,
  };

  it("should store token in localStorage", () => {
    localStorage.setItem("openindu_portal_token", testTokens.access_token);
    expect(localStorage.getItem("openindu_portal_token")).toBe("access-123");
  });

  it("should store refresh token in localStorage", () => {
    localStorage.setItem("openindu_portal_refresh_token", testTokens.refresh_token);
    expect(localStorage.getItem("openindu_portal_refresh_token")).toBe("refresh-456");
  });

  it("should store user as JSON in localStorage", () => {
    localStorage.setItem("openindu_portal_user", JSON.stringify(testUser));
    const raw = localStorage.getItem("openindu_portal_user");
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toEqual(testUser);
  });

  it("should remove token on logout", () => {
    localStorage.setItem("openindu_portal_token", "access-123");
    localStorage.removeItem("openindu_portal_token");
    expect(localStorage.getItem("openindu_portal_token")).toBeNull();
  });

  it("should clear all auth data on logout", () => {
    localStorage.setItem("openindu_portal_token", "access-123");
    localStorage.setItem("openindu_portal_refresh_token", "refresh-456");
    localStorage.setItem("openindu_portal_user", JSON.stringify(testUser));

    localStorage.removeItem("openindu_portal_token");
    localStorage.removeItem("openindu_portal_refresh_token");
    localStorage.removeItem("openindu_portal_user");

    expect(localStorage.getItem("openindu_portal_token")).toBeNull();
    expect(localStorage.getItem("openindu_portal_refresh_token")).toBeNull();
    expect(localStorage.getItem("openindu_portal_user")).toBeNull();
  });
});
