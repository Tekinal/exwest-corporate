import type { Metadata } from "next";

export function legalMetadata({ locale, title, description, dePath, enPath }: {
  locale: "de" | "en";
  title: string;
  description: string;
  dePath: string;
  enPath: string;
}): Metadata {
  const canonical = locale === "de" ? dePath : enPath;
  return {
    title,
    description,
    alternates: { canonical, languages: { de: dePath, en: enPath, "x-default": dePath } },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB"] : ["de_DE"],
      url: canonical,
      siteName: "Exwest",
      title,
      description,
      images: [{ url: "/exwest-og.png", width: 1200, height: 630, alt: "Exwest — International Commerce. Powered by Intelligence." }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/exwest-og.png"] },
  };
}
