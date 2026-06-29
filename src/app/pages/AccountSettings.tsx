import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { AlertTriangle, CheckCircle2, Loader2, LogOut, Trash2, UserRound } from "lucide-react";
import { authApi, getApiErrorMessage, memberApplicationApi, type MemberApplicationStatus } from "@/api";
import { useAuth } from "@/store/auth";
import { maskPhone } from "../utils/user";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

const ROLE_LABELS: Record<string, string> = {
  user: "普通用户",
  member: "会员",
  admin: "管理员",
};

const phonePattern = /^1\d{10}$/;
const codePattern = /^\d{6}$/;

export function AccountSettings() {
  const { isAuthenticated, isLoading, user, updateProfile, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [application, setApplication] = useState<MemberApplicationStatus | null | undefined>(undefined);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");

  // Phone change state - separate state for phone change messages
  const [showPhoneChange, setShowPhoneChange] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [changingPhone, setChangingPhone] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setNickname(user?.nickname ?? "");
  }, [user?.nickname]);

  useEffect(() => {
    if (user?.role === "user") {
      memberApplicationApi.mine().then((v) => setApplication(v ?? null)).catch(() => setApplication(null));
    }
  }, [user?.role]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => setCooldown((value) => Math.max(value - 1, 0)), 1_000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

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

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      await authApi.deleteAccount();
      await logout();
      navigate("/");
    } catch (err) {
      setError(getApiErrorMessage(err, "注销账号失败"));
    } finally {
      setDeleting(false);
    }
  }

  async function handleSendPhoneCode() {
    setPhoneError("");
    setPhoneMessage("");
    if (!phonePattern.test(newPhone)) {
      setPhoneError("请输入 11 位中国大陆手机号");
      return;
    }
    setSendingCode(true);
    try {
      await authApi.sendCode(newPhone);
      setCooldown(60);
      setPhoneMessage("验证码已发送，请查收");
    } catch (err) {
      setPhoneError(getApiErrorMessage(err, "验证码发送失败"));
    } finally {
      setSendingCode(false);
    }
  }

  async function handleChangePhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPhoneError("");
    setPhoneMessage("");
    if (!phonePattern.test(newPhone)) {
      setPhoneError("请输入正确的手机号");
      return;
    }
    if (!codePattern.test(phoneCode)) {
      setPhoneError("请输入 6 位验证码");
      return;
    }
    setChangingPhone(true);
    try {
      const result = await authApi.changePhone(newPhone, phoneCode);
      setUser(result.user);
      setPhoneMessage("手机号已成功更新");
      setTimeout(() => {
        setShowPhoneChange(false);
        setNewPhone("");
        setPhoneCode("");
        setPhoneMessage("");
      }, 1500);
    } catch (err) {
      setPhoneError(getApiErrorMessage(err, "修改手机号失败"));
    } finally {
      setChangingPhone(false);
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
          <p className="mt-2 text-gray-600">设置你的社区昵称、修改手机号或注销账号。</p>
        </div>

        {/* 个人资料 - 昵称修改 */}
        <Card className="border-blue-100 shadow-sm mb-6">
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
            <CardDescription>昵称会显示在登录后的个人中心入口。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="nickname" className="text-sm font-medium text-gray-700 block text-left px-3">昵称</label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  maxLength={50}
                  placeholder="请输入昵称"
                />
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 py-4 px-3">
                <div className="mb-1 text-sm font-medium text-gray-700 text-left">账号角色</div>
                <p className="text-base font-semibold text-gray-900">
                  {user?.role ? (ROLE_LABELS[user.role] ?? user.role) : "—"}
                </p>
                {user?.role === "user" && (
                  <div className="mt-3">
                    {application === undefined ? null : application?.status === "pending" ? (
                      <div className="flex items-center gap-1.5 text-sm text-amber-700">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        申请已提交，等待管理员审核
                      </div>
                    ) : application?.status === "approved" ? (
                      <div className="flex items-center gap-1.5 text-sm text-green-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        申请已通过，请重新登录生效
                      </div>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        disabled={applying}
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={async () => {
                          setApplyError("");
                          setApplying(true);
                          try {
                            const result = await memberApplicationApi.apply();
                            setApplication(result);
                          } catch (err) {
                            setApplyError(getApiErrorMessage(err, "申请失败，请稍后重试"));
                          } finally {
                            setApplying(false);
                          }
                        }}
                      >
                        {applying ? <Loader2 className="animate-spin mr-1.5 h-3.5 w-3.5" /> : null}
                        申请成为会员
                      </Button>
                    )}
                    {applyError && (
                      <p className="mt-2 text-xs text-red-600">{applyError}</p>
                    )}
                  </div>
                )}
              </div>

              {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                {saving ? <Loader2 className="animate-spin mr-2" /> : null}
                保存昵称
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 修改手机号 - 独立卡片 */}
        <Card className="border-blue-100 shadow-sm mb-6">
          <CardHeader>
            <CardTitle>修改手机号</CardTitle>
            <CardDescription>修改账号绑定的手机号，需要接收验证码验证。</CardDescription>
          </CardHeader>
          <CardContent>
            {!showPhoneChange ? (
              <>
                <div className="rounded-xl border border-gray-100 bg-gray-50 py-4 px-3 mb-4">
                  <div className="mb-1 text-sm font-medium text-gray-700">当前手机号</div>
                  <p className="text-lg font-semibold text-gray-900">{maskPhone(user?.phone)}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPhoneChange(true)}
                  className="w-full"
                >
                  修改手机号
                </Button>
              </>
            ) : (
              <form className="space-y-4" onSubmit={handleChangePhone}>
                <div className="rounded-xl border border-blue-100 bg-blue-50 py-4 px-3 mb-4">
                  <div className="text-sm font-medium text-blue-700">当前手机号</div>
                  <p className="text-lg font-semibold text-blue-900">{maskPhone(user?.phone)}</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-phone" className="text-sm font-medium text-gray-700 block text-left px-3">新手机号</label>
                  <Input
                    id="new-phone"
                    value={newPhone}
                    onChange={(event) => setNewPhone(event.target.value.replace(/\D/g, "").slice(0, 11))}
                    inputMode="numeric"
                    placeholder="请输入 11 位新手机号"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone-code" className="text-sm font-medium text-gray-700 block text-left px-3">验证码</label>
                  <div className="flex gap-2">
                    <Input
                      id="phone-code"
                      value={phoneCode}
                      onChange={(event) => setPhoneCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                      inputMode="numeric"
                      placeholder="6 位验证码"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendPhoneCode}
                      disabled={cooldown > 0 || sendingCode}
                      className="min-w-28"
                    >
                      {sendingCode ? <Loader2 className="animate-spin" /> : cooldown > 0 ? `${cooldown}s` : "发送验证码"}
                    </Button>
                  </div>
                </div>

                {phoneMessage && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{phoneMessage}</p>}
                {phoneError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{phoneError}</p>}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPhoneChange(false);
                      setNewPhone("");
                      setPhoneCode("");
                      setPhoneError("");
                      setPhoneMessage("");
                    }}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    disabled={!phonePattern.test(newPhone) || !codePattern.test(phoneCode) || changingPhone}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {changingPhone ? <Loader2 className="animate-spin mr-2" /> : "确认修改"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* 注销账号 - 独立卡片 */}
        <Card className="border-red-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              注销账号
            </CardTitle>
            <CardDescription>注销后将永久删除您的账号及所有相关数据，此操作不可恢复。</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={deleting}
                  className="w-full border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  注销账号
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-red-200">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    确认注销账号
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    <div className="mt-4 space-y-3">
                      <p>此操作将永久删除您的账号，包括：</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>所有个人资料信息</li>
                        <li>登录凭证和访问记录</li>
                        <li>与账号关联的所有数据</li>
                      </ul>
                      <div className="rounded-lg bg-red-50 p-3 text-red-700 text-sm border border-red-100">
                        <strong>⚠️ 重要提示：</strong>此操作不可撤销，删除后无法恢复任何数据。
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3 sm:gap-3">
                  <AlertDialogCancel disabled={deleting} className="flex-1 mt-0">
                    取消
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      handleDeleteAccount();
                    }}
                    disabled={deleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    确认注销
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
