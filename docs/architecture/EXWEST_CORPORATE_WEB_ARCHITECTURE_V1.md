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

The corporate frontend is presentation-only. It contains no database client, CRM integration, Supabase dependency, operational agent, commercial pipeline, tenant runtime, or copied configurator code. The only conversion action in V1 opens the visitor's local email client.

## 2. Positioning and information hierarchy

The flagship is **CIE Solutions — Commercial Intelligence**. International Trade and E-Commerce are substantial secondary pillars that demonstrate practical execution and digital scale.

```text
CIE                    → Intelligence
International Trade    → Execution
E-Commerce             → Scale
```

The homepage narrative is deliberately single-page for V1 so every navigation item resolves to complete substantive content rather than an empty marketing route:

1. Corporate hero and global commercial-intelligence graph.
2. Three-pillar commercial system.
3. CIE architecture, governance and decision-support outputs.
4. Four distinct CIE solution areas.
5. International Trade execution flow and bounded capabilities.
6. E-Commerce commercialization flow and potential ecosystems.
7. Exwest operating model.
8. Global market orientation and application contexts.
9. Controlled portfolio references.
10. Company position and commercial-intent conversion.
11. Legal and corporate footer.

Dedicated solution routes should be introduced only when approved evidence supports deeper, non-duplicative content.

## 3. Claim governance

Public language is bounded by the read-only evidence in `../exwest-configurator`, including `COMMERCIAL_POSITIONING.md` and the current CIE architecture handoff. V1 presents CIE as AI-assisted, governed commercial decision support for investigation, normalization, comparison, explanation and prioritization.

V1 explicitly does not claim that CIE autonomously sends, negotiates, closes, prices, controls marketplaces, owns buyer relationships, guarantees opportunities, or represents blocked/research-only capabilities as production-ready. Copy states that AI prepares while people review, decide, communicate and negotiate.

## 4. Application architecture

- Next.js 16 App Router (patched 16.3.4 baseline), React 19 and strict TypeScript.
- Server Components by default. Client JavaScript is limited to navigation/language controls and the contact-intent selector.
- Central bilingual content in `lib/site-content.ts` and hero/navigation copy in `lib/i18n.ts`.
- Original, dependency-free CSS/SVG visuals; no dashboard library, video payload, remote font, tracking script or stock-image dependency.
- Generated route metadata, sitemap, robots policy, schema and localized legal metadata.
- Netlify build target with a pinned adapter, Node 20 and non-indexable preview contexts.

## 5. Internationalization

Indexable language URLs are separate: `/de/*` and `/en/*`. German is the principal language and `x-default`.

Root selection order:

1. Explicit `exwest_locale` cookie, stored for 180 days after manual selection.
2. Browser `Accept-Language` preference for English.
3. German default.

No permanent geo-IP redirect is used. Automatic selection never replaces an explicit choice. The visible DE | EN control maps both the homepage and translated legal counterparts. Every page sets a self-referencing canonical, DE/EN/x-default alternates and the correct document language through a locale request header.

## 6. SEO ownership

`exwest.de` owns Commercial Intelligence, CIE Solutions, export/market/marketplace intelligence, international trade, sourcing/procurement, market entry, E-Commerce strategy and product commercialization. It does not publish a real-estate topic cluster.

`realestate.exwest.de` must independently own real-estate content, canonicals, sitemap, robots rules, metadata and structured data. It appears here only as one intentional portfolio link. It is never present in the corporate sitemap and is never used as a corporate canonical.

Structured data is limited to verified Exwest GmbH Organization details and a bounded Commercial Intelligence service description. No unverified `sameAs`, review, customer, performance or location data is emitted.

## 7. Design system

The legacy visual DNA is retained through warm ivory surfaces, charcoal-green high-contrast fields, oversized editorial headlines, generous section rhythm, thin borders, minimal shadow/radius, direct CTA typography and a dense corporate footer. It evolves through mint/amber signal accents, cartographic intelligence graphics, evidence lanes and operational flows rather than property photography.

Custom visual modules:

- `GlobalCommerceGraph`
- `CIEIntelligenceFlow`
- `CommercialSignalCard`
- `SolutionVisual`
- `TradeExecutionFlow`
- `MarketplaceCommerceFlow`
- `ExwestOperatingModel`
- `GlobalCommercialNetwork`

All motion is transform/opacity or SVG dash based, slow and disabled by `prefers-reduced-motion`. Mobile layouts recompose flows rather than scaling the desktop geometry down.

## 8. Privacy, legal and security posture

The German Impressum uses the verified company identity preserved in the legacy/company evidence: Exwest GmbH, Königsallee 92a, 40212 Düsseldorf, managing director Tekin Aldemir, Amtsgericht Düsseldorf HRB 104648 and VAT ID DE370220220. The provider basis is updated to § 5 DDG; the discontinued legacy EU ODR reference is not reused.

Privacy copy is implementation-specific: necessary locale cookie, intended Netlify server logs, mailto contact, no analytics, no external fonts and no embedded third-party media. It retains an explicit pre-cutover legal/technical verification gate. German text is authoritative; English text is explanatory.

Security headers set nosniff, strict-origin referrer policy, browser capability restrictions and same-origin framing. A production CSP and HSTS should be enabled only after the final domain, services and redirect topology are confirmed, to avoid freezing an incorrect policy.

## 9. Performance and accessibility budgets

- No remote font dependency and no homepage raster hero/video.
- One 1200×630 social image is metadata-only.
- No UI or animation framework.
- Semantic landmarks and heading levels, skip link, visible focus states, keyboard-operable controls and accessible navigation state.
- Layout adaptations at 1100, 820 and 560 CSS breakpoints cover required review widths 1440, 1024, 768, 390 and 375.
- Non-critical visual semantics are CSS/SVG; decorative elements are hidden from accessibility APIs.

Release QA still requires a browser/device screenshot baseline and keyboard/assistive-technology pass on an approved preview.

## 10. Deployment and cutover

The repository is Netlify-preview ready but not connected to production. Preview and branch contexts disallow indexing. Production cutover is a separate change requiring an approved preview URL, final legal review, legacy Search Console/backlink export, redirect confirmation, domain attachment/DNS plan, rollback plan and explicit authorization.

No production domain, DNS record, legacy deployment, Exwest Modular property, configurator runtime, database or outbound communication is changed by this implementation.
