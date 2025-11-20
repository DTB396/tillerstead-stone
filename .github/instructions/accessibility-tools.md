# Tillerstead Accessibility & Developer Tools Guide

## Overview
The Tillerstead site includes **three integrated accessibility and audit systems** designed to maintain WCAG 2.1 AA/AAA compliance, test contrast on the fly, and audit SEO without external dependencies.

---

## 1. Auto-Contrast System (`auto-contrast.js`)

### What It Does
Automatically scans your page content (headings, paragraphs, links, buttons) and ensures text has sufficient color contrast against its background. If contrast is insufficient, it attempts to:
1. Swap text to a **brand color** (heading white → primary emerald → accent gold) that passes the required contrast ratio.
2. If brand colors don't work, dynamically **lighten or darken** the original color toward black or white until it passes.

### How It Works
- **Runs once** on page load, automatically.
- **Targets**: All semantic text elements (`<h1>`–`<h6>`, `<p>`, `<li>`, `<a>`, `<button>`, `<span>`, `<small>`).
- **Skips**: Elements already using the `.c-contrast` class (handled by the mix system).
- **Required Ratio**:
  - Normal text: **4.5:1** (WCAG AA)
  - Large text (≥18.66px or ≥14px bold): **3.0:1** (WCAG AA)

### When It Auto-Corrects
**Example 1**: You have dark gray text (`#555555`) on a dark navy background (`#0a1628`). Contrast is only 2.8:1, failing WCAG AA.
- Auto-contrast detects this.
- Tries brand primary (#1ac87a) — contrast becomes 8.2:1 ✅ *passes*.
- Text color changes to emerald.

**Example 2**: Same gray text on a white background. Contrast is 6.5:1 (already passes). Auto-contrast leaves it alone.

### Manual Re-Run (After Dynamic Content)
If you inject new content via JavaScript, the auto-contrast won't catch it automatically. Trigger it manually:
```javascript
// After adding new paragraphs or cards to the DOM
window.autoContrast?.();
```

### What Gets Recorded
Each corrected element gets metadata attributes for auditing:
```html
<p data-contrast-fixed="true" 
   data-contrast-original="#555555" 
   data-contrast-bg="#0a1628" 
   data-contrast-ratio="8.20">
  This text was auto-corrected.
</p>
```

---

## 2. Mix-Based Contrast System (`contrast.js`)

### What It Does
A **deterministic, precise contrast system** for critical UI elements (badges, status labels, metric displays). Instead of changing the text color entirely, it uses CSS `color-mix()` to blend a chosen "pole" (black or white) with the original color until the contrast ratio is exactly met.

### How It Works
- Add the **`.c-contrast` class** to an element.
- The system computes:
  1. The effective background color (walks up the DOM tree).
  2. Whether **black** or **white** is the better "pole" for contrast.
  3. The **minimum percentage** of pole needed to hit the target ratio (default 7:1 AAA).
- Exposes CSS variables: `--mix-pole` (black or white) and `--mix-perc` (0–100%).

### Example: Status Badge
```html
<!-- Critical status badge -->
<span class="c-contrast badge" style="background: #ff6b35; color: color-mix(in srgb, var(--mix-pole) var(--mix-perc), transparent);">
  Active Issue
</span>
```
The system will auto-set `--mix-pole` to "white" and `--mix-perc` to "45%" so text blends 45% white into the original color, achieving high contrast against the orange background.

### When to Use
- **Use `.c-contrast`** for: Status chips, metric displays, important badges where exact color blending is important.
- **Use `auto-contrast`** for: Regular paragraph text, navigation items, interactive copy.

### Accessing Via JavaScript
```javascript
// Manually re-run after theme changes
window.applyContrast(7);  // 7 = AAA target; 4.5 = AA target
```

---

## 3. Global High Contrast Mode

### What It Does
A **site-wide accessibility mode** that maximizes legibility for users with low vision or sensitivity to visual clutter. Enables a forced black/white/yellow palette, removes all decorative shadows and gradients, and strengthens focus indicators.

### How to Enable
**Via UI Button**: Look for the **"Contrast"** button in the header (top right).

**Via Keyboard**: Press **`Alt + Shift + C`**.

**Via Developer**: 
```javascript
// Force enable in console
localStorage.setItem('ts:high-contrast', '1');
location.reload();
```

### What Changes
| Element | Normal | High Contrast |
|---------|--------|---|
| Background | Gradient dark navy | Solid black (#000) |
| Text | White/emerald/gold mix | White (#fff) |
| Links | Emerald with underline on hover | White with permanent underline; yellow on hover |
| Buttons | Gradient with shadow | White background, black text, 2px border |
| Focus ring | Subtle emerald glow | Bold 3px yellow outline, offset 3px |
| Shadows | 6–20px blur | None (removed) |
| Logo colors | Brand colors | White mark, yellow accent stripe |

### Persistence
High Contrast mode is **remembered**. If a user enables it, they'll see it on their next visit (stored in `localStorage` as `ts:high-contrast=1`).

---

## 4. Dev Audit Panel

### What It Does
A **browser-based audit dashboard** showing:
1. **All contrast adjustments** made by `auto-contrast.js` (original color, background, new color, achieved ratio).
2. **Basic SEO summary**: Title length, meta description length, canonical URL presence, OG image URL.
3. Ability to **export adjustments as JSON** for logging or further analysis.

### How to Activate
**Via URL Parameter**: Append `?audit=1` to any page URL.
```
https://tillerstead.com/?audit=1
```

**Via Keyboard**: Press **`Alt + Shift + A`** (reloads with audit enabled).

**Via localStorage**:
```javascript
localStorage.setItem('ts:audit', '1');
location.reload();
```

### What You See
A **fixed panel** appears bottom-right with three sections:

#### Contrast Fixes
Lists each element auto-adjusted, showing:
- **HTML tag** (e.g., `<p>`, `<h2>`, `<span>`).
- **Text preview** (first ~80 characters).
- **Original color** (e.g., `#555555`).
- **Background** (e.g., `#0a1628`).
- **Applied color** (e.g., `#1ac87a`).
- **Achieved ratio** (e.g., `8.20:1`).

#### SEO Summary
Quick reference:
- Title: `"Page Title | Tillerstead LLC"` (length: 42)
- Description: `"Tillerstead LLC provides..."` (length: 154)
- Canonical: Present ✓
- OG Image: `/assets/img/og.jpg`

#### Copy JSON
Click **"Copy JSON"** to export the contrast data to clipboard as JSON. Useful for:
- Documenting accessibility fixes.
- Auditing theme changes across multiple pages.
- Sharing findings in PRs or accessibility reports.

### Persistence
Check the **"Persist (localStorage)"** checkbox to keep the audit panel enabled across page reloads (without `?audit=1`).

---

## 5. Dev Audit Script (PowerShell, No Node Required)

### What It Does
A lightweight **static audit tool** that checks HTML files for common accessibility and SEO issues **without requiring Node.js**.

### When to Use
- Quick offline audit of the repo structure.
- Checking before commit for obvious issues.
- CI/CD integration if Node is unavailable.

### How to Run
```powershell
# Navigate to repo root, then:
powershell -ExecutionPolicy Bypass -File scripts/dev-audit.ps1
```

### Output Example
```
=== Tillerstead Dev Audit (Heuristic) ===
File: index.html
  Title length: 42
  Meta description length: 154
  Canonical present: True
  H1 count: 1
  Missing alt images: 0
  Inline color styles (check contrast): 2

File: pages/contact.html
  Title length: 38
  Meta description length: 120
  Canonical present: True
  H1 count: 1
  Missing alt images: 0
  Inline color styles (check contrast): 0
```

### What It Checks
1. **Title length**: 50–60 characters is ideal for SERPs.
2. **Meta description**: 150–160 characters ideal.
3. **Canonical link**: Present or missing.
4. **H1 count**: Should be 1 per page.
5. **Missing `alt` attributes**: All `<img>` tags should have alt text.
6. **Inline color styles**: Flags `style="color: #xxx"` for manual contrast review.

---

## Integration: Theme & Contrast Toggling

When you toggle **theme** (dark ↔ light) or **high contrast mode**, both `auto-contrast` and the mix system re-run to ensure colors remain sufficient across the new palette.

```javascript
// In main.js, theme toggle invokes:
if (typeof window.applyContrast === 'function') {
  window.applyContrast();  // Re-run mix system
}
if (typeof window.autoContrast === 'function') {
  window.autoContrast();   // Re-run brand auto-correction
}
```

---

## Quick Reference: Keyboard Shortcuts

| Shortcut | Action | Use Case |
|----------|--------|----------|
| **Alt + Shift + C** | Toggle High Contrast mode | Test the site for low-vision users |
| **Alt + Shift + A** | Toggle Audit Panel | Check what auto-contrast did; export JSON |

---

## Common Workflows

### Workflow 1: Testing Accessibility During Development
1. Open the page in browser.
2. Press **`Alt + Shift + C`** to enable high contrast.
3. Press **`Alt + Shift + A`** to open the audit panel.
4. Visually verify: all text is readable, focus rings are visible, no elements overlap.
5. Press **`Alt + Shift + A`** again to close panel and disable.

### Workflow 2: Auditing a New Feature
1. Build a new hero section or card.
2. Add classes: `.c-contrast` for status labels, rely on `auto-contrast` for body text.
3. Append `?audit=1` to the URL and reload.
4. Verify the audit panel shows zero "Missing alt images" and acceptable contrast ratios (≥4.5 for normal text).
5. Click **"Copy JSON"** and paste into a PR comment for documentation.

### Workflow 3: Before Commit (No Node)
```powershell
# Quick scan for obvious issues
pwsh -ExecutionPolicy Bypass -File scripts/dev-audit.ps1

# Fix any flagged issues:
# - Add missing alt attributes
# - Ensure title/description lengths are within SEO range
# - Check inline color style contrast manually or via browser audit panel
```

---

## FAQ

**Q: Does auto-contrast change the design?**
A: Minimally. It first tries brand colors (which are designed for the palette). Only if necessary does it shift the color. Most text should remain unchanged because well-designed text already has sufficient contrast.

**Q: Can I disable auto-contrast for an element?**
A: Yes, add the `data-contrast-skip` attribute:
```html
<p data-contrast-skip>This text won't be auto-corrected.</p>
```

**Q: Does high contrast mode hurt performance?**
A: No. It's a CSS class toggle (`html.high-contrast`) that applies forced styles. No JavaScript loops or heavy re-renders.

**Q: Can I export the audit data?**
A: Yes, click **"Copy JSON"** in the audit panel. The JSON includes element tag, text, original color, background, applied color, and achieved ratio.

**Q: Is the audit panel visible in production?**
A: No. It only appears if you explicitly activate it via `?audit=1` or `localStorage` setting. It's a developer tool.

---

## Next Steps

- **For end users**: Share the high contrast mode via a help link or tooltip.
- **For developers**: Reference this guide in PR templates to remind teammates about accessibility testing.
- **For CI/CD**: Integrate the PowerShell script or run `npm run lint` to catch structural issues before deploy.
