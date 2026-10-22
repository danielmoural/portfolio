"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { LocateFixedIcon, MapPinIcon, MoonIcon, SunIcon } from "lucide-react";
import type { Map as MapLibreMap } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { getTimes } from "suncalc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { location } from "@/constants/location";
import { foldAttributionOnClose } from "@/lib/fold-attribution";
import { cn } from "@/lib/utils";
import type { Mode } from "@/types/theme";

const clockFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: location.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

// Between the location's sunrise and sunset; at night the date falls outside
// both its own day's and the neighboring day's daylight, whichever is picked
function isDaytime(date: Date) {
  const [longitude, latitude] = location.coordinates;
  const { sunrise, sunset } = getTimes(date, latitude, longitude);
  return !!sunrise && !!sunset && date > sunrise && date < sunset;
}

const styles: Record<Mode, string> = {
  light: "positron",
  dark: "dark-matter",
};

// CARTO ships matching light and dark basemaps, picked from the page's mode.
// The key only goes on the style, which passes it on to the tiles and fonts
function styleUrl(apiKey: string) {
  const mode: Mode = document.documentElement.dataset.theme
    ?.split(" ")
    .includes("dark")
    ? "dark"
    : "light";
  return `https://basemaps.cartocdn.com/gl/${styles[mode]}-gl-style/style.json?key=${apiKey}`;
}

export function LocationCard({
  apiKey,
  className,
}: {
  apiKey: string;
  className?: string;
}) {
  const t = useTranslations("LocationCard");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap>(null);
  const [loaded, setLoaded] = useState(false);
  // Whether the map was panned or zoomed away from the location
  const [moved, setMoved] = useState(false);
  // Empty until mounted, so the server and client renders agree
  const [now, setNow] = useState<Date>();

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | undefined;
    let fold: ReturnType<typeof foldAttributionOnClose> | undefined;

    // Loaded in the browser only, keeping the WebGL bundle off the first load
    import("maplibre-gl").then((maplibregl) => {
      if (cancelled || !containerRef.current) return;
      // MapLibre looks for its worker next to its own file, which bundling
      // moves; this has the bundler emit the worker and point MapLibre at it
      maplibregl.setWorkerUrl(
        new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url)
          .href,
      );
      // The style brings its own OpenStreetMap and CARTO attribution, kept
      // behind an info button since the licenses require it on the map
      const container = containerRef.current;
      const map = new maplibregl.Map({
        container,
        style: styleUrl(apiKey),
        center: location.coordinates,
        zoom: location.zoom,
        attributionControl: { compact: true },
      });
      mapRef.current = map;
      map.once("load", () => setLoaded(true));

      // Within a meter, so the eased-back view counts as centered
      const target = maplibregl.LngLat.convert(location.coordinates);
      map.on("moveend", () =>
        setMoved(
          map.getCenter().distanceTo(target) > 1 ||
            Math.abs(map.getZoom() - location.zoom) > 0.01,
        ),
      );

      // MapLibre opens the attribution on load and on each new style, only
      // closing it on drag; this folds it closed once the map settles instead
      const attribution = container.querySelector<HTMLDetailsElement>(
        "details.maplibregl-ctrl-attrib",
      );
      if (attribution) {
        fold = foldAttributionOnClose(attribution);
        map.on("idle", () => fold?.close());
      }

      // Follows the theme picker, which only rewrites `data-theme`
      observer = new MutationObserver(() => map.setStyle(styleUrl(apiKey)));
      observer.observe(document.documentElement, {
        attributeFilter: ["data-theme"],
      });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      fold?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [apiKey]);

  function recenter() {
    mapRef.current?.easeTo({
      center: location.coordinates,
      zoom: location.zoom,
    });
  }

  const DayIcon = now && isDaytime(now) ? SunIcon : MoonIcon;

  return (
    <Card className={cn("gap-3 px-(--card-spacing) text-left", className)}>
      <p className="flex items-center gap-2 font-medium">
        <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
        {t("basedIn")}
      </p>
      {/* Isolated so the map's stacked controls stay under the sticky header */}
      <div className="relative isolate h-48 overflow-hidden rounded-lg bg-muted">
        <div ref={containerRef} className="size-full" />
        {/* Kept mounted so it fades; inert while hidden, out of the tab order */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={recenter}
          aria-label={t("recenter")}
          inert={!moved}
          className={cn(
            "absolute top-2 right-2 z-10 bg-card/80 text-muted-foreground backdrop-blur-sm transition-opacity duration-200 hover:text-primary dark:bg-card/80",
            !moved && "opacity-0",
          )}
        >
          <LocateFixedIcon aria-hidden="true" />
        </Button>
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted text-muted-foreground text-xs">
            {t("loading")}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-muted-foreground text-xs">
        <span>{location.city}</span>
        {now && (
          <div className="flex items-center gap-1">
            <DayIcon aria-hidden="true" className="size-3" />
            <span className="sr-only">{t("localTime")}</span>
            <time className="tabular-nums">{clockFormat.format(now)}</time>
          </div>
        )}
      </div>
    </Card>
  );
}
