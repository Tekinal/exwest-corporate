export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
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
} as const;
