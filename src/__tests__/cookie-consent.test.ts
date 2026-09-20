import { describe, expect, it } from "vitest";
import {
  analyticsAllowed,
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VERSION,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookieConsent";

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("cookie consent", () => {
  it("fails closed when no preference exists", () => {
    expect(readCookieConsent(memoryStorage())).toBeNull();
    expect(analyticsAllowed(null)).toBe(false);
  });

  it("persists an analytics opt-in", () => {
    const storage = memoryStorage();
    const saved = saveCookieConsent(true, storage);
    expect(saved).toMatchObject({
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: true,
    });
    expect(analyticsAllowed(readCookieConsent(storage))).toBe(true);
  });

  it("persists an analytics rejection", () => {
    const storage = memoryStorage();
    saveCookieConsent(false, storage);
    expect(readCookieConsent(storage)?.analytics).toBe(false);
    expect(analyticsAllowed(readCookieConsent(storage))).toBe(false);
  });

  it.each(["not-json", "{}", '{"version":0,"necessary":true,"analytics":true,"updatedAt":"now"}'])(
    "rejects malformed or obsolete value %s",
    (value) => expect(readCookieConsent(memoryStorage({ [COOKIE_CONSENT_KEY]: value }))).toBeNull(),
  );

  it("fails closed when storage access throws", () => {
    const storage = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    };
    expect(readCookieConsent(storage)).toBeNull();
    expect(saveCookieConsent(true, storage)).toBeNull();
  });
});
