"use client";

import { MoonIcon, PaletteIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  defaultMode,
  defaultTheme,
  type Mode,
  type Theme,
  themes,
  toDataTheme,
} from "@/lib/themes";
import { cn } from "@/lib/utils";

const groupClassName =
  "grid w-full [--item-radius:var(--radius-sm)] [--padding:--spacing(1)] [--border-width:1px] p-(--padding) border-(length:--border-width) border-input rounded-[calc(var(--item-radius)+var(--padding)+var(--border-width))]";

const itemClassName =
  "px-1 rounded-(--item-radius) border border-transparent hover:bg-transparent hover:text-muted-foreground hover:cursor-pointer aria-pressed:border-primary aria-pressed:bg-popover aria-pressed:text-primary";

const modeItemClassName =
  "has-data-[icon=inline-start]:pl-1 aria-pressed:border-muted-foreground aria-pressed:text-foreground";

export function ThemePicker() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mode, setMode] = useState<Mode>(defaultMode);

  function apply(nextTheme: Theme, nextMode: Mode) {
    setTheme(nextTheme);
    setMode(nextMode);
    document.documentElement.dataset.theme = toDataTheme(nextTheme, nextMode);
  }

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="nav" size="bare" aria-label="Change theme" />}
      >
        <PaletteIcon />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="w-auto gap-6">
        <ToggleGroup
          aria-label="Mode"
          className={cn(groupClassName, "grid-cols-2")}
          value={[mode]}
          onValueChange={([value]) => value && apply(theme, value as Mode)}
        >
          <ToggleGroupItem
            value="light"
            className={cn(itemClassName, modeItemClassName)}
          >
            <SunIcon data-icon="inline-start" />
            Light
          </ToggleGroupItem>
          <ToggleGroupItem
            value="dark"
            className={cn(itemClassName, modeItemClassName)}
          >
            <MoonIcon data-icon="inline-start" />
            Dark
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="Theme"
          className={cn(groupClassName, "grid-cols-6")}
          value={[theme]}
          onValueChange={([value]) => value && apply(value, mode)}
        >
          {themes.map((item, index) => (
            <ToggleGroupItem
              key={item.value}
              value={item.value}
              className={cn(
                itemClassName,
                themes.length % 3 === 2 && index < 2
                  ? "col-span-3"
                  : "col-span-2",
              )}
            >
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
