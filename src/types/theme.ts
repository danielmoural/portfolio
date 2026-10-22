import type { themes } from "@/constants/themes";

export type Theme = (typeof themes)[number]["value"];
export type Mode = "light" | "dark";
