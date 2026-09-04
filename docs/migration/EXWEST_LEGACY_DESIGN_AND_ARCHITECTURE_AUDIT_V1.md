# Exwest Legacy Design and Architecture Audit V1

**Status:** Source-validation and design-freeze audit; no implementation or production authority  
**Audit date:** 2026-09-04  
**Target repository:** `/Users/tekin_a/Projects/exwest-corporate`  
**Frozen legacy reference:** `/Users/tekin_a/Projects/exwest-static-reference`  
**Operational/CIE reference:** `/Users/tekin_a/Projects/exwest-configurator`  

## 1. Executive decision

The legacy site is a compact, well-structured single-page lead-generation site for modular property development. Its strongest reusable qualities are its restrained dark/warm-neutral palette, clear section rhythm, concise eyebrow/headline pattern, large architectural imagery, direct calls to action, and consistent card grammar.

Its business story is no longer suitable as the primary Exwest corporate identity. The current CIE material positions Exwest around governed, AI-assisted commercial intelligence and revenue infrastructure, with explicit human approval and strict platform/product/CRM boundaries. The new corporate site should therefore preserve the legacy site's visual calm and decision-oriented clarity while replacing its property-development-first information architecture.

Recommended hierarchy:

```text
Exwest — corporate umbrella, trust, governance and group narrative
└── CIE — governed commercial intelligence / revenue infrastructure foundation
    ├── Trade — CIE-enabled B2B market, export and opportunity-intelligence application lane
    └── E-Commerce — CIE-enabled commerce and marketplace decision-intelligence application lane

Exwest Modular — separate operational business/site, linked as a portfolio or operating company
```

This hierarchy is a website positioning recommendation, not authority to rename, launch or operationalize any CIE capability. Public copy must distinguish implemented, governed, partial, research-only, blocked and future capabilities.

## 2. Scope, evidence and repository boundaries

The full legacy frontend inventory contained 31 source/configuration/public files. The audit covered every route, component, global style, framework/build configuration, SEO file, form definition and media asset. Binary assets were inspected for dimensions, encoding, file weight and visible treatment. The hero video was sampled at multiple timestamps and inspected with media metadata.

The legacy site was also started from an isolated temporary copy and returned HTTP 200; its TypeScript check passed. No browser surface was attached to the audit session, so responsive conclusions are derived from the complete Tailwind breakpoint/class implementation rather than screenshot-tested devices. This limitation must be closed during implementation QA.

The CIE repository was read only where necessary to understand positioning, authority and layer boundaries. No operational code was copied. Neither sibling repository was modified.

Primary CIE references consulted:

- `docs/commercial/COMMERCIAL_POSITIONING.md`
- `docs/commercial/PLATFORM_COMMERCIAL_PRODUCT_BOUNDARY_V1.md`
- `docs/commercial/COMMERCIAL_PRODUCT_DECISION_INTELLIGENCE_RECORD_V1.md`
- `docs/commercial/cie-commercial-launch/CIE_CURRENT_COMMERCIAL_EXECUTION_ARCHITECTURE_HANDOFF_V2.md`
- `ARCHITECTURE_LAYER_MODEL.md`
- `docs/migration/modulare-projektentwicklung.md`

Authority caution: the current architecture handoff is explicitly an orientation document with no new architecture or production authority. The commercial decision record is an approved research recommendation, not production authorization. Website claims must be grounded in the authoritative implementation/governance state, not promoted from roadmap language.

## 3. Legacy technology stack

