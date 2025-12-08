# Tillerstead Theme Inventory (Dark Refresh)

## Summary
- Unified the site on a single dark-navy theme that mirrors the live homepage aesthetic.
- Consolidated styling into design tokens plus one primary stylesheet.
- Updated head and hero includes for consistent spacing and CTAs across pages.
- Removed legacy light-theme bundles and duplicate CSS files.

## Key Files
- `_sass/base/_tokens.scss` — Design tokens for colors, typography, spacing, radius, and glow effects.
- `assets/css/ts-theme.css` — Global layout, header/nav, hero, cards, sections, forms, and footer.
- `_includes/head.html` — Loads tokens + theme, cleans meta tags.
- `_includes/unified-hero-home.html` — Canonical homepage hero layout (logo block, badge, CTA row).
- `_includes/unified-hero.html` — Reusable page hero using the same spacing and typography system.

## Removed Legacy Assets
- Deprecated CSS bundles: `base.css`, `layout.css`, `components.css`, `home.css`, `cards.css`, `gallery.css`, `breadcrumbs.css`, `theme.css`, `theme-compiled.css`, `pattern-showcase.css`.
- Outdated duplicate token file: `_sass/base/_tokens.scss`.

## Notes
- Page-specific CSS can still be added via the `styles:` front matter array when needed.
- All shared components (cards, plans, services, contact form, footer) derive their colors and spacing from `tokens.css` to keep the modern dark look cohesive.
