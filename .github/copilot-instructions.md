# Tillerstead.com - Copilot Instructions

## Project Overview
This is a static website for **Tillerstead LLC**, a New Jersey-licensed home improvement business specializing in tile, bath, and remodeling services. The site is built with pure HTML, CSS, and JavaScript, optimized for GitHub Pages and Netlify.

## Domain Expertise & Voice
**CRITICAL**: Before creating or modifying any content related to tile, waterproofing, NJ compliance, or marketing copy, consult these expert instruction files:

- **Technical Authority**: `.github/instructions/tcna-nj-hic-trade-expert.md` - Complete TCNA standards, ANSI specs, modern materials, NJ HIC compliance, carpentry requirements, and trade terminology. Use this for all tile/construction technical content.

- **Copy Voice & Strategy**: `.github/instructions/copy-voice-persuasion-strategy.md` - Brand voice, persuasion principles (48 Laws), positioning strategy, and language patterns. Use this for all marketing copy, service descriptions, and client-facing content.

These files define Tillerstead's competitive positioning: TCNA-literate professional with personality and wit, positioned against corner-cutting competitors through technical specificity and authentic communication.

## Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Site Generator**: Jekyll (custom minimal implementation in `vendor/gems/jekyll`)
- **Package Manager**: npm for development dependencies
- **Deployment**: GitHub Pages / Netlify
- **CI/CD**: GitHub Actions

## Repository Structure
```
.
├── .github/
│   ├── instructions/       # Custom instructions for specialized tasks
│   └── workflows/          # GitHub Actions CI/CD
├── assets/
│   ├── css/                # Stylesheets and theme files
│   ├── img/                # Images and SVG patterns
│   └── js/                 # JavaScript files
├── _includes/              # Jekyll partials (e.g., unified-hero.html)
├── _layouts/               # Jekyll layouts
├── _posts/                 # Blog posts (if any)
├── pages/                  # Static pages
├── src/
│   └── styles/             # Source CSS with design tokens
├── vendor/gems/jekyll/     # Custom Jekyll implementation
├── index.html              # Homepage
└── package.json            # npm scripts and dependencies
```

## Building and Testing

### Local Development
```bash
# Serve the site locally (no build required)
python3 -m http.server
# Open http://localhost:8000
```

### Jekyll Build
```bash
# Install dependencies (local resolution, no external gem servers)
bundle install

# Build the site to ./_site
bundle exec jekyll build

# For debugging, use:
JEKYLL_TRACE=1 bundle exec jekyll build
```

### Linting
```bash
# Install npm dependencies first
npm ci

# Run all linters (ESLint + HTMLHint)
npm run lint

# Run individual linters
npx eslint .
npx htmlhint *.html
```

### CI Pipeline
- Runs automatically on all pull requests to `main`
- Steps: npm install → lint → bundle install → Jekyll build
- All checks must pass before merging

## Design System & Theme

### Design Tokens
All design tokens are centralized in `_sass/base/_tokens.scss`:
- **Colors**: `--color-primary`, `--color-accent`, `--color-surface`, etc.
- **Typography**: `--font-sans`, `--heading-1` through `--heading-6`
- **Spacing**: `--space-1` through `--space-12`
- **Shadows**: `--shadow-soft`, `--shadow-lift`
- **Border Radius**: `--radius-sm`, `--radius-pill`
- **Gradients**: `--gradient-primary`, `--gradient-surface`

### Making Theme Changes
1. Edit `_sass/base/_tokens.scss` to modify design tokens
2. Changes propagate throughout the site automatically via CSS custom properties
3. View all tokens and examples at `public/theme-demo.html`

### Utility Classes
The theme includes utility classes for rapid development:
- Typography: `.text-primary`, `.heading-2`
- Backgrounds: `.bg-gradient`, `.bg-surface-elevated`
- Spacing: `.mt-4`, `.mb-6`, `.p-5`
- Borders & Shadows: `.rounded-lg`, `.shadow-lift`

## Coding Standards

### HTML
- Use **semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Include proper meta tags for SEO (title, description, Open Graph)
- Use `loading="lazy"` for non-critical images
- Ensure all images have descriptive `alt` attributes for accessibility
- Use `srcset` for responsive images where appropriate

