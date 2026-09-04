import type { MetadataRoute } from "next";

const origin = "https://exwest.de";
const lastModified = new Date("2026-09-04T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { de: "/de", en: "/en", priority: 1 },
    { de: "/de/impressum", en: "/en/imprint", priority: 0.2 },
    { de: "/de/datenschutz", en: "/en/privacy", priority: 0.2 },
  ];

  return routes.flatMap(({ de, en, priority }) => {
    const languages = { de: `${origin}${de}`, en: `${origin}${en}`, "x-default": `${origin}${de}` };
    return [
      { url: `${origin}${de}`, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: `${origin}${en}`, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });
}
