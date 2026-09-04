# Exwest amendment QA V1

Date: 4 September 2026
Approved baseline: `789c8905fa16a8165f4aeee07e199e54581781b4`

## Scope

This record covers the bounded DE/EN/TR and governed Agentic Commerce amendment. It does not authorize or record a production deployment, DNS change, or modification to an Exwest operational repository.

## Automated release gates

The following commands pass:

```text
npm run typecheck
npm run lint
npm test
npm run build
npm run qa:site
```

The production build generated all application, metadata-image, legal, sitemap, robots, and machine-orientation routes. Nine repository contract tests passed.

The live local production-server check validated:

- 21 canonical DE/EN/TR corporate URLs return HTTP 200;
- each localized route has the correct HTML language, self-canonical URL, localized title, localized OpenGraph locale, and reciprocal `de`, `en`, `tr`, and `x-default` alternates;
- German is the `x-default` target;
- explicit locale cookie preference overrides `Accept-Language`;
- Turkish, English, and German/default resolver cases route correctly;
- public `Googlebot`, `Bingbot`, and `OAI-SearchBot` access is explicit;
- the sitemap contains exactly 21 corporate URLs and no real-estate or modular-domain URL;
- representative DE, EN, and TR OpenGraph endpoints return PNG images;
- the experimental `llms.txt` endpoint is public and explicitly disclaims ranking effect.

A separate Netlify preview-mode build also passed. Its `robots.txt` disallows all crawling and its localized page HTML emits `noindex, nofollow`; the public production configuration retains explicit marketing-crawler access.

## Content and claim gates

- CIE current, emerging, and vision claims are separated in copy.
- The Agent Authority Model is approval-first and bounded.
- Exwest is not described as a payment institution or holder of customer funds.
- No current bank, PSP, marketplace, customer, or deployment integration is claimed.
- No fictional customer logo, testimonial, metric, or operational statistic is used.
- Turkish copy uses professional B2B terminology and does not translate the product name `CIE`.

## Visual and responsive implementation checks

Code-level inspection confirms dedicated behaviors at 320, 375, 390, 430, 768, 1024, 1280, and 1440 pixel target ranges through the responsive system. Small screens stack the CIE inputs/core/outputs, simplify graph density, reduce backdrop effects, wrap long German and Turkish headings, preserve 44-pixel language controls, and render the progressive CIE story as a stable non-scroll-dependent presentation. Reduced-motion users receive the same stable presentation.

The generated commercial-operations image and the Turkish CIE OpenGraph image were directly inspected as image artifacts. The commercial image is identified in visible copy as editorial and does not imply a customer, office, partnership, or case study.

## Browser validation limitation

No controllable browser was connected to the Codex browser runtime during this amendment. Therefore real-browser visual, keyboard, touch, scroll-animation, device-emulation, and Core Web Vitals measurements are not marked as passed. This is the remaining release gate before preview approval.

Required browser pass:

- verify navigation, language switching, cookie persistence, focus order, and menu behavior;
- inspect DE, EN, and TR at 320, 375, 390, 430, 768, 1024, 1280, and 1440 pixels;
- check scroll-driven CIE behavior and reduced-motion fallback;
- verify image cropping, label readability, heading wraps, footer, and horizontal overflow;
- measure Core Web Vitals on a Netlify preview or representative local production build.

## Production status

Production was not deployed. DNS and the existing real-estate, modular, CIE runtime, database, Supabase, and migration systems were not modified.