| Area | Legacy implementation | Audit finding |
|---|---|---|
| Framework | Next.js App Router; `next` range `^16.0.7`, lockfile `16.2.4` | Modern React framework with a very small route surface. |
| UI runtime | React/React DOM ranges `^19.2.3`, lockfile `19.2.5` | Only the cookie notice and inquiry form require client state. |
| Language | TypeScript 5, strict mode; lockfile `5.9.3` | `tsc --noEmit` passed in the isolated audit copy. |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss`; lockfile `4.2.4` | Almost all design decisions are inline utility classes; no explicit token layer. |
| Global CSS | `app/globals.css` | Resets, system font, hero media switching, selection and focus rules only. |
| Hosting | Netlify with `@netlify/plugin-nextjs` `5.15.10` | Next runtime adapter plus Netlify Forms. |
| Form handling | Client POST to `/__forms.html`; hidden static Netlify form | No CRM integration, server validation, persistence contract or anti-abuse control beyond honeypot. |
| SEO | Next Metadata API, JSON-LD, static `robots.txt`, `sitemap.xml`, manifest | Strong baseline, but route-specific canonical/legal indexing defects exist. |
| Content | Hard-coded arrays and JSX in `app/page.tsx` | No CMS, content model, localization or editorial workflow. |
| Testing | `typecheck` script only | No unit, integration, accessibility, visual-regression or end-to-end suite. |
| Analytics/consent | No analytics code; localStorage consent notice | Consent UI exceeds the site's observed tracking behavior and is not a full CMP. |

Not present: authentication, database, API routes, CMS, internationalization, analytics, error monitoring, image provenance register, design tokens, lint script, automated sitemap generation, redirects or security-header configuration.

## 4. Old information architecture

### 4.1 Routes

| Route | Purpose | State |
|---|---|---|
| `/` | Single-page modular project-development funnel | Complete legacy page |
| `/impressum` | Legal provider information | Placeholder; not legally complete |
| `/datenschutz` | Privacy information | Placeholder; not legally complete |
| `/agb` | Terms | Placeholder; not legally complete |
| framework 404 | Return-to-home, project inquiry and Exwest Modular options | Implemented |

There are no independent service, company, case-study, team, press, careers, CIE, Trade or E-Commerce pages.

### 4.2 Homepage sequence

1. Overlay header and full-bleed hero.
2. “Warum jetzt” problem cards.
3. Numbered modular-development solution list.
4. Three project-model cards: Co-Living/Micro-Living, Lodge Hotel and Boardinghouse/municipal accommodation.
5. Two entry paths: develop land or repurpose an existing property.
6. Partnership model: land, capital, operator and Exwest.
7. Bankability/energy-efficiency disclaimer.
8. Six use-case cards.
9. Five target-partner cards.
10. Six-step project process.
11. Six-question FAQ.
12. Segmented project-inquiry form.
13. Exwest Modular operational handoff.
14. Navigation, operational and legal footer.

The page is coherent for one offer, but too long and semantically narrow for a corporate umbrella with multiple business/application lanes.

## 5. Design-system inventory

### 5.1 Visual character

The visual language is deliberately restrained and architectural: nearly monochrome UI, warm off-white backgrounds, dark navy-slate emphasis, large photo panels, thin borders, limited shadows, modest radii and spacious desktop grids. It communicates seriousness and project scale better than innovation, intelligence or software differentiation.

### 5.2 Typography

| Element | Legacy rule | Recommendation |
|---|---|---|
| Font family | Arial, Helvetica, sans-serif | Evolve to a licensed, high-legibility corporate grotesk or a carefully tuned system stack; retain pragmatic clarity. |
| Hero H1 | 34.4px mobile; 48px small screens; 60px medium; 600 weight; 1.08 line height | Preserve large, direct hierarchy; reduce long compound headlines and define fluid type tokens. |
| Section H2 | 30px mobile; 48px medium; 600; tight tracking | Preserve the pattern, formalize responsive clamp values. |
| Card H3 | Predominantly 20–24px, 600 | Preserve consistent card hierarchy. |
| Body | 16px or 18px with 28–32px line height | Preserve readability; constrain line lengths more consistently. |
| Eyebrows | 12px, uppercase, 600, 0.16–0.26em tracking | Strong reusable signature; keep but limit frequency and confirm accessibility. |

There is no custom font loading, fallback metric tuning or explicit typographic scale.

### 5.3 Color inventory

| Role | Legacy value/class | Recommendation |
|---|---|---|
| Primary ink/dark surface | `#020617` / slate-950 | Preserve as near-black brand anchor. |
| Main canvas | `#f5f3ef` | Preserve/evolve as warm editorial neutral. |
| Footer surface | `#ebe7df` | Preserve tonal warmth. |
| Form surface | `#f8f7f4` | Preserve as soft inset surface. |
| Main light surface | white | Preserve. |
| Secondary surfaces | slate-100/slate-200 | Preserve but convert to named tokens. |
| Secondary text | slate-600/slate-700 | Re-test every combination against WCAG AA. |
| Dark-section text | slate-200/300/400 | Keep hierarchy; test over video/image overlays. |
| Status colors | amber, emerald and red palettes | Retain semantically, not as brand colors. |

