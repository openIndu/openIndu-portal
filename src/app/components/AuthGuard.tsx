import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/store/auth";
import type { UserRole } from "@/api";

interface AuthGuardProps {
  role?: UserRole;
}

export function AuthGuard({ role }: AuthGuardProps) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!hasRole(role)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-amber-900">
          <h1 className="mb-3 text-2xl font-semibold">权限不足</h1>
          <p>该页面仅面向成员及以上角色开放，请联系管理员升级账号权限。</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
