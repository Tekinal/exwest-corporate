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
      ["CIE Marketplace", "/cie"],
      ["Internationaler Handel", "/internationaler-handel"],
      ["Unternehmen", "/unternehmen"],
      ["Kontakt", "#contact"],
    ],
    eyebrow: "Exwest · CIE Marketplace",
    titleTop: "Marktplatzchancen erkennen.",
    titleBottom: "Profitables Wachstum steuern.",
    summary:
      "CIE Marketplace verbindet Produkt-, Preis-, Wettbewerbs-, Margen- und Marktsignale, damit Unternehmen erkennen, welche Produkte in welchen Channels unter welchen kommerziellen Bedingungen wachsen können.",
    primary: "CIE Marketplace entdecken",
    secondary: "Demo anfragen",
    visualLabel: "CIE Marketplace · konzeptionelle Produktansicht",
    visualCaption: "Vom Produktsignal zur begründeten Channel- und Margenentscheidung. Die Darstellung ist konzeptionell und keine Leistungskennzahl.",
    principle: ["Produkt", "Entscheidung", "Wachstum"],
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
      ["CIE Marketplace", "/cie"],
      ["International Trade", "/international-trade"],
      ["Company", "/company"],
      ["Contact", "#contact"],
    ],
    eyebrow: "Exwest · CIE Marketplace",
    titleTop: "Find marketplace opportunity.",
    titleBottom: "Manage profitable growth.",
    summary:
      "CIE Marketplace connects product, pricing, competitor, margin and market signals so businesses can see which products can grow, in which channels and under which commercial conditions.",
    primary: "Explore CIE Marketplace",
    secondary: "Request a demo",
    visualLabel: "CIE Marketplace · conceptual product view",
    visualCaption: "From product signal to a reasoned channel and margin decision. This is a conceptual view, not a performance metric.",
    principle: ["Product", "Decision", "Growth"],
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
      ["CIE Marketplace", "/cie"],
      ["Uluslararası Ticaret", "/uluslararasi-ticaret"],
      ["Şirket", "/sirket"],
      ["İletişim", "#contact"],
    ],
    eyebrow: "Exwest · CIE Marketplace",
    titleTop: "Pazaryerlerinde fırsatı bulun.",
    titleBottom: "Kârlı büyümeyi yönetin.",
    summary:
      "CIE Marketplace; ürün, fiyat, rekabet, marj ve pazar sinyallerini bir araya getirerek hangi ürünü, hangi kanalda ve hangi ticari koşullarla büyütebileceğinizi görmenize yardımcı olur.",
    primary: "CIE Marketplace'i Keşfedin",
    secondary: "Demo Talep Edin",
    visualLabel: "CIE Marketplace · kavramsal ürün görünümü",
    visualCaption: "Ürün sinyalinden gerekçeli kanal ve marj kararına. Bu kavramsal bir gösterimdir; performans verisi değildir.",
    principle: ["Ürün", "Karar", "Büyüme"],
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