The new identity needs one controlled accent family to distinguish CIE, Trade and E-Commerce states without turning each lane into an unrelated sub-brand. The core corporate palette should remain dark/warm-neutral.

### 5.4 Spacing and layout

- Primary content width: `max-w-7xl` (approximately 1280px).
- Horizontal padding: 16px mobile, 32px small screens, 40px large screens.
- Standard section padding: 48px mobile, 64px small screens.
- Common content gaps: 12, 16, 20, 24, 32 and 40px.
- Hero minimum height: 70vh mobile, 76vh from the small breakpoint.
- Split layouts generally activate at 1024px.
- Most sections use simple centered wrappers rather than a formal grid system.

The rhythm is consistent and worth retaining. It should be encoded as layout primitives (`Container`, `Section`, `Stack`, `Grid`) instead of repeated utility strings.

### 5.5 Cards

Recurring card grammar:

- 1px slate-200 border;
- white background;
- small `rounded-lg` radius;
- 20–24px padding;
- limited `shadow-sm` use;
- optional top image with overlay badge;
- optional numbered index;
- optional divider and small contextual footer.

Reusable card concepts include problem cards, numbered capability cards, media cards, use-case cards, partner/persona cards, process steps, FAQ cards and dark advisory panels. The new site should reduce the number of near-duplicate card variants and define no more than four semantic families: capability, evidence/case, pathway and advisory/status.

### 5.6 Image treatment

- Next Image `fill` with `object-cover`.
- Project-card media height: 224px.
- Larger image panel minimum height: 288px.
- Quality set to 65 and responsive `sizes` hints supplied.
- Dark bottom gradients support white/light labels.
- Labels use translucent white panels.
- The final Exwest Modular panel uses a dark surface and 90% image opacity.

The treatment is reusable, but source files are too large and several extensions do not match their actual encodings. New assets need correct MIME/extension, explicit focal points, responsive derivatives, provenance and licensing metadata.

The isolated Next 16 runtime also emitted a warning for every `next/image` instance requesting quality 65 because the empty `next.config.js` does not include 65 in `images.qualities`. This must be corrected explicitly if the pattern is retained; it should not be copied as-is.

### 5.7 Hero and video treatment

The hero uses a full-bleed media layer, two dark overlays and left-aligned copy. Below 768px it shows a still image; at 768px and above it hides the still and displays an autoplaying, muted, looping, plays-inline MP4. The video has `preload="none"`, no explicit poster, no user control and is marked decorative.

Media facts:

- H.264, 1280×720, 24fps;
- 8 seconds;
- approximately 4.9MB;
- includes an AAC audio stream even though playback is muted;
- visible `Veo` watermark in sampled frames.

The concept of motion-supported hero storytelling may be retained, but this file should not be used in the new site. Any future motion asset should be rights-cleared, watermark-free, silent at encoding level, poster-backed, bandwidth-budgeted and disabled under `prefers-reduced-motion` and data-saving conditions.

### 5.8 Navigation

- Header sits inside the hero; it is not sticky.
- Desktop navigation has three in-page anchors.
- The main navigation is hidden below 768px; mobile retains only wordmark and Contact CTA.
- There is no mobile menu, active state, dropdown, breadcrumbs on page, language switcher or route-level service navigation.
- The brand is a text wordmark, not an image logo.

The minimalist header is attractive for a single page but cannot support the recommended multi-route corporate architecture. Preserve the calm visual density and prominent contact action; evolve to an accessible responsive menu with clear business-lane navigation.

### 5.9 Footer

Desktop uses a three-column grid: brand description, navigation/operational links and legal links. It collapses cleanly on smaller screens and includes a dynamic copyright year. The footer has good hierarchy but lacks company address, corporate registration details, social/professional links, press/careers, status/security or a clear group structure.

### 5.10 CTA patterns

- Primary light-on-dark CTA with arrow.
- Primary dark-on-light form action.
- Secondary bordered CTA.
- Compact white Contact button in the hero header.
- Text-like card prompt ending in an arrow.
- Strong terminal handoff CTA to Exwest Modular.

