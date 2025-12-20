# Clean old build artifacts
rm -rf _site/
rm -f assets/css/main.css

# Rebuild CSS + Jekyll
npm run build

# Verify the fixes are in the output
grep -A5 "min-width.*921px" _site/assets/css/main.css
grep -A20 "ts-services" _site/index.html# Tillerstead Repository Refactoring Marathon Prompt

**Date**: December 20, 2025  
**Purpose**: Comprehensive repository refactoring using newly organized AI governance workflows  
**Authority**: All work governed by [`/.ai/`](/.ai/) instruction system

---

## 🎯 MISSION STATEMENT

Refactor the Tillerstead LLC repository to achieve:
1. **Code Quality**: 100% compliance with [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md)
2. **Brand Consistency**: All copy aligned with [`/.ai/STYLE.md`](/.ai/STYLE.md)
3. **Technical Accuracy**: All tile/construction content verified against [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md)
4. **Legal Compliance**: All contracts/claims checked against [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md)
5. **Build Health**: All scripts working, tests passing, linters green

---

## 📋 PRE-FLIGHT CHECKLIST

### Before Starting
- [ ] Read [`/.ai/SYSTEM.md`](/.ai/SYSTEM.md) — Master behavioral contract
- [ ] Read [`/.ai/COPILOT.md`](/.ai/COPILOT.md) or [`/.ai/CODEX.md`](/.ai/CODEX.md) — Your tool adapter
- [ ] Review [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) — Code quality standards
- [ ] Check current branch: `git status` (should be on `main` or feature branch)
- [ ] Pull latest: `git pull origin main`
- [ ] Verify dependencies: `npm ci && bundle install`

### Environment Setup
```bash
# Verify Node.js and Ruby installed
node --version  # Should be 14+
ruby --version  # Should be 2.7+

# Install dependencies
npm ci
bundle install

# Test build pipeline
npm run build:css
bundle exec jekyll build
npm run lint
```

---

## 🏃 MARATHON PHASES

### Phase 1: Build System Health (Scripts Audit)

**Goal**: Ensure all build scripts work correctly and follow standards

#### 1.1 Audit Build Scripts
```bash
# Test each build script
npm run build:css          # Should compile SCSS → CSS
npm run build              # Should run CSS + Jekyll build
npm run dev                # Should serve at localhost:4000
npm run lint               # Should pass all linters
npm run test               # Should check links
```

**Scripts to verify**:
- [ ] `scripts/build-css.js` — SCSS compilation
- [ ] `scripts/run-jekyll.sh` — Jekyll build wrapper
- [ ] `rebuild.sh` — Full clean rebuild
- [ ] `quick-build.sh` — Fast incremental build

**Check against**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §6 (Testing Requirements)

#### 1.2 Fix Build Script Issues
**Common problems**:
- Script permissions: `chmod +x scripts/*.sh`
- Path issues: Verify all paths relative to repo root
- Missing dependencies: Check `package.json` and `Gemfile`

**Output**: All build scripts should execute without errors

#### 1.3 Update Build Documentation
**Files to update**:
- [ ] `README.md` — Build instructions section
- [ ] `.github/instructions/build-troubleshooting.md` — Add any new findings

---

### Phase 2: Code Quality Compliance

**Goal**: Make all code 100% compliant with [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md)

#### 2.1 HTML Semantic Structure Audit
```bash
# Find all HTML files
find . -name "*.html" ! -path "./node_modules/*" ! -path "./_site/*"
```

**Check each file**:
- [ ] Uses semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- [ ] Has unique `<title>` tag (50-60 chars)
- [ ] Has meta description (150-160 chars)
- [ ] Has Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Has proper heading hierarchy (single `<h1>`, logical progression)
- [ ] Images have descriptive `alt` attributes
- [ ] Forms have explicit `<label>` associations
- [ ] Buttons have `aria-label` when icon-only

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §1 (HTML Standards)

#### 2.2 CSS Token Migration
```bash
# Audit all CSS/SCSS files
grep -r "color:" _sass/ assets/css/ | grep -v "var(--"
```

**Find and replace**:
- [ ] Hard-coded colors → `var(--color-*)`
- [ ] Hard-coded spacing → `var(--space-*)`
- [ ] Hard-coded fonts → `var(--font-*)`
- [ ] Hard-coded shadows → `var(--shadow-*)`
- [ ] Hard-coded border-radius → `var(--radius-*)`

