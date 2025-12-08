# CSS Architecture Documentation

## Overview

The Tillerstead site now uses a streamlined dark-mode theme built on a single stylesheet and token file.
Everything inherits from shared design tokens to keep the header, hero, cards, and forms visually consistent.

## File Structure

```
assets/styles/
└── tokens.css          # Design tokens (colors, spacing, typography)

assets/css/
└── ts-theme.css        # Global theme (layout, components, sections, footer)
```

## Loading Order

1. **tokens.css** — Design tokens and CSS variables.
2. **ts-theme.css** — All layout, component, and section styling.
3. **Optional page styles** — Only when a page specifies extra CSS via front matter.

## How to Work With the Theme

- **Design tokens**: Update `_sass/base/_tokens.scss` to adjust colors, spacing, or typography. Every component pulls from these variables.
- **Components & layout**: Add or refine patterns inside `assets/css/ts-theme.css`. Keep specificity low and reuse the tokens.
- **Page-specific styles**: If you truly need a one-off pattern, add a CSS file and reference it from the page `styles:` front matter array.

## Best Practices

- Prefer custom properties over hard-coded values.
- Keep corners rounded (use `--radius-*` tokens) and rely on soft glows instead of heavy shadows.
- Maintain comfortable spacing using the `--space-*` scale and section padding tokens.
- Reuse the canonical hero, card, and button classes to keep every page aligned with the homepage aesthetic.