### CSS
- Follow the existing token-based design system
- Use CSS custom properties (CSS variables) from `tokens.css`
- Keep specificity low; prefer utility classes for common patterns
- Mobile-first responsive design with `min-width` media queries
- Support modern browsers (Chrome/Edge 49+, Firefox 31+, Safari 9.1+)

### JavaScript
- Use ES6+ syntax (const/let, arrow functions, template literals)
- Keep scripts minimal and focused
- Use `type="module"` or `defer` for script loading
- Follow ESLint standard config (defined in `.eslintrc.json`)

### Accessibility
- Maintain WCAG 2.1 AA compliance minimum
- Ensure sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Provide keyboard navigation support
- Use ARIA attributes appropriately
- Test with screen readers when making interactive components

## File Naming Conventions
- HTML files: `kebab-case.html` (e.g., `theme-demo-enhanced.html`)
- CSS files: `kebab-case.css` (e.g., `theme.css`)
- JavaScript files: `camelCase.js` or `kebab-case.js` (e.g., `agent.js`)
- Images: `kebab-case.svg|png|jpg` (e.g., `sacred-tile.svg`)

## Jekyll/Liquid Features

### Unified Hero Component
All pages use `{% include unified-hero.html %}`. Supported front-matter fields:
- `hero_eyebrow`: Small upper-text line
- `hero_title`: Main headline (defaults to `page.title`)
- `hero_summary`: Lead paragraph
- `hero_cred_line_1` / `hero_cred_line_2`: Optional credential lines
- `hero_primary_url` / `hero_primary_label`: Primary CTA button
- `hero_secondary_url` / `hero_secondary_label`: Secondary CTA button
- `hero_kpis`: Array of KPI cards (each needs `label` & `text`)
- `hero_bg_pattern`: Pattern slug (e.g., `sacred-tile`)
- `hide_hero: true`: Skip hero on a page

### Adding New Background Patterns
1. Add SVG/PNG to `assets/img/patterns/`
2. Add CSS class to `assets/css/_hero-patterns.css`
3. Reference in front-matter with `hero_bg_pattern: "pattern-name"`

## Common Tasks

### Adding a New Page
1. Create HTML file in root or `pages/` directory
2. Add Jekyll front-matter with title and layout
3. Use the unified hero component if needed
4. Follow semantic HTML structure
5. Lint the file: `npx htmlhint your-page.html`

### Updating Styles
1. Modify design tokens in `_sass/base/_tokens.scss` for global changes
2. For component-specific styles, edit relevant CSS in `assets/css/`
3. Test across different viewport sizes
4. Run linter to check for issues

### Fixing Lint Errors
```bash
# Check HTML
npx htmlhint '**/*.html'

# Check JavaScript
npx eslint .

# Auto-fix JavaScript issues
npx eslint . --fix
```

## Performance Guidelines
- **Target Metrics**:
  - Largest Contentful Paint (LCP): < 2.5s
  - Time to Interactive (TTI): < 3s
  - Cumulative Layout Shift (CLS): < 0.1
- Use `preload` for critical fonts and hero images
- Inline critical CSS for above-the-fold content
- Optimize images (use WebP where supported)
- Minimize HTTP requests

## SEO Best Practices
- Include unique `<title>` tags on every page (50-60 characters)
- Add meta description (150-160 characters)
- Use heading hierarchy properly (single `<h1>`, logical `<h2>`-`<h6>`)
- Implement Open Graph and Twitter Card meta tags
- Add JSON-LD structured data for LocalBusiness
- Maintain proper `robots.txt` and `sitemap.xml`
- Use canonical URLs to prevent duplicate content issues

## Important Notes
- **No External Dependencies**: The Jekyll implementation is vendored and offline-friendly
- **Minimal Changes**: Make surgical, targeted changes; avoid broad refactoring
- **Preserve Working Code**: Don't modify unrelated working code
- **Test Before Committing**: Always lint and build before pushing changes
- **Custom Jekyll**: Limited Liquid support - check `vendor/gems/jekyll/lib/jekyll/liquid_engine.rb` if using new tags/filters

## Resources
- Theme demo: `public/theme-demo.html`
- Design tokens: `_sass/base/_tokens.scss`
- CI workflow: `.github/workflows/ci.yml`
- README: Full documentation in `README.md`