The direct, verb-led style is worth preserving. New CTAs must reflect commitment level and lane: “CIE einordnen”, “Trade opportunity prüfen”, “E-Commerce audit besprechen”, “Unternehmen kennenlernen” and “Kontakt” should not all route to one undifferentiated form.

### 5.11 Responsive behavior

Implemented breakpoints include a custom 430px condition plus Tailwind `sm` (640px), `md` (768px), `lg` (1024px) and `xl` (1280px).

- Single-column mobile layouts progressively become two-, three-, five- or six-column grids.
- Header anchor navigation is desktop-only from 768px.
- Video is desktop/tablet-only from 768px; mobile uses a still image.
- CTAs are full-width on mobile and auto-width from 640px.
- Form fields become two columns from 640px.
- Long headings use `overflow-wrap:anywhere` in critical areas.
- Footer subnavigation becomes two columns from 430px; full footer becomes three columns at 1024px.
- Touch targets generally range from 40px to 56px.
- The cookie notice caps its mobile height at 34vh and becomes horizontally arranged at 640px.

Risks: no functional mobile navigation; no reduced-motion rule; potentially dense five/six-column desktop card grids; hero copy may compete with animated detail; no browser/device screenshots or visual regression baseline; and the form remains long on mobile.

### 5.12 Accessibility baseline

Positive elements include semantic sectioning, real headings, labels, visible focus rules, adequate target sizes, decorative media marked `aria-hidden`, image alt text and live form status panels. Risks include generic alt text, no skip link, no reduced-motion behavior, no explicit error focus/live-region behavior, no mobile navigation, potential muted-text contrast issues, and reliance on placeholder/legal copy that cannot satisfy informed privacy expectations.

## 6. Reusable visual components

Preserve or evolve these concepts, not their current hard-coded implementations:

1. **Dark media hero** — retain the strong first impression, but use verified brand media and shorter corporate positioning.
2. **Eyebrow + headline + supporting text** — make it the core editorial section header.
3. **Numbered process/capability rows** — useful for CIE's governed stages and human-approval model.
4. **Media capability card** — suitable for Trade and E-Commerce application stories when backed by real evidence.
5. **Pathway cards** — reuse the “two entries” idea for audience or engagement paths.
6. **Advisory/status panel** — valuable for precise governance, limitations and current-status disclosure.
7. **Proof/evidence card** — evolve FAQ/use-case grammar into evidence-led case or capability summaries.
8. **Segmented inquiry form** — retain adaptive intent copy, but replace property-specific taxonomy and Netlify-only processing.
9. **Operational handoff panel** — retain for transparent separation between Exwest corporate, CIE applications and Exwest Modular.
10. **Structured footer** — expand it to show corporate, platform/application and operating-company relationships.

## 7. Legacy business content disposition

### 7.1 Content to preserve as historical/domain context

- Exwest's preference for concrete problems, structured process and direct partner conversations.
- The principle of separating strategic/corporate framing from an operational Exwest Modular destination.
- Credibility-oriented caveats rather than blanket guarantees.
- The general language of analysis, concept, economic assessment and human coordination where it remains factually true.

### 7.2 Content to retire from the corporate primary narrative

- “Modulare Projektentwicklung” as the definition of Exwest corporate.
- The property-development hero and the land/capital/operator/Exwest partnership model as homepage core.
- Co-Living, Micro-Living, Lodge Hotel and Boardinghouse as the three primary Exwest offers.
- The property-only navigation and property-specific inquiry funnel.
- “Strategie und Konzept entstehen über exwest.de” unless governance confirms this remains an active contractual route.

### 7.3 Content requiring revalidation before any reuse

| Legacy claim/content | Required action |
|---|---|
| Unit ranges such as 20–120, 12–80 and 16–150 | Remove unless supported by a current offer, owner and evidence. |
| Faster build, lower risk, lower initial capital and predictable utilization implications | Require operational evidence and precise qualifiers. |
| KfW-40/KfW-40-NH references | Revalidate against current programs, technical scope and legal review. |
| Target groups, operator models and partner roles | Confirm current commercial ownership and lead-routing capability. |
| Exwest Hotels, automated stay and municipal-use imagery/copy | Verify that these are real offers/projects and that marks/claims are authorized. |
| Exwest Modular relationship and outbound link | Confirm current brand/group relationship and canonical URL. |
| FAQ answers | Rewrite for current Exwest/CIE positioning; do not present roadmap capabilities as available services. |
| Contact form purposes | Define purpose, controller, lawful basis, retention, recipients and routing before collection. |

