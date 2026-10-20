import { SiteNav } from "@/components/layout/site-nav";
import { Link } from "@/i18n/navigation";

export function Header() {
  return (
    <header className="flex items-center justify-between pt-8">
      <Link
        href="/"
        className="font-semibold text-foreground duration-200 hover:text-primary"
      >
        Daniel Moura
      </Link>
      <SiteNav />
    </header>
  );
}
