export const locales = ["de", "en", "tr"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localizedRoutes = {
  home: { de: "/de", en: "/en", tr: "/tr" },
  cie: { de: "/de/cie", en: "/en/cie", tr: "/tr/cie" },
  trade: { de: "/de/internationaler-handel", en: "/en/international-trade", tr: "/tr/uluslararasi-ticaret" },
  ecommerce: { de: "/de/e-commerce", en: "/en/e-commerce", tr: "/tr/e-ticaret" },
  company: { de: "/de/unternehmen", en: "/en/company", tr: "/tr/sirket" },
  imprint: { de: "/de/impressum", en: "/en/imprint", tr: "/tr/kunye" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy", tr: "/tr/gizlilik" },
} as const;

export type RouteKey = keyof typeof localizedRoutes;

export function localizePath(pathname: string, locale: Locale) {
  const route = Object.values(localizedRoutes).find((paths) => (Object.values(paths) as readonly string[]).includes(pathname));
  return route?.[locale] ?? pathname.replace(/^\/(de|en|tr)(?=\/|$)/, `/${locale}`);
}

export const heroContent = {
  de: {
    nav: [
      ["CIE Solutions", "#cie"],
      ["International Trade", "#trade"],
      ["E-Commerce", "#ecommerce"],
      ["Unternehmen", "#company"],
    ],
    eyebrow: "Exwest · Commercial Intelligence",
    titleTop: "International Commerce.",
    titleBottom: "Powered by Intelligence.",
    summary:
      "Exwest verbindet Commercial Intelligence, internationalen Handel und digitalen Commerce, um Chancen zu erkennen, Märkte zu erschließen und skalierbare Vertriebskanäle aufzubauen.",
    primary: "CIE Solutions entdecken",
    secondary: "Chance besprechen",
    signalLabels: [
      "Marktsignal",
      "Buyer identifiziert",
      "Supplier Match",
      "RFQ",
      "Preissignal",
      "Marketplace-Chance",
    ],
    localeLabel: "Sprache wechseln",
    menuLabel: "Navigation öffnen",
  },
  en: {
    nav: [
      ["CIE Solutions", "#cie"],
      ["International Trade", "#trade"],
      ["E-Commerce", "#ecommerce"],
      ["Company", "#company"],
    ],
    eyebrow: "Exwest · Commercial Intelligence",
    titleTop: "International Commerce.",
    titleBottom: "Powered by Intelligence.",
    summary:
      "Exwest combines Commercial Intelligence, international trade and digital commerce to identify opportunities, enter markets and build scalable commercial channels.",
    primary: "Explore CIE Solutions",
    secondary: "Discuss an Opportunity",
    signalLabels: [
      "Market Signal",
      "Buyer Identified",
      "Supplier Match",
      "RFQ",
      "Pricing Signal",
      "Marketplace Opportunity",
    ],
    localeLabel: "Switch language",
    menuLabel: "Open navigation",
  },
  tr: {
    nav: [
      ["CIE Çözümleri", "/cie"],
      ["Uluslararası Ticaret", "/uluslararasi-ticaret"],
      ["E-Ticaret", "/e-ticaret"],
      ["Şirket", "/sirket"],
    ],
    eyebrow: "Exwest · Ticari İstihbarat",
    titleTop: "Uluslararası Ticaret.",
    titleBottom: "İstihbaratla Güçlenir.",
    summary:
      "Exwest; ticari fırsatları belirlemek, pazarlara girmek ve ölçeklenebilir satış kanalları kurmak için Ticari İstihbarat, uluslararası ticaret ve dijital ticareti bir araya getirir.",
    primary: "CIE Çözümlerini Keşfedin",
    secondary: "Bir Fırsatı Görüşün",
    signalLabels: [
      "Pazar Sinyali",
      "Alıcı Belirlendi",
      "Tedarikçi Eşleşmesi",
      "Teklif Talebi",
      "Fiyat Sinyali",
      "Pazaryeri Fırsatı",
    ],
    localeLabel: "Dil seçimi",
    menuLabel: "Menüyü aç",
  },
} as const;
