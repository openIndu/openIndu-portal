import type { User } from "@/api";

export function maskPhone(phone?: string) {
  if (!phone) return "未绑定手机号";
  if (phone.length < 7) return phone.replace(/\d/g, "*");
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
}

export function getDisplayName(user: User | null) {
  return user?.nickname?.trim() || "个人中心";
}
