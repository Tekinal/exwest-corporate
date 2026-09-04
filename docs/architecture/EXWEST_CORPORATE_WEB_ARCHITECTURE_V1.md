# Exwest Corporate Web Architecture V1

Status: implementation baseline  
Date: 2026-09-04  
Production authority: none; preview-ready only

## 1. System boundary

```text
exwest.de
→ Corporate + CIE + Trade + E-Commerce

realestate.exwest.de
→ Real Estate

exwestmodular.de
→ Modular operating business

exwest-configurator
→ Operational CIE / CRM / Starium infrastructure
```

The corporate frontend is presentation-only. It contains no database client, CRM integration, Supabase dependency, operational agent, commercial pipeline, tenant runtime, or copied configurator code. Commercial enquiries are submitted to Netlify Forms through a statically detectable form contract; no form submission is written to this repository or to an Exwest operational system.

## 2. Positioning and information hierarchy

The homepage and primary product proposition are led by **CIE Marketplace**: Exwest's Commercial Intelligence system for brand-owner decisions across product, pricing, competition, demand, inventory, margin, channel and marketplace. International Trade is the second major business area. E-Commerce commercialization is connected directly to CIE Marketplace rather than presented as an unrelated consulting offer.

```text
CIE Marketplace         → Marketplace and product decisions
E-Commerce              → Commercialization and growth
International Trade     → Supply and cross-border execution
```

The homepage remains the fast commercial narrative. Detailed localized CIE, International Trade, E-Commerce and Company routes carry deeper product and answer-engine content:

1. CIE Marketplace hero, owned product-motion film and demo conversion.
2. Fragmented marketplace problem: product, pricing, competition, demand, stock, margin and channel signals.
3. CIE Marketplace decision layer and evidence-backed outputs.
4. Prominent conceptual product experience and the commercial questions it supports.
5. Marketplace commercialization from product through channel, launch, optimization and scale.
6. Agentic Commerce as governed future direction, not current autonomous execution.
7. International Trade as a concise secondary homepage route into its substantive dedicated page.
8. Exwest company and controlled operating-business references.
9. Localized Netlify lead form and corporate footer.

```text
/de | /en | /tr
├── /cie
├── /internationaler-handel | /international-trade | /uluslararasi-ticaret
├── /e-commerce | /e-commerce | /e-ticaret
├── /unternehmen | /company | /sirket
└── localized legal routes
```

## 3. Claim governance

Public language is bounded by the read-only evidence in `../exwest-configurator`, including `COMMERCIAL_POSITIONING.md` and the current CIE architecture handoff. V1 presents CIE as AI-assisted, governed commercial decision support for investigation, normalization, comparison, explanation and prioritization.

V1 explicitly does not claim that CIE autonomously sends, negotiates, closes, pays, controls marketplaces, owns buyer relationships, guarantees opportunities, or represents blocked/research-only capabilities as production-ready. Copy states that AI prepares while people review, decide, communicate and negotiate.

The amendment adds the **Agentic Commercial Operating System** as product direction under CIE, never as a fourth corporate pillar. Public copy separates evidence-backed Commercial Intelligence, emerging governed workflows and future bounded agentic/transaction infrastructure. Exwest is not presented as a bank, payment institution, acquirer or electronic-money issuer; future transaction intent would require licensed banking/PSP infrastructure and separate authority.

## 4. Application architecture

- Next.js 16 App Router (patched 16.3.4 baseline), React 19 and strict TypeScript.
- Server Components by default. Client JavaScript is limited to navigation/language controls, progressive product experience and the accessible lead-form state machine.
- Central trilingual content in `lib/site-content.ts`, `lib/detail-content.ts`, `lib/homepage-content.ts`, `lib/form-content.ts` and `lib/i18n.ts`.
- Original CSS/SVG visuals and one owned, locally rendered CIE Marketplace hero motion asset; no dashboard library, remote font, tracking script or third-party hero footage.
- Generated route metadata, sitemap, robots policy, schema and localized legal metadata.
- Netlify build target with a pinned adapter, Node 20 and non-indexable preview contexts.

## 5. Internationalization

Indexable language URLs are separate: `/de/*`, `/en/*` and `/tr/*`. German is the principal language and `x-default`.

Root selection order:

1. Explicit `exwest_locale` cookie, stored for 180 days after manual selection.
2. Browser `Accept-Language` preference across German, English and Turkish, respecting quality weights.
3. German default.

No permanent geo-IP redirect is used or required. Automatic selection never replaces an explicit choice. The visible DE | EN | TR control maps homepage, primary detail and legal counterparts. Every page sets a self-referencing canonical, DE/EN/TR/x-default alternates and the correct document language through a locale request header.

## 6. SEO ownership

The homepage owns the CIE Marketplace, marketplace intelligence, product opportunity, pricing/channel decision, E-Commerce growth and product-commercialization cluster. Dedicated International Trade pages own international trade, sourcing/procurement, supplier discovery and market-entry intent. This separation reduces topical ambiguity. The corporate site does not publish a real-estate topic cluster.

`realestate.exwest.de` must independently own real-estate content, canonicals, sitemap, robots rules, metadata and structured data. It appears here only as one intentional portfolio link. It is never present in the corporate sitemap and is never used as a corporate canonical.

