export const locales = ["de", "en", "tr"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localizedRoutes = {
  crmCommunications: {en:"/en/solutions/crm-communications",de:"/de/loesungen/crm-kommunikation",tr:"/tr/cozumler/crm-iletisim"},
  signals: {"en": "/en/cie/signals", "de": "/de/cie/marktchancen", "tr": "/tr/cie/pazar-firsatlari"},
  strategy: {"en": "/en/cie/strategy", "de": "/de/cie/vertriebsstrategie", "tr": "/tr/cie/satis-stratejisi"},
  operations: {"en": "/en/cie/sales-operations", "de": "/de/cie/vertriebsablaeufe", "tr": "/tr/cie/satis-surecleri"},
  control: {"en": "/en/cie/human-control", "de": "/de/cie/menschliche-kontrolle", "tr": "/tr/cie/insan-kontrolu"},
  platform: {"en": "/en/platform", "de": "/de/plattform", "tr": "/tr/platform"},
  integrations: {"en": "/en/platform/integrations", "de": "/de/plattform/anbindungen", "tr": "/tr/platform/entegrasyonlar"},
  solutions: {"en": "/en/solutions", "de": "/de/loesungen", "tr": "/tr/cozumler"},
  productEnquiries: {"en": "/en/solutions/product-enquiries", "de": "/de/loesungen/produktanfragen", "tr": "/tr/cozumler/urun-talepleri"},
  rfq: {"en": "/en/solutions/rfq-coordination", "de": "/de/loesungen/angebotskoordination", "tr": "/tr/cozumler/teklif-koordinasyonu"},
  tenders: {"en": "/en/solutions/tender-discovery", "de": "/de/loesungen/ausschreibungen", "tr": "/tr/cozumler/ihale-firsatlari"},
  serviceEnquiries: {"en": "/en/solutions/service-enquiries", "de": "/de/loesungen/serviceanfragen", "tr": "/tr/cozumler/hizmet-talepleri"},
  references: {"en": "/en/business-references", "de": "/de/praxisbeispiele", "tr": "/tr/is-ornekleri"},
  modular: {"en": "/en/business-references/exwest-modular", "de": "/de/praxisbeispiele/exwest-modular", "tr": "/tr/is-ornekleri/exwest-modular"},
  tasgo: {"en": "/en/business-references/tasgo", "de": "/de/praxisbeispiele/tasgo", "tr": "/tr/is-ornekleri/tasgo"},
  canceviz: {"en": "/en/business-references/canceviz", "de": "/de/praxisbeispiele/canceviz", "tr": "/tr/is-ornekleri/canceviz"},
  pricing: {"en": "/en/pricing", "de": "/de/preise", "tr": "/tr/fiyatlandirma"},
  resources: {"en": "/en/resources", "de": "/de/wissen", "tr": "/tr/kaynaklar"},
  blog: {"en": "/en/blog", "de": "/de/blog", "tr": "/tr/blog"},
  articleEnquiries: {"en": "/en/blog/from-enquiry-to-offer", "de": "/de/blog/von-der-anfrage-zum-angebot", "tr": "/tr/blog/talepten-teklife"},
  articleSignals: {"en": "/en/blog/evaluating-buying-signals", "de": "/de/blog/kaufsignale-bewerten", "tr": "/tr/blog/satin-alma-sinyallerini-degerlendirmek"},
  docs: {"en": "/en/docs", "de": "/de/dokumentation", "tr": "/tr/dokumantasyon"},
  gettingStarted: {"en": "/en/docs/getting-started", "de": "/de/dokumentation/einstieg", "tr": "/tr/dokumantasyon/baslangic"},
  crmDocs: {"en": "/en/docs/context-and-decisions", "de": "/de/dokumentation/kundenkontext-und-entscheidungen", "tr": "/tr/dokumantasyon/musteri-bilgileri-ve-kararlar"},
  integrationDocs: {"en": "/en/docs/integration-approaches", "de": "/de/dokumentation/anbindungskonzepte", "tr": "/tr/dokumantasyon/entegrasyon-yaklasimlari"},
  capabilityDocs: {"en": "/en/docs/availability-and-configuration", "de": "/de/dokumentation/verfuegbarkeit-und-konfiguration", "tr": "/tr/dokumantasyon/kullanim-durumu-ve-yapilandirma"},
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
      "CIE Marketplace verbindet Produkt-, Preis-, Wettbewerbs-, Nachfrage-, Bestands- und Margensignale. So können Marken fundierter entscheiden, welche Produkte auf welchen Kanälen und unter welchen kommerziellen Bedingungen wachsen können.",
    primary: "CIE Marketplace entdecken",
    secondary: "Demo anfragen",
    visualLabel: "CIE Marketplace · konzeptionelle Produktansicht",
    visualCaption: "Vom Produktsignal zur begründeten Channel- und Margenentscheidung. Die Darstellung ist konzeptionell und keine Leistungskennzahl.",
    principle: ["Produkt", "Entscheidung", "Wachstum"],
    signalLabels: [
      "Marktsignal",
      "Buyer identifiziert",
      "Nachfragesignal",
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
      "CIE Marketplace connects product, pricing, competitor, demand, inventory and margin signals so brands can make better decisions about which products to grow, in which channels and under which commercial conditions.",
    primary: "Explore CIE Marketplace",
    secondary: "Request a demo",
    visualLabel: "CIE Marketplace · conceptual product view",
    visualCaption: "From product signal to a reasoned channel and margin decision. This is a conceptual view, not a performance metric.",
    principle: ["Product", "Decision", "Growth"],
    signalLabels: [
      "Market Signal",
      "Buyer Identified",
      "Demand Signal",
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
      "CIE Marketplace; ürün, fiyat, rekabet, talep, stok ve marj sinyallerini bir araya getirerek markaların hangi ürünü, hangi pazaryerinde ve hangi ticari koşullarla büyütebileceğini değerlendirmesine yardımcı olur.",
    primary: "CIE Marketplace'i Keşfedin",
    secondary: "Demo Talep Edin",
    visualLabel: "CIE Marketplace · kavramsal ürün görünümü",
    visualCaption: "Ürün sinyalinden gerekçeli kanal ve marj kararına. Bu kavramsal bir gösterimdir; performans verisi değildir.",
    principle: ["Ürün", "Karar", "Büyüme"],
    signalLabels: [
      "Pazar Sinyali",
      "Alıcı Belirlendi",
      "Talep Sinyali",
      "Teklif Talebi",
      "Fiyat Sinyali",
      "Pazaryeri Fırsatı",
    ],
    localeLabel: "Dil seçimi",
    menuLabel: "Menüyü aç",
  },
} as const;
