import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  "/about": [
    { label: "Home", href: "/" },
    { label: "About openIndu", current: true }
  ],
  "/developers": [
    { label: "Home", href: "/" },
    { label: "Developers", current: true }
  ],
  "/team": [
    { label: "Home", href: "/" },
    { label: "Team", current: true }
  ],
  "/forum": [
    { label: "Home", href: "/" },
    { label: "Forum", current: true }
  ],
  "/motion-control": [
    { label: "Home", href: "/" },
    { label: "Motion Control", current: true }
  ],
  "/motion-control/studio": [
    { label: "Home", href: "/" },
    { label: "Motion Control", href: "/motion-control" },
    { label: "openIndu-studio", current: true }
  ],
  "/vision": [
    { label: "Home", href: "/" },
    { label: "Industrial Vision", current: true }
  ],
  "/vision/station": [
    { label: "Home", href: "/" },
    { label: "Industrial Vision", href: "/vision" },
    { label: "openindu-station", current: true }
  ],
  "/iiot-platform": [
    { label: "Home", href: "/" },
    { label: "Industrial IoT", current: true }
  ],
  "/resources": [
    { label: "Home", href: "/" },
    { label: "Resources", current: true }
  ],
  "/privacy": [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", current: true }
  ],
  "/legal": [
    { label: "Home", href: "/" },
    { label: "Legal", current: true }
  ],
  "/cookies": [
    { label: "Home", href: "/" },
    { label: "Cookies Policy", current: true }
  ]
};

export function Breadcrumb() {
  const location = useLocation();
  const items = routeBreadcrumbs[location.pathname] || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex bg-gray-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-gray-200"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 sm:space-x-3 max-w-6xl mx-auto w-full">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 text-sm sm:text-base font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
