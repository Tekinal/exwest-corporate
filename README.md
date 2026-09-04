# Exwest Corporate

Corporate website for Exwest GmbH at `exwest.de`, led by CIE Solutions and supported by International Trade and E-Commerce commercialization.

## Repository boundaries

- This repository owns only the corporate frontend.
- `../exwest-static-reference` is a read-only legacy visual reference.
- `../exwest-configurator` is read-only operational evidence; no runtime code is imported.
- Real-estate content belongs at `realestate.exwest.de`.
- Exwest Modular remains at `exwestmodular.de`.

## Local development

Requirements: Node 20 and npm 11.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root chooses DE, EN or TR from the persisted user preference, then `Accept-Language`, with German as final default. All three languages remain manually selectable.

## Validation

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run start -- --hostname 127.0.0.1 --port 3014
# In a second terminal:
npm run qa:site
```

Set `QA_BASE_URL` to test another authorized preview origin. The HTTP QA suite is read-only.

## Deployment posture

`netlify.toml` prepares a Next.js build and Netlify preview. Deploy-preview and branch-deploy contexts are non-indexable through generated metadata and `robots.txt`. Attaching `exwest.de`, changing DNS, adding production environment variables, or cutting over traffic requires separate approval.

The V1 contact path uses `mailto:` and stores no form submission. Do not connect it to CRM, CIE runtime, Supabase, or another data processor without a separately approved technical and legal contract.

## Documentation

- `docs/migration/EXWEST_LEGACY_DESIGN_AND_ARCHITECTURE_AUDIT_V1.md`
- `docs/migration/EXWEST_URL_AND_SEO_MIGRATION_MAP_V1.md`
- `docs/architecture/EXWEST_CORPORATE_WEB_ARCHITECTURE_V1.md`
- `docs/seo/EXWEST_SEARCH_AND_AI_DISCOVERY_POST_LAUNCH_V1.md`
- `docs/qa/EXWEST_AMENDMENT_QA_V1.md`
