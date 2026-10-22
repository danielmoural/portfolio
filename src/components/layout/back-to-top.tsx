"use client";

import { ArrowUpIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Distance from the bottom of the page, in pixels, at which the button shows up
const threshold = 400;

export function BackToTop() {
  const t = useTranslations("BackToTop");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const { scrollHeight } = document.documentElement;
      const distanceToBottom =
        scrollHeight - window.innerHeight - window.scrollY;
      // Pages too short to scroll never show it
      setVisible(window.scrollY > 0 && distanceToBottom <= threshold);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon-lg"
      aria-label={t("label")}
      // Inert while hidden so it can't be focused or clicked unseen
      inert={!visible}
      // Leaves scroll-behavior to the page, so it is smooth unless motion is reduced
      onClick={() => window.scrollTo({ top: 0 })}
      // Lined up with the page gutter and raised above the footer's links
      className={cn(
        "fixed right-[5%] bottom-20 cursor-pointer rounded-full shadow-lg transition-opacity duration-300",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUpIcon />
    </Button>
  );
}
