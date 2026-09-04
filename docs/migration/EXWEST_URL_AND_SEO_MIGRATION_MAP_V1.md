# Exwest URL and SEO Migration Map V1

Status: implementation map; production redirects not activated  
Date: 2026-09-04  
Source: frozen `../exwest-static-reference` route/source inventory

## 1. Migration principle

The existing real-estate operation remains active and indexable at `realestate.exwest.de`; the new corporate/CIE site owns `exwest.de`. Migration must preserve user intent. No old property URL is blindly redirected to an unrelated CIE page, and no corporate canonical points to the real-estate subdomain.

This repository only implements locale handling for the new corporate site and legacy legal aliases. Content/domain redirects requiring coordination with the future `Tekinal/exwest-realestate` repository are documented, not activated.

## 2. Legacy route inventory and disposition

| Legacy URL / intent | Classification | Corporate destination | Real-estate destination | Implementation decision |
|---|---|---|---|---|
| `https://exwest.de/` | **REPLACE WITH CORPORATE** and preserve old topic separately | `/de` (x-default) or `/en` | Future real-estate homepage | The apex remains the corporate entry and resolves by explicit preference / browser language. The legacy real-estate homepage content must be moved independently; do not redirect the apex away from corporate. |
| `/impressum` | **REPLACE WITH CORPORATE** | `/de/impressum` or `/en/imprint` | Real-estate site must publish its own applicable disclosure | A temporary locale-aware compatibility redirect is implemented. Final host-level redirect may become permanent only after cutover verification. |
| `/datenschutz` | **REPLACE WITH CORPORATE** | `/de/datenschutz` or `/en/privacy` | Real-estate site must publish its own implementation-specific notice | A temporary locale-aware compatibility redirect is implemented. The old placeholder is not reused. |
| `/agb` | **RETIRE** pending legal/product owner decision | None in V1 | Only if applicable to the separate real-estate offer | The legacy file is a placeholder. Return 404 until approved terms and their actual contractual scope exist; do not redirect it to CIE or the homepage. |
| framework 404 | **REPLACE WITH CORPORATE** | Corporate 404 with DE/EN entry paths | Independent real-estate 404 | Implemented in the new app. |

## 3. Legacy homepage fragment intents

Fragments are client-side locations and are not received by the server, so they cannot be individually redirected with HTTP 301 rules. Their content disposition is nevertheless explicit:

| Legacy fragment/topic | Classification | Future owner |
|---|---|---|
| Why-now/property pressure narrative | **MOVE TO REAL ESTATE** | `realestate.exwest.de` |
| Modular development solutions | **MOVE TO REAL ESTATE** or **REDIRECT** to the most relevant approved Exwest Modular/real-estate page | Destination requires content-owner approval |
| Co-Living, Lodge Hotel, Boardinghouse models | **MOVE TO REAL ESTATE** | `realestate.exwest.de` |
| Land development / property conversion | **MOVE TO REAL ESTATE** | `realestate.exwest.de` |
| Land, capital, operator partnership model | **MOVE TO REAL ESTATE** | `realestate.exwest.de` |
| Efficiency/finance/project ranges | **RETIRE** unless re-verified | No corporate destination |
| Property use cases and target partners | **MOVE TO REAL ESTATE** | `realestate.exwest.de` |
| Project inquiry form | **MOVE TO REAL ESTATE** | Separate real-estate conversion path |
| Exwest Modular handoff | **REDIRECT / retain direct link** | `https://exwestmodular.de` |

If historical backlinks contain query strings or paths not present in the source tree, resolve them from Search Console/server logs before cutover and add exact intent-matched rules to the owning deployment.

## 4. New corporate index set

| URL | Canonical | hreflang peers | Index status |
|---|---|---|---|
| `/de` | `https://exwest.de/de` | DE, EN `/en`, x-default `/de` | Index |
| `/en` | `https://exwest.de/en` | EN, DE `/de`, x-default `/de` | Index |
| `/de/impressum` | self | `/en/imprint`, x-default DE | Index |
| `/en/imprint` | self | `/de/impressum`, x-default DE | Index |
| `/de/datenschutz` | self | `/en/privacy`, x-default DE | Index |
| `/en/privacy` | self | `/de/datenschutz`, x-default DE | Index |
| `/` | none; temporary locale selection | destination supplies canonical | Do not include separately in sitemap |

The generated sitemap contains only these corporate URLs. It must never include `realestate.exwest.de` or `exwestmodular.de` destinations.

## 5. Topic separation

**Corporate (`exwest.de`)**: Exwest GmbH, Commercial Intelligence, Commercial Intelligence Infrastructure, CIE Solutions, Export Intelligence, Market Intelligence, Marketplace Intelligence, International Trade, sourcing/procurement, market entry, E-Commerce strategy and product commercialization.

**Real estate (`realestate.exwest.de`)**: project development, real-estate activities, property use cases, land/property conversion and related real-estate conversion intent. That site owns its own sitemap, robots, canonicals, metadata and structured data.

**Modular (`exwestmodular.de`)**: modular products and operating-business demand. The corporate site uses one controlled portfolio link and carries no product catalogue.

## 6. Redirect rules for cutover approval

1. Export Search Console pages/queries, indexed URLs, backlinks and server 404s before changing production.
2. Crawl current production and merge discoveries into this table.
3. Confirm apex versus `www` canonical host and enforce it once at the edge.
4. Launch the real-estate destination before any intent-bearing real-estate redirects.
5. Use one-to-one 301/308 redirects only when the destination is stable and topically equivalent.
6. Use 404/410 for genuinely obsolete placeholders; never mass-redirect them to `/de`.
7. Preserve query strings only where meaningful and test redirect chains for a single hop.
8. Validate `Location`, status, final canonical, hreflang, sitemap ownership and robots behavior in preview.
9. Monitor crawl errors and rankings after separately authorized cutover.

## 7. Production hold points

Open before deployment:

- Search Console/backlink and server-log evidence is not present in either frozen repository.
- The future real-estate repository/domain content is not part of this phase.
- Counsel must approve final legal copy and decide whether scoped AGB are required.
- Final Netlify site identity, apex/`www` behavior, deploy URL and domain redirects are intentionally unconfigured.

No production redirect, domain attachment, DNS change, sitemap submission or Search Console change was performed while creating this map.
