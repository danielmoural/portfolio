import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "pt-BR", "fr-FR", "es-ES"],
  defaultLocale: "en-US",
});
