# `ts-` include & SCSS inventory

This note captures how the `ts-` includes currently tie into `_sass` components/base utilities so we understand the existing spacing, contrast, and layout rules before modernizing the desktop/mobile experience.

## Hero / primary banner
- **Include:** `_includes/ts-hero.html` (lines 1‑40) wraps a `<section class="hero hero--with-pattern">` with `.hero-title`, `.hero-lead`, `.hero-actions`, `.hero-visual`, `.hero-kpis`, etc.
- **SCSS:** `_sass/components/_hero.scss` defines the entire `.hero` system: section-level `--section-padding-y` spacing, `.hero-inner` grid, `.hero-surface` gradient + pattern overlays, `.hero-main` column gap, responsive adjustments (grid collapse at 960px, button stacking at 640px). Typography uses `_sass/base/_typography.scss`/ `_sass/base/_tokens.scss` tokens for var(--ts-color-heading), var(--ts-spacing-*), and base fonts, so contrast is driven by those variables.
- **Spacing/contrast note:** `clamp()` is used for hero padding, heading size, and button spacing; `.hero-actions` flex-wrap keeps CTA chips aligned; `.hero-kpi` cards use border/gradient for emphasis.

## Services grid
- **Include:** `_includes/ts-services.html` composes a `.ts-services.ts-section` wrapper, a header, a `.ts-services__grid` list of `ts-service-card`, and optional gallery/photos (two figure variants).
- **SCSS:** `_sass/theme/_tillerstead.scss` has the `.ts-services` block (lines 137‑270) controlling gradient background, padded container, center-aligned header, grid columns (auto-fit minmax 260px), gallery grid (repeat minmax(240px,1fr)), and `.ts-services__photo` shapes. Card styles for `.ts-service-card` live in the same file (lines 263‑370), leveraging `.card--service` helpers from `_sass/components/_cards.scss` for hover, shadows, and spacing. Buttons inside `.ts-services__actions` rely on `_sass/components/_buttons.scss` (rounded .btn--primary / btn--ghost contrast) and base tokens for spacing.
- **Spacing/contrast note:** `var(--ts-gradient-section)` + multi-layer overlays create depth while `.card` padding uses `clamp()` to adapt across viewports; `grid-template-columns` and `.ts-services__gallery` ensure responsive stacking.

## Service cards (supporting include)
- **Include:** `_includes/ts-service-card.html` generates `.ts-service-card` articles with an icon, `<h3>`, description, optional list of points, and `Learn more` link.
- **SCSS:** `.ts-service-card` is styled next to `.card--service` in `_sass/theme/_tillerstead.scss` (lines 263‑370). General card behavior (spacing, hover, stacked layout) is defined in `_sass/components/_cards.scss` (global `.card`, `.card-title`, `.card-point`, etc.). Icons use `_includes/ts-service-icon.html` plus `_sass/components/_cards.scss` for color, while typography pulls from `_sass/base/_typography.scss`.
- **Spacing/contrast note:** Cards stack with `display:flex` and `gap:var(--ts-spacing-md)`; CTA link uses `.ts-service-card__link` with `color: var(--ts-color-primary)` and underline/outline transitions for better contrast.

## Contact / CTA form
- **Include:** `_includes/ts-contact.html` renders `.ts-contact` section with `.container.ts-contact__grid`, `.ts-contact__copy`, `.ts-contact__form` fieldset, and `ts-contact__panel` details alongside a call-to-action button.
- **SCSS:** Layout depends on `_sass/layout/_container.scss` for `.container` spacing and `_sass/components/_forms.scss` for form controls (`input`, `textarea`, `select`, focus rings, spacing). Buttons come from `_sass/components/_buttons.scss`. Panel/dl list inherits base typography and spacing defined in `_sass/base/_typography.scss` and `_sass/base/_tokens.scss`.
- **Spacing/contrast note:** The grid isn't explicitly defined in SCSS, so the two-column layout is inherited via `.ts-contact__grid` (likely defined via `.container` flex?). Inputs use `border: 1px solid var(--ts-color-border)` and focus states `var(--ts-color-primary)` for accessibility.

## Breadcrumbs / microcopy
- **Include:** `_includes/ts-breadcrumbs.html` (multiple nav variants) injects `.breadcrumbs-bar`, `.breadcrumbs`, `.ts-breadcrumbs`, `.ts-crumb-link`, `.ts-breadcrumbs__current`, and JSON-LD markup conditionally.
- **SCSS:** `_sass/components/_breadcrumbs.scss` governs the sticky bar (background, border, shadow, responsive padding) and link styles (hover, focus, color transitions). Colors rely on `_sass/base/_tokens.scss` (primary/accent, text-muted). Print rules hide the breadcrumbs.
- **Spacing/contrast note:** Links gain pill-shaped padding plus `var(--color-primary-soft)` background on focus; separators use masked SVG arrows with contrast-coded strokes.

## Supporting includes
- **`ts-deliver.html`** (relates to `_sass/components/_deliver.scss`), `ts-process.html` (no dedicated SCSS but uses `.ts-process` tokens defined in `_sass/components/_plans.scss`), `ts-plans.html`, `ts-reviews.html`, `ts-testimonials.html`, etc., all rely on shared `_sass/components/_cards.scss`, `_sass/components/_buttons.scss`, and `_sass/base/_tokens.scss` for spacing/contrast. Their wrappers often use `.ts-section` from `_sass/layout/_container.scss` to enforce consistent vertical rhythm.