## 8. Asset disposition

The media set is approximately 35MB before framework optimization. Several `.webp` filenames contain JPEG or PNG data, so extension-based assumptions are unreliable.

| Asset | Facts and visible content | Disposition |
|---|---|---|
| `hero-coliving.webp` | Actual JPEG, 1376×691, 1.2MB; urban modular housing | Keep only as frozen reference/shot-list inspiration; reuse requires rights and authenticity review. |
| `Modular Lodge Hotel.webp` | Actual JPEG, 2816×1373, 4.4MB; “EXWEST HOTELS” signage | Retire from public use unless the depicted project and mark are verified. |
| `Boardinghouse.webp` | Actual PNG, 2816×1364, 7.5MB; airport/municipal-use messaging | Retire from public use unless provenance, location and claims are verified. |
| `land.webp` | Actual JPEG, 1200×818, 1.0MB; vacant commercial plot | Lowest-claim visual; may be considered only after rights/provenance review and re-encoding. |
| `cotainer_urban.webp` | Actual PNG, 2752×1380, 7.2MB; urban modular living and synthetic-looking signage | Retire from public use; retain in archive only. Filename is misspelled. |
| `commerical_builidng.webp` | Actual PNG, 2752×1377, 7.3MB; Düsseldorf cityscape | Use only if location and image rights are verified; rename and re-encode if approved. Filename is misspelled. |
| `retail.webp` | Actual JPEG, 1536×1024, 2.1MB; blue retail container; unused in the page | Retire; it is unused and visually disconnected from the corporate story. |
| `hero-modular.mp4` | 1280×720 H.264/AAC, 8s, 4.9MB; visible Veo watermark | Retire. Do not publish in the new site. |
| `favicon.svg` | Dark rounded square with white “E” motif | Worth evolving if brand ownership approves; create a complete icon set. |
| `site.webmanifest` | Exwest name, colors and standalone display metadata | Retain the concept, rewrite description/colors/icons for the new identity. |
| `robots.txt` / `sitemap.xml` | Correct canonical host intent | Retain intent; generate from the new route system rather than hand-maintain. |

The imagery visually appears synthetic in several places; that is an audit inference, not a provenance finding. A rights/provenance register must decide whether any source file can legally and credibly be reused.

## 9. Legal and privacy audit

The three legal routes are explicit placeholders and must not ship as production legal pages. The privacy page is especially urgent because the inquiry form collects name, company, email, phone, role, interest, location and free text.

Required pre-launch decisions:

- Confirm legal entity, address, managing representatives, register/VAT details and responsible contact for the Impressum.
- Complete privacy notice covering form processing, hosting, logs, analytics, embedded media, retention, recipients/processors, transfers and rights.
- Decide whether AGB are needed and for which offer; remove/noindex the route until approved if not applicable.
- Define form lawful basis, data minimization, retention and deletion workflow.
- Add server-side validation, rate limiting/spam controls, auditability and a user confirmation path.
- Use a consent platform only for actual non-essential technologies. The current “Alle akzeptieren” choice has no observed corresponding non-essential technology and may confuse users.
- Do not add tracking, embeds or marketing automation before consent/legal review.

## 10. Netlify build and delivery configuration

