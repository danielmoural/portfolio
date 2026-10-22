import type { Mode, Theme } from "@/types/theme";

export function toDataTheme(theme: Theme, mode: Mode) {
  return mode === "dark" ? `${theme} dark` : theme;
}