**Script to help**:
```bash
# Find hard-coded hex colors
grep -rn "#[0-9a-fA-F]\{6\}" _sass/ assets/css/ --include="*.scss" --include="*.css"
```

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §2.2 (Design Tokens)

#### 2.3 JavaScript Modernization
```bash
# Find all JS files
find assets/js scripts/ -name "*.js" ! -path "./node_modules/*"
```

**Check each file**:
- [ ] Uses ES6+ syntax (`const`/`let`, arrow functions, template literals)
- [ ] Has error handling (try/catch for async, null checks)
- [ ] Uses modern DOM methods (`querySelector`, `addEventListener`)
- [ ] Has JSDoc comments for complex functions
- [ ] Passes ESLint: `npx eslint assets/js/ scripts/`

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §3 (JavaScript Standards)

#### 2.4 Accessibility Compliance
```bash
# Run accessibility linter
npx htmlhint '**/*.html' --config .htmlhintrc
```

**Manual checks**:
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Color contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- [ ] Screen reader landmarks present (`role` or semantic HTML)
- [ ] Forms have validation feedback
- [ ] Focus indicators visible

**Tools**:
- Chrome DevTools → Lighthouse → Accessibility audit
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §1.3 (Accessibility)

---

### Phase 3: Content Alignment (Voice & Authority)

**Goal**: Align all copy with [`/.ai/STYLE.md`](/.ai/STYLE.md) and verify technical accuracy against [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md)

#### 3.1 Homepage Hero Audit
**File**: `index.html`

**Check against [`/.ai/STYLE.md`](/.ai/STYLE.md) §2**:
- [ ] Bold, provocative headline (Law 6: Court Attention)
- [ ] Addresses pain point (Law 33: Thumbscrew)
- [ ] Technical specificity (power words: documented, tested, verified)
- [ ] Contrast pattern (proper method vs. shortcut)
- [ ] No generic claims ("quality service", "customer satisfaction")

**Example transformation**:
```markdown
❌ Before: "Quality Tile Installation Services"
✅ After: "Tile Work That Outlasts Your Mortgage (TCNA-Compliant, Photo-Documented)"
```

**Reference**: [`/.ai/STYLE.md`](/.ai/STYLE.md) §4 (Tone Variations - Homepage)

#### 3.2 Service Descriptions Rewrite
**Files**: `pages/services/*.html`