Structured data is limited to verified Exwest GmbH Organization/Corporation identity, WebSite/WebPage/Breadcrumb context and bounded service descriptions. Text is localized. No unverified `sameAs`, review, customer, performance or location data is emitted.

## 7. Design system

The legacy visual DNA is retained through warm ivory surfaces, charcoal-green high-contrast fields, oversized editorial headlines, generous section rhythm, thin borders, minimal shadow/radius, direct CTA typography and a dense corporate footer. It evolves through mint/amber signal accents, cartographic intelligence graphics, evidence lanes and operational flows rather than property photography.

Custom visual modules:

- `GlobalCommerceGraph`
- `MarketplaceHeroVideo`
- `MarketplaceSignalField`
- `MarketplaceDecisionGrid`
- `CIEIntelligenceFlow`
- `CommercialSignalCard`
- `SolutionVisual`
- `TradeExecutionFlow`
- `MarketplaceCommerceFlow`
- `ExwestOperatingModel`
- `GlobalCommercialNetwork`
- `CIEProductExperience` with restrained, progressive scroll state
- `AgenticCommerceFlow`
- `AgentAuthorityModel`

The conceptual CIE interface is explicitly labeled as a marketing/product visualization. One generated editorial image connects Trade to human sourcing work; its caption states that it is not a depicted customer or Exwest office. The built-in image-generation prompt requested a candid, diverse European commercial team evaluating unlabeled product samples and supplier documentation in a restrained project room, with no logos, flags, claimed location or customer evidence. The optimized derivative is `public/exwest-commercial-operations.jpg`.

The hero film is rendered from Exwest-native SVG/product-interface compositions by `scripts/render-marketplace-hero.mjs`; it uses no third-party media and presents no operational metrics as evidence. The 12-second, silent local WebM/MP4 loop has a strong WebP poster and nearby semantic explanation. Small screens and `prefers-reduced-motion` receive the poster instead of an active source. Other motion is transform/opacity or SVG dash based, slow and disabled by `prefers-reduced-motion`. Mobile layouts recompose flows rather than scaling desktop geometry down.

## 8. Privacy, legal and security posture

The German Impressum uses the verified company identity preserved in the legacy/company evidence: Exwest GmbH, Königsallee 92a, 40212 Düsseldorf, managing director Tekin Aldemir, Amtsgericht Düsseldorf HRB 104648 and VAT ID DE370220220. The provider basis is updated to § 5 DDG; the discontinued legacy EU ODR reference is not reused.

Privacy copy is implementation-specific: necessary locale cookie, intended Netlify server logs and Netlify Forms processing, no analytics, no external fonts and no embedded third-party media. The form is not connected to CRM, CIE runtime, Supabase or a database. It retains an explicit pre-cutover legal/technical verification gate for recipients, processing terms, storage, notifications and retention. German text is authoritative; English and Turkish texts are explanatory.

Security headers set nosniff, strict-origin referrer policy, browser capability restrictions and same-origin framing. A production CSP and HSTS should be enabled only after the final domain, services and redirect topology are confirmed, to avoid freezing an incorrect policy.

## 9. Performance and accessibility budgets

- No remote font dependency. The sole above-the-fold media asset is an owned 1280×800 silent hero loop (approximately 206KB WebM / 268KB MP4) with metadata preload, fixed aspect ratio and static mobile/reduced-motion fallback.
- Localized 1200×630 social images are generated server-side; the existing legal fallback image is metadata-only.
- One 305KB editorial JPEG is loaded responsively below the fold on Trade pages and optimized by Next Image.
- No UI or animation framework.
- Semantic landmarks and heading levels, skip link, visible focus states, keyboard-operable controls and accessible navigation state.
- Core layouts now use a mobile-first base for 320–430px, then progressively enhance at 561, 821 and 1101px. The CIE product experience has a dedicated vertical mobile composition rather than a scaled desktop interface. Turkish headline wrapping, form stacking, navigation, operating-model, network and workflow visuals receive explicit narrow-screen rules.
- Marketplace copy addresses brand owners, manufacturers, E-Commerce operators, marketplace teams and consumer-product companies first. Supplier discovery, qualification, RFQ and negotiation remain owned by International Trade; landed cost, MOQ and supply constraints may appear in CIE Marketplace only when they affect product economics.
- Non-critical visual semantics are CSS/SVG; decorative elements are hidden from accessibility APIs.

Release QA still requires a connected browser/device screenshot baseline and keyboard/assistive-technology pass on an approved preview.

## 10. Search and AI discovery

Core meaning remains server-rendered HTML; diagrams and product visualization have adjacent semantic explanations. All primary localized pages have distinct metadata, canonicals, hreflang, structured data and generated social cards. `robots.txt` explicitly permits Googlebot, Bingbot and OAI-SearchBot in production while preview contexts block all crawlers.

An experimental `llms.txt` provides verified orientation and canonical links but expressly makes no ranking claim. Search Console, Bing Webmaster Tools and optional IndexNow actions are documented for post-launch rather than performed without credentials or production authority.

## 11. Deployment and cutover

The repository is Netlify-preview ready but not connected to production. Preview and branch contexts disallow indexing. Production cutover is a separate change requiring an approved preview URL, final legal review, legacy Search Console/backlink export, redirect confirmation, domain attachment/DNS plan, rollback plan and explicit authorization.

No production domain, DNS record, legacy deployment, Exwest Modular property, configurator runtime, database or outbound communication is changed by this implementation.
