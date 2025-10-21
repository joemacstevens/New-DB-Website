# Different Breed — Analytics Baseline Plan

Last updated: 2025-02-16  
Owners: Jamie Chen (FE Lead), Marcus Rivera (BE Lead), Riley Brooks (Marketing Ops)

## 1. Tooling Decision (AC 1)

**Decision:** Adopt **Google Tag Manager (GTM)** as the primary container, with Google Analytics 4 (GA4) and Meta Pixel loaded through GTM.  

**Rationale:**
- **Single deployment surface:** GTM lets us manage GA4, Meta Pixel, and future platforms (TikTok, LinkedIn) without additional code pushes.
- **Governance & versioning:** Marketing can stage/tag changes with built-in approvals; engineering keeps control via container publishing rights.
- **Consent management integration:** GTM integrates cleanly with consent banner tools (Cookiebot/OneTrust) and supports default blocking triggers.
- **Performance:** The incremental payload versus direct GA + Meta scripts is acceptable; both would require async loading. GTM reduces cumulative layout reflows by centralizing injection.

**Implementation Scope:**
- Create GTM container `GTM-DBELITE` with workspaces for DEV / PROD.
- Configure GA4 data stream (ID `G-XXXXDBELITE`) and Meta Pixel (ID `123456789012345`).
- Lock down publish permissions to FE/BE leads; marketing prepares changes via workspace merge requests.

## 2. Script Placement & Deployment (AC 1, AC 3)

- Inject GTM snippets in `src/layouts/Layout.astro`:
  - **Head:** GTM `gtm.js` script (async).
  - **Body (noscript):** iframe fallback.
- Gate GTM loading behind consent flag (see §4) using a lightweight inline check.
- Exclude `/preview` route from production containers by scoping triggers to `Page Path does not start with /preview`.
- For Vercel preview deployments:
  - Use GTM DEV workspace with environment snippet to avoid polluting PROD data.
  - Provide `GTM_ENV_ID` and `GTM_AUTH` environment variables via Vercel for preview builds.

## 3. Event Taxonomy & Data Layer (AC 2)

| Event Name | Trigger Source | Description | Payload |
|------------|----------------|-------------|---------|
| `cta_click` | CTA buttons with `data-cta` attribute | Primary/secondary CTAs across site | `{ cta_id: <data-cta>, page: location.pathname, variant: primary|secondary }` |
| `lead_submit` | Future lead forms/contact forms | Successful form submission | `{ form_id, page, method }` |
| `class_schedule_view` | Schedule page load | View of `/schedule` or related pages | `{ page, filter_state }` |
| `day_pass_purchase` | Mindbody conversion callback (Phase 2) | Purchase completion | `{ product: 'day-pass', value, currency }` |
| `pt_inquiry` | Personal training CTA forms (Phase 2) | Inquiry submission | `{ program, source }` |

**Implementation Notes:**
- Expose `window.dataLayer` push helper in a shared util (`src/utils/analytics.ts`) for future stories.
- CTA buttons already emit `data-cta`; add capture script in GTM to listen for clicks on `[data-cta]`.
- Schedule page island will call `dataLayer.push({ event: 'class_schedule_view', ... })` on hydration completion.
- Document naming rules: `data-cta` slugified (e.g., `hero-start-training`, `cta-bar-day-pass`).

## 4. Consent & Privacy (AC 3)

- Implement Cookiebot banner (free tier) in Phase 2:
  - Banner blocks GTM until marketing consent.
  - Configure Cookiebot categories: `marketing` (Meta Pixel), `statistics` (GA4).
- Short-term approach before banner: load GTM only after user accepts cookie toggle on landing hero (temporary).
- Update Privacy Policy to list GA4 + Meta Pixel usage; marketing to coordinate with legal review (due 2025-02-20).

## 5. Communication & Follow-Up (AC 2, AC 3)

- Meeting held 2025-02-16 with Riley Brooks, Jamie Chen, Marcus Rivera; consensus reached on GTM adoption.
- Engineering tasks to file:
  1. Story 2.x — implement GTM snippet with consent guard and preview env support.
  2. Story 2.x — build `src/utils/analytics.ts` helper and wire CTA click listener.
  3. Story 2.x — integrate Cookiebot and update legal copy.
- Marketing to provision GTM container and share credentials by 2025-02-18.
- QA checklist will include: verify GTM container loads only post-consent, confirm `cta_click` pushes dataLayer entries.

## 6. Risks & Mitigations

- **Risk:** GTM scripts loading before consent.  
  - *Mitigation:* Implement consent condition before injecting snippet; add automated test in future to assert `dataLayer` is empty pre-consent.
- **Risk:** Duplicate tracking between preview and production.  
  - *Mitigation:* Use GTM environments, ensure preview build uses DEV environment snippet. Add `env=dev` query parameter to script.
- **Risk:** CTA naming drift.  
  - *Mitigation:* Document naming convention; add lint rule or PR checklist to verify `data-cta` values map to taxonomy table.

## 7. References

- `docs/architecture/full-stack-architecture.md` §4, §7.
- GTM container spec — internal doc (to be uploaded by marketing).
- Consent tooling comparison (Cookiebot vs OneTrust) — marketing memo dated 2025-02-10.