**Check each service page**:
- [ ] Technical specificity (TCNA standards, ANSI specs, material ratings)
- [ ] Contrast patterns ("C2-rated thinset, not 'whatever's at the truck'")
- [ ] Client pain points addressed
- [ ] HIC license number included (#13VH10808800)
- [ ] Realistic timelines/expectations

**Verify technical claims against [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md)**:
- [ ] TCNA standards cited correctly (ANSI A108, A118, A137)
- [ ] Material specifications accurate (ISO 13007 C1/C2/S1/S2)
- [ ] Waterproofing systems correct (KERDI, RedGard, Hydroban)
- [ ] Deflection limits accurate (L/360)

**Reference**: 
- [`/.ai/STYLE.md`](/.ai/STYLE.md) §4 (Tone - Service Descriptions)
- [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md) §2 (TCNA Standards)

#### 3.3 About/Process Pages Personality Injection
**Files**: `pages/about.html`, `pages/process.html`

**Add personality per [`/.ai/STYLE.md`](/.ai/STYLE.md) §3**:
- [ ] Self-aware humor ("Yes, we're annoying about substrate flatness")
- [ ] Direct address of client frustrations ("Texts returned same-day, not left on read")
- [ ] Technical competence shown casually (Law 30: Effortless Mastery)
- [ ] Values alignment (Built for long-term, not short-term profit)

**Reference**: [`/.ai/STYLE.md`](/.ai/STYLE.md) §4 (Tone - About Pages)

#### 3.4 Blog Post Technical Accuracy
**Files**: `_posts/*.md`

**Verify each blog post**:
- [ ] Technical claims match [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md)
- [ ] TCNA/ANSI standards cited correctly
- [ ] Material specs accurate (thinset ratings, tile classifications)
- [ ] Safety warnings included (OSHA silica dust, lead paint in pre-1978 homes)
- [ ] Disclaimers present if DIY content: "This is educational—consult a licensed pro"

**Reference**: 
- [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md) (entire file)
- [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) §9 (AI Content Rules)

---

### Phase 4: Legal Compliance Verification

**Goal**: Ensure all contracts, estimates, and claims comply with [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md)

#### 4.1 HIC License Display Audit
```bash
# Find all mentions of license number
grep -rn "13VH10808800" . --include="*.html" --include="*.md"
```

**Verify license appears**:
- [ ] Footer on all pages
- [ ] Contact/estimate forms
- [ ] About page
- [ ] Service pages
- [ ] Any contract templates

**Reference**: [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) §1.1 (License Information)

#### 4.2 Marketing Claims Review
```bash
# Find potentially problematic claims
grep -ri "guarantee\|fastest\|best\|lowest" . --include="*.html" --include="*.md"
```

**Check against prohibited claims** ([`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) §2.2):
- [ ] No "guaranteed" without specifics
- [ ] No "fastest installation" (unsubstantiated)
- [ ] No "lowest prices" (unless price-matching)
- [ ] No comparative claims without substantiation
- [ ] No "100% waterproof" (nothing is 100% guaranteed)

**Fix by adding caveats or removing claims**

#### 4.3 Disclaimer Audit
**Check these pages have disclaimers**:
- [ ] DIY content → "For educational purposes—consult licensed pro"
- [ ] Estimates → "Based on visual inspection, unforeseen conditions may affect cost"
- [ ] Blog technical content → "Not professional advice for your specific project"
- [ ] Pre-1978 homes → Lead paint warning

**Reference**: [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) §3.3 (Liability Disclaimers)

#### 4.4 Payment Terms Compliance
**If contract templates exist in repo**:
- [ ] Deposit limited to 10% OR $1,000 (whichever LESS)
- [ ] 3-day right of rescission notice (bold, 12pt minimum)
- [ ] Progress-based payment schedule
- [ ] Itemized cost breakdown
- [ ] Change order procedures

**Reference**: [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) §2.2 (Payment Restrictions)

---

### Phase 5: File Organization & Naming

**Goal**: Ensure all files follow [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) naming conventions

#### 5.1 File Naming Audit
```bash
# Find files that don't follow conventions
find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) ! -path "./node_modules/*" ! -path "./_site/*"
```

**Check**:
- [ ] HTML: `kebab-case.html` (e.g., `service-page.html`)
- [ ] CSS: `kebab-case.css` or `_partial-name.scss`
- [ ] JS: `camelCase.js` or `kebab-case.js`
- [ ] Images: `kebab-case.svg|png|jpg`

**Rename if needed**:
```bash
# Example: rename file
git mv old_name.html kebab-case-name.html
```

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §1 (File Naming)

#### 5.2 Directory Structure Verification
**Verify structure matches**:
```
/workspaces/Tillerstead-live/
├── .ai/                    # ✅ AI governance
├── _data/                  # ✅ Jekyll data
├── _includes/              # ✅ Jekyll partials
├── _layouts/               # ✅ Jekyll layouts
├── _posts/                 # ✅ Blog posts
├── _sass/                  # ✅ SCSS modules
│   ├── 00-settings/        # Tokens, variables
│   ├── 10-base/            # Reset, typography
│   ├── 20-layout/          # Grid, container
│   ├── 30-components/      # Header, footer, buttons
│   └── 40-utilities/       # Helper classes
├── assets/
│   ├── css/                # Compiled CSS
│   ├── img/                # Images
│   └── js/                 # JavaScript
├── pages/                  # Static pages
├── scripts/                # Build scripts
└── docs/                   # Documentation
```

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) + README.md

---

### Phase 6: Performance Optimization

**Goal**: Achieve Lighthouse scores per [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §5

#### 6.1 Lighthouse Audit
```bash
# Build production site
npm run build

# Serve locally
npm run serve

# Open Chrome DevTools → Lighthouse
# Run audits for Desktop AND Mobile
```

**Target scores**:
- [ ] Performance: ≥ 90 (desktop), ≥ 85 (mobile)
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 95

#### 6.2 Image Optimization
```bash
# Convert images to WebP
npm run images:webp

# Verify images have proper attributes
grep -rn "<img" _includes/ _layouts/ pages/ | grep -v 'loading="lazy"'
```

**Check**:
- [ ] Non-critical images have `loading="lazy"`
- [ ] Images have `srcset` for responsive sizing
- [ ] Images compressed (use ImageOptim or Squoosh)
- [ ] Hero images preloaded: `<link rel="preload" as="image" href="...">`

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §1.4 (Performance)

#### 6.3 CSS Optimization
- [ ] Critical CSS inlined in `<head>`
- [ ] Non-critical CSS loaded async
- [ ] CSS minified (check `scripts/build-css.js` uses `style: 'compressed'`)
- [ ] No unused CSS (audit with Chrome DevTools Coverage)

#### 6.4 JavaScript Optimization
- [ ] Non-critical scripts use `defer` or `async`
- [ ] No blocking scripts in `<head>`
- [ ] ES6 modules use `type="module"`
- [ ] Analytics/tracking scripts deferred

---

### Phase 7: Testing & Validation

**Goal**: All tests passing, all linters green

#### 7.1 Linter Marathon
```bash
# Run all linters
npm run lint

# Individual linters
npx htmlhint '**/*.html'
npx eslint .
npx stylelint "**/*.{css,scss}"
```

**Fix all errors** (prioritize errors over warnings)

#### 7.2 Jekyll Build Verification
```bash
# Clean build
rm -rf _site
npm run build

# Check for errors
echo $?  # Should be 0 (success)
```

**Common issues**:
- Liquid syntax errors
- YAML front matter parsing errors
- Missing includes/layouts
- Broken internal links

#### 7.3 Link Checking
```bash
# Run link checker
npm run test

# Or manually check
node scripts/check-links.js
```

**Fix**:
- [ ] No 404 errors (broken internal links)
- [ ] No broken external links
- [ ] All asset paths correct

#### 7.4 Browser Testing
**Manual checks in**:
- [ ] Chrome (primary)
- [ ] Safari (iOS and macOS)
- [ ] Firefox
- [ ] Mobile Safari (iPhone)
- [ ] Chrome Mobile (Android)

**Test**:
- [ ] Navigation works
- [ ] Mobile nav toggles correctly
- [ ] Forms validate
- [ ] Images load
- [ ] No console errors

---

### Phase 8: Git Hygiene & Commit

**Goal**: Clean commit history following [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §8 conventions

#### 8.1 Review Changes
```bash
# See all changes
git status
git diff

# Stage incrementally
git add _sass/
git diff --staged
```

#### 8.2 Atomic Commits
**Break work into logical commits** (not one massive commit):

```bash
# Example commit sequence
git add .ai/ .github/instructions/
git commit -m "docs(ai): implement centralized governance structure"

git add _sass/ assets/css/
git commit -m "refactor(css): migrate to design token system

- Replace hard-coded colors with var(--color-*)
- Replace hard-coded spacing with var(--space-*)
- Update all components to use tokens
- Maintain visual consistency"

git add _includes/ _layouts/
git commit -m "refactor(html): improve semantic structure and accessibility

- Replace divs with semantic HTML5 elements
- Add ARIA labels to icon buttons
- Add explicit label associations on forms
- Add alt text to all images"

git add pages/
git commit -m "feat(content): rewrite copy per STYLE.md voice guidelines

- Add technical specificity and contrast patterns
- Address client pain points directly
- Remove generic claims
- Add personality and self-aware humor"

git add scripts/
git commit -m "chore(scripts): fix build script permissions and paths

- Make all .sh scripts executable
- Fix relative path issues in build-css.js
- Update npm scripts in package.json"
```

**Commit message format** (Conventional Commits):
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Reference**: [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) §8 (Git Commit Standards)

#### 8.3 Pre-Push Checklist
```bash
# Final verification before push
npm run lint          # All linters pass
npm run build         # Build succeeds
npm run test          # Link check passes
git log --oneline -10 # Review commits
```

#### 8.4 Push to GitHub
```bash
git push origin main

# Or if working on feature branch
git push origin feature/refactor-marathon
```

**CI will run** (`.github/workflows/ci.yml`):
- npm install → lint → bundle install → Jekyll build
- All must pass

---

## 🎯 SUCCESS CRITERIA

### Phase Completion Checklist

- [ ] **Phase 1**: All build scripts working, no errors
- [ ] **Phase 2**: Code 100% compliant with OUTPUT_RULES.md
- [ ] **Phase 3**: Copy aligned with STYLE.md, technical accuracy verified
- [ ] **Phase 4**: Legal compliance verified (HIC license, disclaimers, no prohibited claims)
- [ ] **Phase 5**: All files follow naming conventions
- [ ] **Phase 6**: Lighthouse scores meet targets
- [ ] **Phase 7**: All tests passing, linters green
- [ ] **Phase 8**: Clean commit history, pushed to GitHub, CI passing

### Repository Health Metrics

**Before → After targets**:
- HTMLHint errors: X → 0
- ESLint errors: X → 0
- Stylelint errors: X → 0
- Lighthouse Performance: X → ≥90
- Lighthouse Accessibility: X → ≥95
- Broken links: X → 0
- Hard-coded colors: X → 0 (all use tokens)
- Generic copy: X → 0 (all use STYLE.md patterns)
- Unverified TCNA claims: X → 0 (all verified against DOMAIN.md)

---

## 📊 MONITORING & MAINTENANCE

### Ongoing Verification
```bash
# Weekly health check
npm run lint && npm run build && npm run test
```

### Quarterly Reviews
- [ ] Audit copy for "tone drift" (compare to STYLE.md)
- [ ] Verify TCNA standards still current (check for 2026 updates)
- [ ] Review Lighthouse scores
- [ ] Check for broken external links

### Annual Reviews
- [ ] Update [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md) with new TCNA standards
- [ ] Review and update [`/.ai/STYLE.md`](/.ai/STYLE.md) positioning strategy
- [ ] Audit [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) for NJ law changes

---

## 🚨 EMERGENCY ROLLBACK

If refactoring breaks something critical:

```bash
# See recent commits
git log --oneline -10

# Revert specific commit
git revert <commit-hash>

# Or rollback to known good state
git reset --hard <commit-hash>
git push origin main --force  # Use with caution!

# Rebuild
npm run build
```

---

## 📚 REFERENCE DOCUMENTS

**Essential reading**:
1. [`/.ai/README.md`](/.ai/README.md) — AI governance overview
2. [`/.ai/SYSTEM.md`](/.ai/SYSTEM.md) — Master authority
3. [`/.ai/OUTPUT_RULES.md`](/.ai/OUTPUT_RULES.md) — Code quality standards
4. [`/.ai/STYLE.md`](/.ai/STYLE.md) — Brand voice guidelines
5. [`/.ai/DOMAIN.md`](/.ai/DOMAIN.md) — Technical authority
6. [`/.ai/COMPLIANCE.md`](/.ai/COMPLIANCE.md) — Legal boundaries

**Supporting docs**:
- [`.AI_GOVERNANCE.md`](.AI_GOVERNANCE.md) — Quick reference
- [`README.md`](README.md) — Project overview
- [`.github/instructions/build-troubleshooting.md`](.github/instructions/build-troubleshooting.md) — Build issues
- [`docs/AI-GOVERNANCE-IMPLEMENTATION.md`](docs/AI-GOVERNANCE-IMPLEMENTATION.md) — Governance implementation details

---

## 💡 TIPS FOR AI AGENTS

### Working with This Prompt
1. **Don't do everything at once**: Complete one phase fully before moving to next
2. **Test incrementally**: Build and lint after each logical group of changes
3. **Commit atomically**: Separate commits for CSS, HTML, content, scripts
4. **Ask for clarification**: If a rule seems ambiguous, cite the section and ask
5. **Document decisions**: Add comments explaining non-obvious choices

### When Stuck
- **Read the relevant `.ai/` file** — answers are there
- **Check examples** in OUTPUT_RULES.md, STYLE.md (lots of before/after examples)
- **Search existing code** for patterns (`grep -r "pattern" _includes/`)
- **Test in isolation** — build one component at a time
- **Ask human for review** — flag uncertainty early

---

**Last Updated**: December 20, 2025  
**Estimated Duration**: 8-16 hours (depending on current state)  
**Complexity**: High (touches entire codebase)  
**Priority**: High (establishes foundation for all future work)