Current `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Additional delivery behavior:

- `package.json` build command is `next build`.
- The Next plugin is pinned through the lockfile at `5.15.10`.
- Netlify Forms detection is provided by `public/__forms.html`.
- Client submission posts URL-encoded data to that static form endpoint.
- `next.config.js` is empty.
- The empty image configuration does not permit the page's requested quality 65 under the audited Next 16 runtime and emits runtime warnings.
- No redirects, rewrites, environment contexts, scheduled functions, edge functions, custom headers, CSP, HSTS, asset caching, deploy-preview rules or branch rules are defined in repository configuration.

Recommendations for the new repository:

1. Re-establish Netlify configuration from the chosen framework's current supported adapter, not by copying blindly.
2. Pin Node and the package manager; commit the lockfile and use reproducible CI installs.
3. Verify Next/Netlify adapter compatibility before selecting a framework version.
4. Add preview-context rules and ensure previews are non-indexable.
5. Define security headers and a CSP compatible with the final analytics/form stack.
6. Define redirects only after the SEO URL/backlink inventory is approved.
7. Replace or explicitly govern Netlify Forms; do not silently connect it to the operational CRM.
8. Add build, type, lint, test and link-check gates before any deploy.

## 11. SEO migration considerations

### 11.1 Legacy strengths

- German document language.
- Strong homepage title and description for the old topic.
- Canonical host intent: `https://www.exwest.de`.
- Open Graph and Twitter metadata.
- Organization, WebSite, WebPage, breadcrumb and FAQ JSON-LD.
- Crawlable robots file and sitemap.
- Descriptive, visible FAQ content matching schema.

### 11.2 Defects and migration risks

- The root layout defines canonical `/`, so legal routes can inherit the homepage canonical unless overridden.
- Legal placeholders are crawlable and included in the sitemap.
- All routes inherit homepage social metadata and description.
- The declared Open Graph dimensions (1200×630) do not match the source hero image (1376×691).
- Sitemap is static, has no `lastmod`, and can drift from routes.
- No redirect inventory, legacy backlink inventory, Search Console baseline or query/page performance export is present.
- No route-specific structured data beyond the homepage graph.
- Keywords metadata should not drive the new strategy; intent-led page content and evidence matter more.
- The old modular-development keyword footprint could be lost or incorrectly transferred if modular content is simply deleted.

### 11.3 Required migration controls

1. Export current indexed URLs, top queries/pages, backlinks and any known historical routes before changing production.
2. Confirm one canonical hostname (`www` or apex) and enforce it consistently.
3. Assign unique title, description, canonical, Open Graph and social image per indexable route.
4. Generate robots and sitemap from route/content state; exclude preview and incomplete legal pages.
5. Create a one-to-one redirect map. Avoid sending unrelated legacy URLs to the homepage.
6. Preserve modular-development demand either in a truthful historical/portfolio page or with a relevant redirect to Exwest Modular, subject to business approval.
7. Keep FAQ schema only where the same questions and answers are visible.
8. Add Organization data with verified legal identity and sameAs links only.
9. Create a custom 404 that routes users to CIE, Trade, E-Commerce, Exwest Modular or contact based on intent.
10. Validate status codes, canonicals, schema, sitemap, robots, social cards and internal links in preview before release.
11. Record pre/post-launch crawl and performance baselines and monitor 404s, coverage and rankings after launch.

## 12. Recommended new site architecture

### 12.1 Positioning hierarchy

**Exwest corporate** owns the umbrella narrative: governed commercial intelligence, responsible AI-assisted decision support, human authority, evidence, trust, group structure and contact.

**CIE** is the primary enabling platform/capability story. Approved public principles are: evidence and signal acquisition, research/enrichment, prioritization, workflow/approval discipline, and human-approved execution. It must not be positioned as an autonomous AI SDR, autonomous sender, autonomous negotiator, autonomous pricing system or already-complete revenue optimizer.

**Trade** is a CIE-enabled application lane for B2B market/export/procurement opportunity intelligence and managed commercial work. It should describe customer problems, bounded deliverables and engagement workflow, not imply ownership of buyers, guaranteed opportunities or automated outreach.

**E-Commerce** is a CIE-enabled application lane for commerce/marketplace decision intelligence. Current CIE evidence supports careful research/pilot language, not claims of proven profit optimization, autonomous marketplace control or unrestricted private-data readiness.

**Exwest Modular** remains outside the CIE application hierarchy as a separate operational business/destination. It may be represented under “Operating companies” or “Portfolio” with an external link, after relationship and wording approval.

### 12.2 Proposed route map

```text
/
├── /commercial-intelligence        CIE category, principles, capabilities and current-state boundaries
│   ├── /commercial-intelligence/how-it-works
│   ├── /commercial-intelligence/governance
│   └── /commercial-intelligence/engagements
├── /trade                          CIE-enabled Trade application lane
├── /e-commerce                     CIE-enabled commerce application lane
├── /evidence                       Approved case studies, methods and proof; no invented metrics
├── /company                        Exwest identity, operating model and group structure
├── /contact                        Intent-routed, privacy-complete contact entry
├── /impressum
├── /datenschutz
└── /agb                            Only if approved and applicable

External/portfolio link: exwestmodular.de
```

