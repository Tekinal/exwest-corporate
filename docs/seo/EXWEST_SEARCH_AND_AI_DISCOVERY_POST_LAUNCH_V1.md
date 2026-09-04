# Exwest Search and AI Discovery — Post-Launch V1

Status: implementation-complete checklist; no production or external account changes
Date: 2026-09-04

## Implemented in the repository

- Crawlable server-rendered DE/EN/TR content for Home, CIE, International Trade, E-Commerce and Company.
- Self-referencing canonicals plus reciprocal `de`, `en`, `tr` and German `x-default` alternates.
- Localized metadata, OpenGraph data and 1200×630 generated social images.
- Organization/Corporation, WebSite, WebPage, Service and BreadcrumbList structured data based only on verified public facts.
- Generated sitemap with 21 corporate URLs and no real-estate or modular-domain pages.
- Production access for Googlebot, Bingbot, OAI-SearchBot and general public crawlers.
- Total crawler blocking for deploy-preview and branch-deploy contexts.
- Semantic question-and-answer content that addresses real commercial decision intent without FAQ spam or fabricated proof.
- Experimental `/llms.txt` containing only verified orientation and canonical links. It is not presented as a ranking mechanism.

## Homepage semantic ownership after the CIE Marketplace repositioning

The homepage now defines Exwest primarily through **CIE Marketplace** and owns the product/marketplace decision cluster: marketplace intelligence, product opportunity, pricing and channel decisions, margin context, E-Commerce growth and product commercialization. Its visible server-rendered copy answers what CIE Marketplace is, who it is for, which fragmented signals it brings together, how it supports marketplace growth, how it relates to supply, and where human approval remains decisive.

International Trade remains a major Exwest business area but its sourcing, procurement, supplier discovery, export and market-entry cluster belongs to the dedicated localized trade routes. Homepage trade content is intentionally a short explanatory bridge and link. This avoids asking one URL to rank for two different primary intents.

The canonical entity definition is substantively equivalent in German, English and Turkish: CIE Marketplace is Exwest's Commercial Intelligence system for brand owners and commercial teams, connecting product, pricing, competition, demand, inventory, margin, channel and marketplace signals to support better marketplace decisions. Supplier discovery, qualification, RFQ and negotiation remain primary International Trade topics. Copy and structured data do not claim autonomous transaction execution.

The hero film is supplementary. Its product/signals/decision/action story is repeated in semantic HTML, the video has a descriptive poster and caption, and no crawler or assistive-technology user must play it to understand the offer.

Google states that established SEO fundamentals remain applicable to its AI features and that no special AI text file or schema is required; crawlability, textual content, useful images, internal links and structured-data consistency remain the practical priorities. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)

OpenAI documents that public sites can allow `OAI-SearchBot` for search discovery/citation while keeping separate controls for model training. This site explicitly permits the search crawler only through its public production robots policy. [OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

## Post-launch: Google Search Console

1. Verify the `exwest.de` domain property through an approved DNS verification change.
2. Submit `https://exwest.de/sitemap.xml` after production cutover.
3. Inspect representative DE, EN and TR URLs and confirm rendered canonical/hreflang selection.
4. Monitor indexing, Core Web Vitals, page experience, queries, country/language distribution and 404/redirect coverage.
5. Compare the baseline with the frozen legacy export before evaluating migration outcomes.

## Post-launch: Bing Webmaster Tools

1. Add and verify the domain or import the authorized Search Console property.
2. Submit the canonical sitemap.
3. Inspect representative localized URLs and monitor crawl/index errors.

## IndexNow

IndexNow is **documented for post-launch**, not implemented in this release. It requires a production host key and an authorized submission workflow. After cutover:

1. Generate and host the IndexNow key on the production domain.
2. Submit only added, changed or deleted canonical public URLs.
3. Keep submissions outside the browser and outside page-render paths.
4. Log responses and apply rate limits.
5. Treat notification as discovery assistance, not a guarantee of indexing. [Bing IndexNow documentation](https://www.bing.com/indexnow/getstarted)

## Release checks

- Confirm preview/staging remains non-indexable.
- Confirm no CDN/WAF layer blocks Googlebot, Bingbot or OAI-SearchBot.
- Validate all reciprocal hreflang clusters and final apex/`www` redirects.
- Validate JSON-LD against visible copy after counsel/product approval.
- Capture mobile/desktop Core Web Vitals from the approved public preview.
- Do not submit sitemaps, create verification records or send IndexNow notifications until production cutover is separately authorized.
