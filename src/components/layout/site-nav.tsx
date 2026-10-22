import { useTranslations } from "next-intl";
import { LanguageSelect } from "@/components/layout/language-select";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemePicker } from "@/components/layout/theme-picker";
import { Link } from "@/i18n/navigation";

const links = [
  { href: "/#about", key: "about" },
  { href: "/#projects", key: "projects" },
  { href: "/#experience", key: "experience" },
] as const;

export function SiteNav() {
  const t = useTranslations("Nav");

  return (
    <nav
      aria-label={t("label")}
      className="flex items-center gap-4 sm:gap-8 [&>button]:transition-colors [&>button]:duration-200"
    >
      <ul className="hidden items-center gap-8 sm:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary">
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
      <ThemePicker />
      <LanguageSelect />
      <MobileMenu
        label={t("menu")}
        links={links.map((link) => ({ href: link.href, label: t(link.key) }))}
      />
    </nav>
  );
}