Do not launch empty child routes merely to fill navigation. For the first release, `/commercial-intelligence`, `/trade`, `/e-commerce`, `/company`, `/contact` and complete legal pages are the minimum credible multi-page structure. Add CIE child routes only when enough approved content exists.

### 12.3 Homepage narrative order

1. Corporate hero: what Exwest is and for whom.
2. Core problem: fragmented commercial evidence, prioritization and execution.
3. CIE foundation: evidence → intelligence → human-approved action.
4. Application lanes: Trade and E-Commerce.
5. Governance: AI prepares; humans approve, communicate, negotiate and close.
6. Evidence/current state: only verified capabilities, pilots and constraints.
7. Engagement paths: audit, managed investigation or approved product path.
8. Exwest group/operating-company relationship, including Exwest Modular.
9. Intent-routed contact CTA.

## 13. Risks

| Risk | Severity | Control |
|---|---:|---|
| Marketing blocked, partial or research-only CIE capabilities as live products | Critical | Capability/claim matrix with architecture owner approval before copy freeze. |
| Copying operational architecture into the corporate frontend | Critical | Keep the site presentation-only; use approved public contracts/APIs later under separate authority. |
| Publishing incomplete legal/privacy information while collecting leads | Critical | Legal gate before public forms or indexing. |
| Reusing synthetic/unlicensed or misleading project imagery | High | Asset provenance register; commission verified media; retire unverified files. |
| Losing existing modular-development search equity | High | Search Console/backlink export and approved redirect/content map. |
| Confusing CIE, Trade, E-Commerce and Exwest Modular | High | One documented brand/offer hierarchy applied consistently to nav, copy, schema and forms. |
| Claiming autonomous AI behavior contrary to governance | High | Prohibited-claims list and human-authority copy review. |
| Form data flowing into CRM without purpose/authority | High | Standalone form contract, legal basis, retention and integration approval. |
| Repeating a long single-page card catalogue | Medium | Multi-route IA and evidence-led content with fewer card families. |
| Poor motion/performance from hero media | Medium | Poster-first, reduced-motion/data rules and explicit performance budgets. |
| Framework/adapter drift | Medium | Pin versions and validate Netlify compatibility in CI. |
| Mobile navigation and visual regressions | Medium | Browser/device matrix, automated visual tests and accessible menu. |
| Stale hard-coded SEO/legal content | Medium | Typed metadata/content ownership and release checks. |

## 14. Exact proposed implementation plan

No step below authorizes deployment, DNS changes, production mutation or operational integration.

### Phase 0 — approval inputs

1. Name one approver each for corporate positioning, CIE architecture claims, Trade, E-Commerce, brand assets, legal/privacy and SEO.
2. Approve the hierarchy in section 12.1 or amend it before UI work.
3. Produce a public-claims matrix with: claim, source, capability state, permitted wording, owner, evidence date and expiry/review date.
4. Decide whether Exwest Modular is an operating company, portfolio brand, service partner or simple external reference.
5. Decide the canonical host and primary language strategy.

**Gate 0:** signed positioning, claims and ownership decisions.

### Phase 1 — content and SEO freeze

6. Export the current exwest.de URL/index/query/backlink baseline.
7. Approve the route map, homepage narrative and one primary conversion goal per route.
8. Write German content briefs for Home, CIE, Trade, E-Commerce, Company and Contact.
9. Mark every statement as verified current capability, governed service, research/pilot, future direction or prohibited.
10. Create the redirect and canonical matrix, including the modular-development disposition.

**Gate 1:** approved content briefs and SEO migration map.

### Phase 2 — brand and asset system

11. Convert the preserved palette/spacing/type qualities into named tokens.
12. Select typography and one controlled accent system for application-lane differentiation.
13. Create/approve the Exwest wordmark, favicon set, social-card template and application-lane labels.
14. Build an asset register with source, creator, license, depicted fact/project, consent, expiry, alt text, focal point and allowed channels.
15. Commission or select verified replacement photography/illustration; create optimized AVIF/WebP/JPEG derivatives and optional rights-cleared motion.

