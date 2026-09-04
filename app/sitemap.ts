import type { MetadataRoute } from "next";

import { localizedRoutes, type RouteKey } from "@/lib/i18n";

const origin = "https://exwest.de";
const lastModified = new Date("2026-09-04T00:00:00.000Z");
const routeKeys: RouteKey[] = ["home", "cie", "trade", "ecommerce", "company", "imprint", "privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routeKeys.flatMap((routeKey) => {
    const paths = localizedRoutes[routeKey];
    const languages = { de: `${origin}${paths.de}`, en: `${origin}${paths.en}`, tr: `${origin}${paths.tr}`, "x-default": `${origin}${paths.de}` };
    return (["de", "en", "tr"] as const).map((locale) => ({
      url: `${origin}${paths[locale]}`,
      lastModified,
      changeFrequency: routeKey === "home" ? "weekly" as const : "monthly" as const,
      priority: routeKey === "home" ? 1 : routeKey === "imprint" || routeKey === "privacy" ? 0.2 : 0.8,
      alternates: { languages },
    }));
  });
}
