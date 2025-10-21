# Different Breed Web

Astro-based marketing site for Different Breed Elite Fitness. This project uses TypeScript, CSS Modules, and Vercel serverless functions for dynamic integrations.

## Project Structure

```
/
├── public/                     # Static assets
├── src/
│   ├── components/             # Shared UI components
│   ├── layouts/                # Root layout importing global styles
│   ├── pages/                  # Astro routes (including /api/schedule)
│   ├── styles/
│   │   ├── tokens.module.css   # Design system tokens (colors, spacing, typography)
│   │   └── global.css          # Global resets & typography rules
│   └── types/                  # Shared TypeScript interfaces
├── tests/                      # Vitest suites & fixtures
├── docs/                       # Planning & architecture references
└── package.json
```

## Commands

| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `pnpm install`  | Install dependencies                         |
| `pnpm dev`      | Start local dev server at `localhost:4321`   |
| `pnpm build`    | Build a production bundle (Vercel serverless) |
| `pnpm preview`  | Run the production build locally             |
| `pnpm test`     | Execute Vitest unit/integration suites       |

## Design Tokens & Styles

- Design system values are codified in `src/styles/tokens.module.css`.
- Global typography, color, and spacing rules live in `src/styles/global.css` and are imported via the root layout.
- Components should consume tokens via CSS modules to maintain consistency.
- Reusable UI primitives:
  - `CTAButton.astro` — primary/secondary variants, size modifiers, optional loading state (`data-cta` required).
  - `Heading.astro` / `Text.astro` — typography helpers for H1–H4, body, and caption text.
  - `Hero.astro` — full-bleed hero with background image or looping video (`background.type`), adjustable overlay (`overlay="60" | "70"`), and primary/secondary CTA objects (each with `label`, `href`, `dataCta`).
  - `CTAbar.astro` — condensed CTA strip with copy block, primary CTA button, and optional secondary text link (still instrumented with `data-cta`).
- Preview examples available at `/preview` when running `pnpm dev`.

## Component Preview Workflow

- Start the dev server with `pnpm dev` and open `http://localhost:4321/preview` to review the latest component gallery.
- Showcase entries live in `src/pages/preview/index.astro`; add or adjust demo data within the page to surface new components.
- Keep preview-only layout/styles scoped to the `/preview` route so production navigation remains unaffected.
- UX review sessions are coordinated through the design team; capture approvals in the associated story notes.

## Deployment

- Configured for Vercel using the `@astrojs/vercel` adapter (serverless mode).
- Serverless proxies (e.g., `/api/schedule`) rely on environment variables defined in Vercel.

For additional context, see `docs/architecture/full-stack-architecture.md` and `docs/ops/credentials.md`.

## Environment Configuration

Set the following public variables for the `/contact` experience:

| Variable | Purpose |
| --- | --- |
| `FORMSPREE_CONTACT_ENDPOINT` | Server-side endpoint that receives contact form submissions (e.g., `https://formspree.io/f/xxxxxxx`). |
| `PUBLIC_GOOGLE_MAPS_EMBED_URL` | Google Maps embed URL for the Teaneck facility (dark theme preferred). |
| `PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL` | Directions link opened from the “Get Directions” CTA. If unset, a default Google Maps directions link is used. |

Define these locally in `.env` and within Vercel Project Settings → Environment Variables. The contact page disables submissions and shows configuration warnings until the values are present.

## Personal Training Components

- `src/pages/personal-training.astro` composes the landing page using new section components and shared content defined in `src/content/personalTraining.ts`.
- `InfoCards`, `InBodyCallout`, `StepsGrid`, `CoachGrid`, and `TestimonialStrip` live under `src/components/` with matching CSS modules.
- Coach highlight data is seeded from `docs/architecture/content-coaches.md`. Update `src/content/personalTraining.ts` when coach bios change.
- Testimonial entries are placeholders today (`testimonialsCopyTodo`) and should be replaced with marketing-approved copy + imagery before launch.
