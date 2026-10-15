import { useTranslations } from "next-intl";
import { LanguageSelect } from "@/components/layout/language-select";
import { ThemePicker } from "@/components/layout/theme-picker";
import { Link } from "@/i18n/navigation";

const links = [
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
] as const;

export function SiteNav() {
  const t = useTranslations("Nav");

  return (
    <nav aria-label={t("label")} className="flex items-center">
      <ul className="flex items-center gap-10 pr-10">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary">
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        <ThemePicker />
        <LanguageSelect />
      </div>
    </nav>
  );
}
