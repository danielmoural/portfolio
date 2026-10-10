export const themes = [
  { value: "catppuccin", label: "Catppuccin" },
  { value: "dracula", label: "Dracula" },
  { value: "nord", label: "Nord" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "radix", label: "Radix" },
] as const;

export type Theme = (typeof themes)[number]["value"];
export type Mode = "light" | "dark";

export const defaultTheme: Theme = "catppuccin";
export const defaultMode: Mode = "dark";

export function toDataTheme(theme: Theme, mode: Mode) {
  return mode === "dark" ? `${theme} dark` : theme;
}