## Base utilities
- `_sass/base/_tokens.scss` defines all tokens (`--ts-spacing-`, `--ts-color-`, gradients, shadows) used across includes.  
- `_sass/base/_typography.scss` ensures heading/paragraph defaults that each include inherits; `.lead`, `.heading-2`, `.eyebrow`, `.text-muted` classes are referenced in the includes.  
- `_sass/layout/_container.scss` supplies `.ts-section`, `.container`, `.ts-section-inner`, spacing that ensures each include sits within a scoped grid/padding system.

## Fresh layout vision
- **Hero:** consolidate the hero copy blocks so a single set of Liquid defaults drives `hero_title`/`hero_summary`; styles should keep `.hero-inner` as a two-column grid with `minmax(280px, 1fr)` columns, CTA buttons grouped via a `.hero-cta-group` that stays inline above ~720px, and the `hero-note` block moved closer to the CTAs to reinforce the NJ HIC trust signal.
- **Service tiles:** keep `.ts-services` inside a `ts-section` and ensure `.ts-services__grid` uses `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` (already defined) but add consistent `gap: var(--ts-spacing-lg)` and wrap each card yield inside `<article class="ts-service-card">` with `<header>`, `<ul>`, `<footer>` semantics for readability.
- **Portfolio highlights:** wrap highlight cards with an `aria-labelledby` heading inside a `.ts-section`, align figure captions with `text-muted` styles, and keep the CTA buttons that live inside `ts-section` consistent with the hero actions (same button spacing, pill radius).
- **CTA/contact:** redesign `.ts-contact__grid` into a CSS grid (2 columns desktop -> 1 column mobile, `gap: var(--ts-spacing-lg)`), move the `.ts-contact__panel` next to the form before the button so the licensing info remains visible, and use `aria-live` copy (e.g., “Response in 24‑48 hrs, emergency available”) near the submit action.
- **Testimonials/reviews:** reuse the `.ts-section` + `.card` system so quotes, facts, and ratings align with the service cards, maintain consistent spacing, and keep the NJ licensing note visible either as a hero-note or as inline highlight in testimonials.

## Implementation roadmap
1. **Markup updates:**  
   - `_includes/ts-hero.html`: remove duplicate Liquid data assignments, wrap CTA buttons in a dedicated helper (`<div class="hero-actions hero-cta-group">`), and output the hero visual inside a `<picture>` with WebP for both desktop and mobile to harmonize loading.  
   - `_includes/ts-services.html` + `_includes/ts-service-card.html`: add explicit `<header>`/`<footer>` sections, ensure the gallery `figure` markup always pairs image and caption, and add `aria-label` to the gallery container for clarity.  
   - `_includes/ts-contact.html`: wrap the form fields in `<div class="ts-contact__fields grid">` with `grid-template-columns`, move the aside above/below the button on mobile, and add inline messaging to highlight the NJ HIC license near the submit button.  
   - `_includes/ts-breadcrumbs.html`: simplify redundant markup (only render one breadcrumb trail), keep the JSON-LD output aligned with the desktop/mobile nav, and ensure the `ts-crumb-link` class is reused so focus styles stay consistent.
2. **SCSS refactors:**  
   - `_sass/components/_hero.scss`: reinforce the two-column layout with explicit `grid-template-columns`, add a `.hero-cta-group` that respects `gap: var(--ts-spacing-md)` and `flex-wrap: wrap`, and raise `box-shadow` contrast for `.hero-surface` to keep readability high on high-contrast backgrounds.  
   - `_sass/theme/_tillerstead.scss`: tidy `.ts-services` so the gradient/padding references `--section-padding-y`, break `.ts-services__gallery` into a reusable mixin (so other sections can share photo grids), and ensure `.ts-service-card` link hover/focus colors meet WCAG AA.  
   - `_sass/components/_forms.scss`: introduce `.ts-contact__grid` helpers (grid gap, column definitions), align `.ts-contact__field` spacing with `var(--ts-spacing-md)`, and add `.ts-contact__panel` background/border using `var(--ts-color-surface-elevated)` plus `var(--ts-shadow-soft)` to boost contrast.  
   - `_sass/components/_buttons.scss` + `_sass/base/_tokens.scss`: verify primary/ghost buttons use `var(--ts-color-primary)` and `var(--ts-color-primary-strong)` for text/hover states to keep journeys conversion focused; ensure CTA text size uses `font-weight: 600` and `letter-spacing: 0.02em`.
3. **Verification:**  
   - Run `npm run dev` and inspect hero, services, portfolio, and contact sections across 320px–1200px widths to confirm grids collapse correctly, maintain consistent spacing, and keep CTA buttons visible without crowding.  
   - Use Chrome DevTools color contrast analyzer to verify buttons/backgrounds as well as `ts-service-card__link`, `ts-crumb-link`, and form labels meet WCAG AA (≥4.5:1).  
   - Validate hero/contact copy readability by checking `font-size` and `line-height` (should respect `base/_typography.scss` tokens) and confirm the NJ HIC license text remains in the hero-note and form messaging for trust.
