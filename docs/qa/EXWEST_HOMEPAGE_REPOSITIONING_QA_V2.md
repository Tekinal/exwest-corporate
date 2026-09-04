# Exwest Homepage Repositioning QA V2

Status: implementation validation record  
Date: 2026-09-04  
Approved base: `5695232dd581dbf4d1e3d7206420dc1b8e5cb8d0`

## Scope

This amendment preserves the established Exwest design system and trilingual architecture while making CIE Marketplace the homepage's primary commercial proposition. It adds an owned hero motion asset, stronger conversion paths, a Netlify Forms lead contract, marketplace-specific SEO/AEO semantics and readability/visual-scale corrections.

## Implemented checks

- TypeScript strict compilation.
- ESLint.
- Repository contract tests for all three localized homepage routes, the CIE Marketplace hierarchy, owned video sources/poster, reduced-motion/mobile fallback, Netlify form detection, localized field states, Turkish terminology, metadata, canonicals, hreflang, sitemap, robots and preview behavior.
- Production Next.js build.
- HTTP QA against a production-mode local server for localized routes, media, form detector, metadata, legal routes, `robots.txt`, `sitemap.xml`, `llms.txt` and OpenGraph images.
- Preview-context build and non-indexability checks, followed by a final production rebuild.
- Static audits for secrets, placeholder copy, unsupported autonomy/payment claims and obsolete public-facing Turkish “İstihbarat” overuse.

## Hero-media contract

`scripts/render-marketplace-hero.mjs` reproducibly renders the 12-second 1280×800 silent product-story loop. The MP4 and WebM are local, owned, optimized and accompanied by a WebP poster. The animation uses conceptual product/SKU inputs, marketplace/pricing/supply signals, the CIE Marketplace decision layer and a governed next action. It contains no customer evidence, fabricated performance number or third-party artwork.

Mobile viewports and users requesting reduced motion receive the static poster because the video sources are restricted to wider, motion-enabled media conditions. Fixed dimensions and an aspect-ratio wrapper prevent layout shift.

## Form contract

The localized lead form posts URL-encoded fields to Netlify Forms. A static hidden form at `/__forms.html` enables build-time detection; the endpoint is excluded from indexing. The interactive form provides required labels, autocomplete, honeypot, inline validation, first-error focus, pending/error/success states and localized privacy acknowledgement. It does not write to an Exwest database, CRM, Supabase or CIE runtime.

Platform delivery, notification recipients, retention and data-processing terms remain a preview/cutover validation gate. No live submission was sent during repository QA.

## Browser limitation

The in-app browser was requested for rendered QA, but the environment reported that no browser runtime was available. Therefore 320, 375, 390, 430, 768 and 1440 viewport results must be reported as **not browser verified**, even though responsive CSS, static contracts and local HTTP responses pass. A connected browser/device review is still a release gate.

## Production boundary

No preview or production deployment, DNS change, production-domain attachment, sibling-repository modification, database change, Supabase action or outbound communication is part of this QA.
