import { PathBreadcrumb } from "@/components/layout/path-breadcrumb";
import { SiteNav } from "@/components/layout/site-nav";

export function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <PathBreadcrumb />
      <SiteNav />
    </header>
  );
}
