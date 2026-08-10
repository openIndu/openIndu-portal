/** Supported locale codes. */
export type Locale = "zh" | "en";

/**
 * Detect the current locale from the browser URL pathname.
 * - "/en" or "/en/..." → "en"
 * - everything else → "zh" (default)
 *
 * Reads `window.location.pathname` at call time so that tests can mutate it.
 */
export function detectLocale(): Locale {
  const pathname = window.location.pathname;
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "zh";
}

/** React Router basename for a locale: "en" → "/en", "zh" → "/". */
export function basenameFor(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

/**
 * Locale-aware /login path for hard `window.location` redirects (the axios
 * 401 interceptor runs outside the router and can't rely on its basename).
 * "en" → "/en/login", "zh" → "/login".
 */
export function loginPath(): string {
  return detectLocale() === "en" ? "/en/login" : "/login";
}

/**
 * Strip the locale prefix from a pathname.
 *   "/en/vision" → "/vision"
 *   "/en"       → "/"
 *   "/vision"   → "/vision"  (no-op)
 */
export function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname === "/en") return "/";
  return pathname;
}

/**
 * Build an alternate-language path from the current pathname.
 *   ("/vision", "en")               → "/en/vision"
 *   ("/en/vision", "zh")            → "/vision"
 *   ("/privacy", "en", false)       → "/"        (legal fallback)
 *   ("/en/privacy", "zh", false)    → "/privacy"
 */
export function alternatePath(
  currentPath: string,
  targetLocale: Locale,
  localized: boolean,
): string {
  const stripped = stripLocalePrefix(currentPath);
  if (!localized) {
    // Legal pages: target is always the ZH version.
    // If switching to EN from a legal page, go home.
    return targetLocale === "zh" ? stripped : "/";
  }
  return targetLocale === "en" ? `/en${stripped}` : stripped;
}
