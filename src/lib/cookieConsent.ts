export const COOKIE_CONSENT_KEY = "openindu_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsent = {
  version: number;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function readCookieConsent(
  storage: StorageLike = window.localStorage,
): CookieConsent | null {
  try {
    const raw = storage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookieConsent>;
    if (
      value.version !== COOKIE_CONSENT_VERSION ||
      value.necessary !== true ||
      typeof value.analytics !== "boolean" ||
      typeof value.updatedAt !== "string"
    ) {
      return null;
    }
    return value as CookieConsent;
  } catch {
    return null;
  }
}

export function saveCookieConsent(
  analytics: boolean,
  storage: StorageLike = window.localStorage,
): CookieConsent | null {
  const value: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  try {
    storage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
    return value;
  } catch {
    return null;
  }
}

export function analyticsAllowed(preference: CookieConsent | null): boolean {
  return preference?.version === COOKIE_CONSENT_VERSION && preference.analytics;
}
