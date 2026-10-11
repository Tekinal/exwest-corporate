import assert from "node:assert/strict";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3014";
const origin = "https://www.exwest.de";

const pages = {
  home: { de: "/de", en: "/en", tr: "/tr" },
  cie: { de: "/de/cie", en: "/en/cie", tr: "/tr/cie" },
  trade: {
    de: "/de/internationaler-handel",
    en: "/en/international-trade",
    tr: "/tr/uluslararasi-ticaret",
  },
  ecommerce: { de: "/de/e-commerce", en: "/en/e-commerce", tr: "/tr/e-ticaret" },
  company: { de: "/de/unternehmen", en: "/en/company", tr: "/tr/sirket" },
  imprint: { de: "/de/impressum", en: "/en/imprint", tr: "/tr/kunye" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy", tr: "/tr/gizlilik" },
};
const renderedBodies = [];

const get = async (path, init) => {
  const response = await fetch(`${baseUrl}${path}`, init);
  const body = await response.text();
  return { response, body };
};

for (const [pageKey, translations] of Object.entries(pages)) {
  for (const [locale, path] of Object.entries(translations)) {
    const { response, body } = await get(path);
    renderedBodies.push(body);
    assert.equal(response.status, 200, `${path} should return 200`);
    assert.match(body, new RegExp(`<html lang="${locale}"`), `${path} should set html lang`);
    assert.match(body, /<title>[^<]+<\/title>/, `${path} should have a title`);
    assert.match(body, new RegExp(`<link rel="canonical" href="${origin}${path}"`), `${path} should self-canonicalize`);

    for (const alternate of ["de", "en", "tr"]) {
      const alternatePath = translations[alternate];
      assert.match(
        body,
        new RegExp(`<link rel="alternate" hrefLang="${alternate}" href="${origin}${alternatePath}"`),
        `${path} should link ${alternate}`,
      );
    }

    assert.match(
      body,
      new RegExp(`<link rel="alternate" hrefLang="x-default" href="${origin}${translations.de}"`),
      `${path} should use German as x-default`,
    );
    assert.match(body, new RegExp(`<meta property="og:locale" content="${locale === "de" ? "de_DE" : locale === "tr" ? "tr_TR" : "en_GB"}"`));

    if (["home", "cie", "trade", "ecommerce", "company"].includes(pageKey)) {
      assert.match(body, /application\/ld\+json/, `${path} should include structured data`);
    }

    if (pageKey === "home") {
      assert.doesNotMatch(body, /Linden Retail|Aster Aero Demo/);
      assert.match(body, /customer-logo-row/);
      assert.match(body, /commercial-v3/);
      assert.match(body, /id="demonstration"/);
      assert.match(body, /id="businesses"/);
      assert.match(body, /name="exwest-commercial-inquiry"/);
      assert.match(body, /data-netlify="true"/);
      assert.match(body, /<option value="CIE Marketplace">CIE<\/option>/, "visible CIE label must preserve the existing submitted interest value");
      for (const anchor of ["top", "cie", "ecommerce", "trade", "businesses", "contact"]) assert.match(body, new RegExp(`id="${anchor}"`));
    }
  }
}

const internalLinks = new Set(
  renderedBodies.flatMap((body) =>
    Array.from(body.matchAll(/href="(\/[^"]*)"/g), (match) => match[1].split("#")[0]).filter(Boolean),
  ),
);
for (const path of internalLinks) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.ok(response.ok, `internal link ${path} should resolve`);
}

const redirectCases = [
  [{ "accept-language": "tr-TR,tr;q=0.9,de;q=0.5" }, "/tr"],
  [{ "accept-language": "en-US,en;q=0.9" }, "/en"],
  [{ "accept-language": "fr-FR,fr;q=0.9" }, "/de"],
  [{ "accept-language": "tr-TR,tr;q=0.9", cookie: "exwest_locale=de" }, "/de"],
];

for (const [headers, expectedPath] of redirectCases) {
  const response = await fetch(`${baseUrl}/`, { headers, redirect: "manual" });
  assert.equal(response.status, 307, `root should redirect for ${JSON.stringify(headers)}`);
  assert.equal(new URL(response.headers.get("location"), baseUrl).pathname, expectedPath);
}

const { body: robots } = await get("/robots.txt");
for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"]) {
  assert.match(robots, new RegExp(`User-Agent: ${bot}[\\s\\S]*Allow: /`));
}

const { body: sitemap } = await get("/sitemap.xml");
assert.equal((sitemap.match(/<url>/g) ?? []).length, 99, "sitemap should contain all 99 corporate locale URLs");
assert.doesNotMatch(sitemap, /realestate\.exwest\.de|exwestmodular\.de/);
for (const locale of ["de", "en", "tr", "x-default"]) {
  assert.match(sitemap, new RegExp(`hreflang="${locale}"`));
}

const { response: llmsResponse, body: llms } = await get("/llms.txt");
assert.equal(llmsResponse.status, 200);
assert.match(llms, /not a ranking mechanism/i);
assert.match(llms, /CIE is an AI commercial operator/);

const { response: formDetectorResponse, body: formDetector } = await get("/__forms.html");
assert.equal(formDetectorResponse.status, 200);
assert.match(formDetectorResponse.headers.get("x-robots-tag") ?? "", /noindex, nofollow/);
assert.match(formDetector, /name="exwest-commercial-inquiry"/);
assert.match(formDetector, /data-netlify="true"/);

for (const mediaPath of ["/cie-marketplace-hero.mp4", "/cie-marketplace-hero.webm", "/cie-marketplace-hero-poster.webp", "/cie-marketplace-hero-mobile-poster.webp"]) {
  const response = await fetch(`${baseUrl}${mediaPath}`);
  assert.equal(response.status, 200, `${mediaPath} should return 200`);
  assert.ok(Number(response.headers.get("content-length") ?? 0) > 10_000, `${mediaPath} should not be a placeholder`);
}

for (const imagePath of ["/de/opengraph-image", "/en/international-trade/opengraph-image", "/tr/cie/opengraph-image"]) {
  const response = await fetch(`${baseUrl}${imagePath}`);
  assert.equal(response.status, 200, `${imagePath} should return 200`);
  assert.match(response.headers.get("content-type") ?? "", /^image\/png/);
}

console.log(`PASS: core 21 localized pages plus full 99-URL sitemap, CIE commercial positioning, hero media, Netlify form detection, resolver priority, metadata, crawlers, sitemap, llms.txt, and OpenGraph images (${baseUrl})`);
