import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("corporate information hierarchy is present in both languages", () => {
  const content = read("lib/site-content.ts");
  for (const phrase of [
    "CIE Solutions",
    "International Trade",
    "E-Commerce",
    "Intelligence → Execution → Scale",
    "Aus fragmentierten Marktsignalen",
    "Turn fragmented market signals",
  ]) assert.match(content, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("homepage has all required custom visual modules", () => {
  const page = read("app/[locale]/page.tsx");
  for (const component of [
    "GlobalCommerceGraph",
    "CIEIntelligenceFlow",
    "CommercialSignalCard",
    "TradeExecutionFlow",
    "MarketplaceCommerceFlow",
    "ExwestOperatingModel",
    "GlobalCommercialNetwork",
  ]) assert.match(page, new RegExp(`<${component}`));
});

test("sitemap is corporate-only and has DE, EN and x-default alternates", () => {
  const sitemap = read("app/sitemap.ts");
  assert.doesNotMatch(sitemap, /realestate\.exwest\.de|exwestmodular\.de/);
  assert.match(sitemap, /"x-default"/);
  assert.match(sitemap, /\/de\/datenschutz/);
  assert.match(sitemap, /\/en\/privacy/);
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
  const allSource = [read("app/[locale]/page.tsx"), read("lib/site-content.ts"), read("components/ContactIntent.tsx")].join("\n");
  assert.doesNotMatch(allSource, /supabase|starium|autonomous outreach|customer count|revenue/i);
  assert.match(allSource, /mailto:contact@exwest\.de/);
});

test("preview builds are explicitly non-indexable", () => {
  assert.match(read("app/robots.ts"), /deploy-preview/);
  assert.match(read("app/layout.tsx"), /index: false, follow: false/);
  assert.match(read("netlify.toml"), /NEXT_PUBLIC_SITE_ENV = "preview"/);
});