**Gate 2:** approved tokens and a publishable asset set.

### Phase 3 — repository foundation

16. Scaffold the frontend only in `exwest-corporate` with a pinned, Netlify-supported stack, TypeScript strict mode and reproducible lockfile.
17. Add formatting, linting, type checking, unit tests, accessibility checks, link checks and build validation.
18. Define typed content/metadata models; do not import operational CIE/CRM code.
19. Create primitives for container, section, stack, grid, typography, button/link, card, media, status/advisory and form controls.
20. Add an accessible skip link, responsive navigation, footer and route-level metadata helpers.

**Gate 3:** clean CI and approved component foundation.

### Phase 4 — page implementation

21. Implement Home using the approved corporate narrative.
22. Implement CIE with a visible current-state/limitations section and human-authority model.
23. Implement Trade and E-Commerce as CIE application lanes with distinct audiences, bounded outcomes and proof requirements.
24. Implement Company and the transparent Exwest Modular/group relationship.
25. Implement complete, counsel-approved legal pages.
26. Implement the intent-routed Contact page without operational integration; use only the approved data-processing route.
27. Add verified evidence/case content only; omit empty or speculative claims.

**Gate 4:** content, architecture, brand and legal review of the complete preview.

### Phase 5 — delivery and QA

28. Add Netlify preview configuration, adapter validation, security headers and non-indexing preview controls.
29. Test at 320, 375, 390, 430, 640, 768, 1024, 1280 and 1440px plus keyboard-only and screen-reader paths.
30. Test reduced motion, slow connection, missing media, form success/error, 404 and external-link behavior.
31. Enforce performance budgets for JS, fonts, hero media, LCP, CLS and interaction latency.
32. Validate HTML semantics, WCAG AA contrast/focus, metadata, canonicals, robots, sitemap, structured data and redirects.
33. Capture approved desktop/mobile visual baselines.
34. Run a final repository-boundary check proving no sibling or operational code was copied or changed.

**Gate 5:** release candidate accepted; still no production deployment.

### Phase 6 — separately authorized release

35. Request explicit deployment authorization with build SHA, preview URL, rollback plan, DNS impact statement, redirect map and monitoring checklist.
36. Deploy only after authorization; do not combine deployment with DNS changes unless separately approved.
37. Monitor crawl errors, canonicals, rankings, forms, performance and uptime against the captured baseline.

## 15. Design freeze decision register

### Preserve

- Dark/warm-neutral corporate tone.
- Large, concise editorial hierarchy.
- Eyebrow/headline/body rhythm.
- Clear, direct CTA language.
- Thin-border, low-shadow cards.
- Spacious section rhythm and restrained radii.
- Transparent separation between strategy/corporate and operating destinations.

### Evolve

- Text-only brand into a governed identity system.
- Single-page anchors into multi-route navigation.
- Repeated Tailwind strings into tokens and primitives.
- Generic architectural imagery into verified evidence-led media.
- Property inquiry segmentation into CIE/Trade/E-Commerce intent routing.
- Static SEO files into route-derived metadata and sitemap.
- Disclaimer panels into explicit capability/current-state governance communication.

### Retire

- Legacy modular-development-first corporate positioning.
- Unverified project ranges, efficiency, financing and delivery implications.
- Placeholder legal pages.
- Watermarked hero video.
- Unverified/synthetic-looking project imagery as evidence of completed work.
- Property-only navigation and form taxonomy.
- Cookie choices that do not correspond to actual processing.
- Hand-maintained, route-incomplete SEO configuration.

## 16. Audit outcome

| Check | Result |
|---|---|
| Legacy reference found | PASS |
| Full legacy frontend/source inventory | PASS |
| Design system inventory | PASS |
| Media/image/video inventory | PASS |
| Responsive source audit | PASS, code-derived; browser/device QA remains an implementation gate |
| SEO/legal/Netlify audit | PASS |
| CIE positioning and architecture read | PASS |
| CIE operational code copied | NO |
| Sibling repositories modified | NO |
| New corporate site implemented | NO |
| Production/DNS modified | NO |

**Recommended next action:** approve the section 12 positioning hierarchy and appoint the seven Phase 0 content/architecture/legal owners before any frontend implementation begins.
