"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { GlobeIcon } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  "en-US": "English",
  "pt-BR": "Português",
  "fr-FR": "Français",
  "es-ES": "Español",
};

export function LanguageSelect() {
  const t = useTranslations("LanguageSelect");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: Locale | null) {
    if (!nextLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select value={locale} onValueChange={changeLocale} disabled={isPending}>
      <SelectPrimitive.Trigger
        render={<Button variant="nav" size="bare" aria-label={t("label")} />}
      >
        <GlobeIcon />
      </SelectPrimitive.Trigger>
      <SelectContent
        align="end"
        sideOffset={12}
        alignItemWithTrigger={false}
        className="w-auto min-w-0 rounded-sm"
      >
        {routing.locales.map((language) => (
          <SelectItem key={language} value={language} className="rounded-sm">
            {labels[language]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
