import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { Loader2, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { getApiErrorMessage } from "@/api";
import { useAuth } from "@/store/auth";
import { maskPhone } from "../utils/user";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

const ROLE_LABELS: Record<string, string> = {
  user: "普通用户",
  member: "会员",
  admin: "管理员",
};

export function AccountSettings() {
  const { isAuthenticated, isLoading, user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setNickname(user?.nickname ?? "");
  }, [user?.nickname]);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: "/account" } }} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const nextNickname = nickname.trim();
    if (nextNickname.length > 50) {
      setError("昵称不能超过 50 个字符");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ nickname: nextNickname || null });
      setMessage("账号设置已保存");
    } catch (err) {
      setError(getApiErrorMessage(err, "保存账号设置失败"));
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="账号设置｜openIndu"
        description="管理 openIndu社区账号昵称与个人资料。"
        canonicalPath="/account"
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <UserRound className="h-4 w-4" />
            个人中心
          </div>
          <h1 className="text-3xl font-bold text-gray-900">账号设置</h1>
          <p className="mt-2 text-gray-600">设置你的社区昵称。手机号属于敏感信息，页面仅展示脱敏结果。</p>
        </div>

        <Card className="border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
            <CardDescription>昵称会显示在登录后的个人中心入口。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="nickname" className="text-sm font-medium text-gray-700">昵称</label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  maxLength={50}
                  placeholder="请输入昵称"
                />
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  手机号
                </div>
                <p className="text-lg font-semibold text-gray-900">{maskPhone(user?.phone)}</p>
                <p className="mt-1 text-xs text-gray-500">为保护隐私，手机号不完整展示。</p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-1 text-sm font-medium text-gray-700">账号角色</div>
                <p className="text-base font-semibold text-gray-900">
                  {user?.role ? (ROLE_LABELS[user.role] ?? user.role) : "—"}
                </p>
              </div>

              {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                {saving ? <Loader2 className="animate-spin" /> : null}
                保存设置
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="mb-3 text-sm text-gray-600">注销后将清除本地登录状态并返回首页。</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleLogout()}
            disabled={loggingOut}
            className="border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            注销登录
          </Button>
        </div>
      </div>
    </section>
  );
}
