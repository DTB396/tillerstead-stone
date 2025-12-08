# Quality Standards & Best Practices

## 🎯 Quality Goals for Tillerstead Site
When working on this repository, prioritize:
- **HTML Modernization**: Use latest semantic HTML5 standards for better SEO and accessibility
- **SEO Excellence**: Ensure all pages have proper meta tags, Open Graph data, and structured data
- **Brand Consistency**: Maintain cohesive design using the token-based theme system
- **Performance**: Keep the site fast and lightweight (LCP < 2.5s, CLS < 0.1)
- **Accessibility**: Ensure WCAG 2.1 AA compliance minimum

## 🌐 SEO & Performance Checklist
When adding or modifying HTML pages, ensure:

### HTML5 Best Practices
- Use semantic structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Include proper heading hierarchy (single `<h1>`, logical progression)
- Add `loading="lazy"` for non-critical images with `srcset` for responsive images
- Use `async` or `defer` for JavaScript loading
- Include `rel="preload"` for critical fonts and hero images

### Required Meta Tags
Every page must have:
- Unique `<title>` tag (50-60 characters)
- Meta description (150-160 characters)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Canonical URL
- Viewport meta tag

### Structured Data
Include JSON-LD structured data where appropriate:
- Organization schema for company pages
- LocalBusiness schema for location/service pages
- BreadcrumbList for navigation
- Service schema for service descriptions

### Performance Targets
- Largest Contentful Paint (LCP): < 2.5 seconds
- Time to Interactive (TTI): < 3 seconds
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.8 seconds

## 🎨 Brand & Design Standards

### Design Token Usage
Always use CSS custom properties from `_sass/base/_tokens.scss`:
- Colors: `var(--color-primary)`, `var(--color-accent)`, etc.
- Typography: `var(--font-sans)`, `var(--heading-1)`, etc.
- Spacing: `var(--space-1)` through `var(--space-12)`
- Shadows: `var(--shadow-soft)`, `var(--shadow-lift)`
- Borders: `var(--radius-sm)`, `var(--radius-pill)`

### CSS Best Practices
- Never use hardcoded colors; always reference design tokens
- Keep component styles modular and reusable
- Use utility classes for common patterns
- Maintain mobile-first responsive design
- Ensure sufficient color contrast (4.5:1 for text, 3:1 for UI)

## 🔧 Quality Control Process

### Pre-Commit Checklist
Before creating a PR:
```bash
# Install dependencies
npm install

# Run linters
npm run lint

# Build Jekyll site (if Ruby/Bundler available)
bundle install
bundle exec jekyll build
```

### Code Review Focus Areas
When reviewing code, check for:
1. **Semantic HTML**: Proper use of HTML5 elements
2. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
3. **SEO**: Meta tags, structured data, heading hierarchy
4. **Performance**: Image optimization, lazy loading, minimal JS
5. **Design Consistency**: Use of design tokens, brand colors
6. **Code Quality**: Clean, readable, maintainable code
7. **Security**: No hardcoded credentials, XSS protection

## 📊 Quality Metrics

### Automated Checks (CI)
- ESLint: JavaScript code quality and standards
- HTMLHint: HTML structure and syntax validation
- Jekyll Build: Site generation without errors

### Manual Review Areas
- Visual design consistency across pages
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness (320px to 1920px viewports)
- Accessibility with keyboard-only navigation
- Load time and performance on slow connections

## 🛠️ Useful Tools & Scripts

### SEO Audit Script
Create `scripts/seo-audit.js` to check SEO requirements:
```javascript
const glob = require('glob');
const fs = require('fs');

const files = glob.sync('**/*.html', { 
  ignore: ['node_modules/**', '_site/**', 'vendor/**'] 
});

let report = '# SEO Audit Report\n\n';
let issues = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasTitle = /<title[^>]*>.*<\/title>/i.test(content);
  const hasMetaDesc = /<meta\s+name=["']description["']/i.test(content);
  const hasOG = /<meta\s+property=["']og:/i.test(content);
  const hasViewport = /<meta\s+name=["']viewport["']/i.test(content);
  
  report += `## ${f}\n`;
  report += `- Title tag: ${hasTitle ? '✅' : '❌'}\n`;
  report += `- Meta description: ${hasMetaDesc ? '✅' : '❌'}\n`;
  report += `- Open Graph tags: ${hasOG ? '✅' : '❌'}\n`;
  report += `- Viewport meta: ${hasViewport ? '✅' : '❌'}\n\n`;
  
  if (!hasTitle || !hasMetaDesc || !hasOG || !hasViewport) issues++;
});

report += `\n---\n**Summary**: ${issues} pages need attention\n`;
fs.writeFileSync('seo-audit.md', report);
console.log(`✅ SEO audit complete: ${files.length} pages checked, ${issues} need attention`);
```

Run with: `node scripts/seo-audit.js`

### Contrast Checker
For checking color contrast ratios:
- Online tool: https://webaim.org/resources/contrastchecker/
- Check all text against backgrounds using design tokens
- Ensure 4.5:1 ratio for normal text, 3:1 for large text (18px+ or 14px+ bold)

## 📝 Documentation Standards

### Code Comments
- Add comments for complex logic or non-obvious implementations
- Document any workarounds or browser-specific fixes
- Keep comments up-to-date with code changes

### File Headers
For significant CSS or JS files, include a header:
```css
/**
 * Component Name - Brief Description
 * 
 * Purpose: Explain what this file does
 * Dependencies: List any dependencies
 * Notes: Any important considerations
 */
```

### Commit Messages
Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semi-colons, etc.
- `refactor:` Code restructuring without changing behavior
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add contact form to homepage with validation`

## 🚀 Continuous Improvement

### Regular Maintenance Tasks
- Update dependencies quarterly (check for security updates)
- Review and update SEO meta tags as content changes
- Audit accessibility with screen readers
- Check performance metrics with Lighthouse
- Validate HTML with W3C validator
- Test on real devices (not just browser DevTools)

### Learning & Evolution
- Stay current with web standards and best practices
- Test new CSS features with progressive enhancement
- Monitor Core Web Vitals in production
- Gather user feedback on accessibility and usability
