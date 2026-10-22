import type { Mode, Theme } from "@/types/theme";

export const themes = [
  { value: "default", label: "Default" },
  { value: "catppuccin", label: "Catppuccin" },
  { value: "dracula", label: "Dracula" },
  { value: "nord", label: "Nord" },
  { value: "gruvbox", label: "Gruvbox" },
] as const;

export const defaultTheme: Theme = "default";
export const defaultMode: Mode = "dark";
