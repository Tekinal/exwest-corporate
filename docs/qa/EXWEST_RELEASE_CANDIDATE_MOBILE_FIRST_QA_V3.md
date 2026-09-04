# Exwest Release Candidate Mobile-First QA V3

Status: implementation and non-browser contracts pass; production cutover blocked by rendered-device QA
Date: 2026-09-04
Approved base: `2e58f62b3b4c5989fd1f916e0164e972016cfa6b`

## Scope

This release-candidate remediation preserves the approved CIE Marketplace design and content architecture. It converts the core responsive cascade to a mobile-first base, introduces a dedicated vertical mobile CIE product experience and a mobile-specific hero poster, strengthens typography and contrast, and separates brand-owner marketplace decisions from International Trade supplier/procurement workflows.

No production deployment, DNS change, form submission or sibling-repository modification was made.

## Implemented release contracts

- Core layouts start with a one-column 320–430px composition and progressively enhance at 561px, 821px and 1101px.
- Grid and Flex children use `min-width: 0`; mobile grids use `minmax(0, 1fr)`; the prior narrow-screen negative-margin commerce treatment was removed.
- The site shell does not hide horizontal overflow globally.
- CIE Marketplace has a dedicated vertical mobile product view instead of shrinking the desktop interface.
- The mobile hero uses an owned 720×900 WebP poster. The wider layout retains the owned local WebM/MP4 product-motion film.
- Turkish headings disable arbitrary word breaking; responsive display tokens reduce the hero scale on narrow screens.
- Form fields stack at mobile widths, retain 16px input text and at least 44px interactive height.
- Header navigation becomes a keyboard-operable compact menu on narrow screens; DE, EN and TR controls retain 44px targets.
- Essential visible mobile diagram labels are 12–14px; remaining 7–10px declarations represent hidden desktop-interface detail at mobile or decorative indices/arrows rather than required explanatory content.
- Explicit foreground/background palette pairs pass WCAG AA contrast calculations. The form headline, body, labels and identity copy use stronger foreground tokens.

## Commercial narrative

CIE Marketplace now addresses brand owners, manufacturers with their own brands, E-Commerce operators, marketplace teams and consumer-product companies first. Homepage and CIE questions focus on products, SKUs, marketplace fit, pricing, competition, demand, inventory, margin, promotion and channels.

Supplier discovery, qualification, RFQ, quotation comparison, MOQ, lead time, logistics cost and procurement remain substantively available on the localized International Trade pages. CIE Marketplace references supply context only where landed cost, MOQ, reorder economics or constraints affect marketplace profitability.

## Automated and build results

The following pass:

```text
npm run typecheck
npm run lint
npm test
npm run build
netlify build --offline --context deploy-preview
npm run qa:site
```

The repository contract suite validates the mobile-first breakpoints, dedicated product composition, brand-owner/supplier boundary, owned hero assets, form contract, contrast pairs, trilingual routes, claim governance, crawler policies and preview non-indexability.

The local production-mode HTTP suite validates 21 localized pages, self-canonicals, reciprocal DE/EN/TR and German x-default alternates, structured data, resolver priority, internal links, public crawler rules, the corporate-only sitemap, `llms.txt`, Netlify form detection, media assets and representative OpenGraph images.

The Netlify deploy-preview build passed offline and remained non-indexable. A final production-mode build was then generated and validated locally. No preview was deployed.

## Browser and screenshot gate

Google Chrome is installed at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` and reports version 152.0.7977.76. Chrome was running during diagnostics, but Codex could not connect to it because the ChatGPT Browser extension (`hehggadaopoacecdllhhajmbjkdcmajg`) was absent from all Chrome profiles checked.

The required browser-control workflow therefore could not render, inspect or capture the DE/EN/TR matrix at 390×844, 430×932 and 1440×900. Lighthouse lab measurements, computed-style contrast inspection, keyboard/touch behavior and runtime overflow assertions are not certified. No screenshot artifacts are claimed.

`scripts/browser-overflow-audit.js` contains the required document-width assertion and visible-child bounding-rectangle diagnostics. It must be executed at 320, 360, 375, 390, 414 and 430px once a browser is connected. Until that matrix passes, horizontal-overflow and actual-device gates remain failed rather than inferred from CSS.

## Release decision

The codebase is ready to create a non-production preview, but it is **not ready for production cutover**. The remaining blocker is actual browser/device QA of overflow, visual hierarchy, Turkish/German wrapping, mobile navigation, form behavior, contrast, keyboard operation and lab performance.
