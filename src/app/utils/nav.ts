/** The subset of a header nav item needed to decide its active state. */
export interface NavMatchable {
  /** Where the item links to. */
  href: string;
  /**
   * Path prefixes that mark this item active. Defaults to `[href]`.
   * A dropdown parent uses its children's roots here so it doesn't fight a
   * sibling that happens to share its `href` (e.g. "Projects" and
   * "Architecture" both pointing at `/architecture`).
   */
  match?: string[];
}

/**
 * Is `pathname` "inside" this nav item?
 *
 * Locale-neutral: `pathname` is expected to already have the router basename
 * stripped (react-router's `useLocation().pathname` does this), so prefixes
 * like `/vision` match both `/vision` and `/en/vision` routes.
 *
 * Matching is segment-aware — `/architecture` matches `/architecture` and
 * `/architecture/x` but NOT `/architecture-x`.
 */
export function isNavItemActive(item: NavMatchable, pathname: string): boolean {
  const paths = item.match ?? [item.href];
  return paths.some((path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  });
}
