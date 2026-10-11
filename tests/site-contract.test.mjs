import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("corporate content is complete and equivalent across EN/DE/TR", () => {
  const content = JSON.parse(read("lib/corporate-pages.json"));
  assert.equal(Object.keys(content).length, 31);
  for (const [key, translations] of Object.entries(content)) {
    for (const locale of ["en", "de", "tr"]) {
      const page = translations[locale];
      assert.ok(page.title && page.lead.length > 60, `${key}/${locale} needs a useful lead`);
      assert.ok(page.blocks.length && page.blocks.every(b => b.title && b.body.length > 100), `${key}/${locale} has substantive sections`);
      assert.equal(page.blocks.length, translations.en.blocks.length, `${key} structure is equivalent`);
      assert.deepEqual(page.links, translations.en.links);
      if(page.family === "article") assert.ok(page.blocks.reduce((n,b)=>n+b.body.split(/\s+/).length,0)>260, `${key}/${locale} is a complete article`);
    }
  }
});

test("Home, root and nested pages resolve the same corporate route map", () => {
  for (const path of ["app/[locale]/page.tsx", "app/[locale]/[slug]/page.tsx", "app/[locale]/[slug]/[...path]/page.tsx"]) assert.match(read(path), /CorporateSite/);
  const demo = read("components/CorporateDemo.tsx");
  assert.match(demo, /aria-pressed/);
  assert.match(demo, /noscript/);
  assert.match(demo, /changedAction/);
  assert.doesNotMatch(demo, /fetch\(|XMLHttpRequest|localStorage|WebSocket/);
  const demos=JSON.parse(read("lib/corporate-demos.json"));
  for(const key of ["modular","tasgo","canceviz"]) for(const locale of ["en","de","tr"]) assert.equal(demos[key][locale].stages.length,6);
});

test("hero video is owned, optimized and has a mobile/reduced-motion poster fallback", () => {
  const component = read("components/MarketplaceHeroVideo.tsx");
  assert.match(component, /autoPlay/);
  assert.match(component, /muted/);
  assert.match(component, /loop/);
  assert.match(component, /playsInline/);
  assert.match(component, /prefers-reduced-motion: no-preference/);
  assert.match(component, /min-width: 561px/);
  for (const asset of ["public/cie-marketplace-hero.mp4", "public/cie-marketplace-hero.webm", "public/cie-marketplace-hero-poster.webp", "public/cie-marketplace-hero-mobile-poster.webp"]) {
    assert.ok(statSync(new URL(`../${asset}`, import.meta.url)).size > 10_000, `${asset} should be a real local asset`);
  }
});

test("core responsive contract is mobile-first and has a dedicated product composition", () => {
  const css = read("app/globals.css");
  const component = read("components/CIEProductExperience.tsx");
  for (const token of ["--type-display", "--type-h1", "--type-h2", "--type-h3", "--type-body-large", "--type-body", "--type-small", "--type-micro"]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /V3 release candidate: mobile-first core layout/);
  assert.match(css, /@media \(min-width: 375px\)/);
  assert.match(css, /@media \(min-width: 561px\)/);
  assert.match(css, /@media \(min-width: 821px\)/);
  assert.match(css, /@media \(min-width: 1101px\)/);
  assert.doesNotMatch(css, /\.site-shell\s*\{[^}]*overflow(?:-x)?:\s*(?:hidden|clip)/);
  assert.match(css, /\.commerce-graph \{ width: 100%; max-width: 100%; margin-inline: 0; \}/);
  assert.match(css, /h1, h2, h3 \{ hyphens: none; overflow-wrap: normal; word-break: normal/);
  assert.match(component, /cie-product-mobile/);
  assert.match(component, /mobile-product-signals/);
  assert.match(component, /mobile-decision-layer/);
  assert.match(component, /mobile-product-result/);
});

test("brand owners lead Marketplace questions while procurement stays on Trade", () => {
  const homepage = read("lib/homepage-content.ts");
  const cie = read("lib/detail-content.ts");
  const metadata = read("app/[locale]/page.tsx");
  for (const phrase of [
    "Hangi SKU'lar büyütülmeli?",
    "Welcher Marktplatz passt zu Produkt und Marke?",
    "Which channels best fit the brand and product?",
    "brand owners",
    "Markeninhaber",
    "Marka sahipleri",
  ]) assert.match(`${homepage}\n${cie}`, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(homepage, /Welcher Supplier passt|Which supplier fits|Hangi tedarikçi ihtiyaca/);
  assert.doesNotMatch(metadata, /Supplier-Signale|supplier signals|tedarikçi verilerini/);
  for (const tradeQuestion of [
    "Welche Lieferanten erfüllen die technischen und kommerziellen Anforderungen?",
    "Which suppliers meet the technical and commercial requirements?",
    "Hangi tedarikçiler teknik ve ticari kriterleri karşılıyor?",
  ]) assert.match(cie, new RegExp(tradeQuestion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("specified foreground and background color pairs meet WCAG AA", () => {
  const luminance = (hex) => {
    const channels = hex.match(/[a-f\d]{2}/gi).map((channel) => Number.parseInt(channel, 16) / 255);
    return channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
      .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  };
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const [foreground, background] of [
    ["#c0cac5", "#08120f"],
    ["#a6b2ac", "#08120f"],
    ["#4f5d56", "#f3f0e9"],
    ["#5d6a64", "#f3f0e9"],
    ["#34423b", "#f3f0e9"],
    ["#43514a", "#e7e1d5"],
  ]) assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background} should meet 4.5:1`);
  assert.ok(contrast("#b8f1cf", "#08120f") >= 3, "mint large text on ink should meet 3:1");
});

test("Netlify lead form has detection markup, validation states and required fields", () => {
  const form = read("components/CommercialLeadForm.tsx");
  const detector = read("public/__forms.html");
  for (const field of ["fullName", "company", "email", "phone", "interest", "message", "consent", "bot-field"]) {
    assert.match(form, new RegExp(`name=\\"${field}\\"`));
    assert.match(detector, new RegExp(`name=\\"${field}\\"`));
  }
  assert.match(form, /data-netlify="true"/);
  assert.match(detector, /data-netlify="true"/);
  for (const state of ["sending", "success", "error"]) assert.match(form, new RegExp(state));
});

test("sitemap is corporate-only and has DE, EN, TR and x-default alternates", () => {
  const sitemap = read("app/sitemap.ts");
  assert.doesNotMatch(sitemap, /realestate\.exwest\.de|exwestmodular\.de/);
  assert.match(sitemap, /[\'"]x-default[\'"]/);
  assert.match(sitemap, /tr:\s*`\$\{origin\}\$\{paths\.tr\}`/);
  const routes = read("lib/i18n.ts");
  assert.match(routes, /\/de\/datenschutz/);
  assert.match(routes, /\/en\/privacy/);
  assert.match(routes, /\/tr\/gizlilik/);
});

test("localized route architecture includes equivalent primary pages", () => {
  const i18n = read("lib/i18n.ts");
  for (const path of [
    "/de/cie", "/en/cie", "/tr/cie",
    "/de/internationaler-handel", "/en/international-trade", "/tr/uluslararasi-ticaret",
    "/de/e-commerce", "/en/e-commerce", "/tr/e-ticaret",
    "/de/unternehmen", "/en/company", "/tr/sirket",
  ]) assert.match(i18n, new RegExp(path.replaceAll("/", "\\/")));
});

test("agentic direction is status-separated and payment boundary is explicit", () => {
  const content = read("lib/detail-content.ts");
  for (const status of ["AVAILABLE / EVIDENCE-BACKED", "EMERGING / IN DEVELOPMENT", "VISION / PRODUCT DIRECTION"]) assert.match(content, new RegExp(status.replace("/", "\\/")));
  assert.match(content, /does not hold customer funds/);
  assert.match(content, /No current integration is claimed/);
  assert.doesNotMatch(content, /CIE Pay/);
  assert.doesNotMatch(content, /CIE automatically buys|CIE autonomously pays|operates every marketplace/i);
});

test("public crawler and experimental orientation policies are explicit", () => {
  const robots = read("app/robots.ts");
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"]) assert.match(robots, new RegExp(bot));
  assert.match(read("app/llms.txt/route.ts"), /not a ranking mechanism/);
});

test("legal pages use verified company identity", () => {
  const imprint = read("app/de/impressum/page.tsx");
  for (const fact of ["Exwest GmbH", "Königsallee 92a", "HRB 104648", "DE370220220", "Tekin Aldemir"]) {
    assert.match(imprint, new RegExp(fact));
  }
  assert.match(imprint, /§ 5 Digitale-Dienste-Gesetz/);
  assert.doesNotMatch(imprint, /OS-Plattform|online dispute|TMG/);
});

test("runtime dependencies remain presentation-only", () => {
  const pkg = JSON.parse(read("package.json"));
  const dependencies = Object.keys(pkg.dependencies);
  assert.deepEqual(dependencies.sort(), ["next", "react", "react-dom"]);
  const allSource = [read("app/[locale]/page.tsx"), read("lib/site-content.ts"), read("components/CommercialLeadForm.tsx")].join("\n");
  assert.doesNotMatch(allSource, /supabase|starium|autonomous outreach|customer count|revenue/i);
  assert.match(allSource, /exwest-commercial-inquiry/);
});

test("Turkish public copy uses natural commercial terminology without istihbarat overuse", () => {
  const publicCopy = [read("lib/i18n.ts"), read("lib/homepage-content.ts"), read("lib/site-content.ts"), read("lib/detail-content.ts"), read("lib/form-content.ts")].join("\n");
  assert.doesNotMatch(publicCopy, /İstihbarat|istihbarat/);
  for (const phrase of ["Pazaryeri Zekâsı", "Pazar İçgörüleri", "Satın Alma ve Tedarik İçgörüleri", "İhracat Fırsat Analizi"]) {
    assert.match(publicCopy, new RegExp(phrase));
  }
});

test("preview builds are explicitly non-indexable", () => {
  assert.match(read("app/robots.ts"), /deploy-preview/);
  assert.match(read("app/layout.tsx"), /index: false, follow: false/);
  assert.match(read("netlify.toml"), /NEXT_PUBLIC_SITE_ENV = "preview"/);
});
