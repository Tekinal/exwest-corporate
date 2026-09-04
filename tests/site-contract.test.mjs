import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("CIE Marketplace leads the homepage in all three languages", () => {
  const content = [read("lib/i18n.ts"), read("lib/homepage-content.ts")].join("\n");
  for (const phrase of [
    "CIE Marketplace",
    "International Trade",
    "Find marketplace opportunity.",
    "Marktplatzchancen erkennen.",
    "Pazaryerlerinde fırsatı bulun.",
    "Kârlı büyümeyi yönetin.",
  ]) assert.match(content, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(read("lib/i18n.ts"), /Uluslararası Ticaret\.\s*İstihbaratla Güçlenir/);
});

test("homepage tells the CIE Marketplace story through visual modules", () => {
  const page = read("app/[locale]/page.tsx");
  for (const component of [
    "MarketplaceHeroVideo",
    "MarketplaceSignalField",
    "CIEIntelligenceFlow",
    "CIEProductExperience",
    "CommercialSignalCard",
    "MarketplaceDecisionGrid",
    "TradeExecutionFlow",
    "MarketplaceCommerceFlow",
  ]) assert.match(page, new RegExp(`<${component}`));
});

test("hero video is owned, optimized and has a mobile/reduced-motion poster fallback", () => {
  const component = read("components/MarketplaceHeroVideo.tsx");
  assert.match(component, /autoPlay/);
  assert.match(component, /muted/);
  assert.match(component, /loop/);
  assert.match(component, /playsInline/);
  assert.match(component, /prefers-reduced-motion: no-preference/);
  assert.match(component, /min-width: 561px/);
  for (const asset of ["public/cie-marketplace-hero.mp4", "public/cie-marketplace-hero.webm", "public/cie-marketplace-hero-poster.webp"]) {
    assert.ok(statSync(new URL(`../${asset}`, import.meta.url)).size > 10_000, `${asset} should be a real local asset`);
  }
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
  assert.match(sitemap, /"x-default"/);
  assert.match(sitemap, /tr: `\$\{origin\}\$\{paths\.tr\}`/);
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
