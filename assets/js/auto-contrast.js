/* auto-contrast.js — Tillerstead Brand Contrast Auto-Correction
   Scans common text elements and auto-corrects insufficient contrast
   using brand palette + dynamic light/dark adjustments.

   Strategy:
   1. Collect target elements (semantic text + interactive).
   2. Compute contrast ratio between foreground (color) and effective background.
   3. Determine required WCAG ratio (4.5 normal text, 3.0 large/bold text).
   4. If insufficient, attempt brand-preserving correction:
      - Prefer swapping to brand primary / accent if they achieve ratio.
      - Otherwise dynamically lighten/darken current color toward best pole (#000 or #fff)
        until ratio threshold met or max iterations reached.
   5. Apply corrected color via inline style and flag with data-contrast-fixed.
   6. Expose window.autoContrast() & integrate with existing window.applyContrast flow.

   Performance:
   - Runs once after DOMContentLoaded.
   - Can be re-run manually (e.g., after theme toggle) — lightweight (~O(n)).
   - Skips elements with background images/gradients for safety.

   Accessibility:
   - Adds data-contrast-original to preserve original color for future auditing.
   - Logs summary to console in dev environments.

   NOTE: Does not modify elements already marked .c-contrast (handled by contrast.js)
*/

(() => {
  'use strict';

  const BRAND = {
    primary: getCSSVar('--color-primary', '#1ac87a'),
    primaryStrong: getCSSVar('--color-primary-strong', '#0e8e52'),
    accent: getCSSVar('--color-accent', '#d8b25a'),
    surface: getCSSVar('--color-surface', '#0a1628'),
    surfaceElevated: getCSSVar('--color-surface-elevated', '#14263d'),
    heading: getCSSVar('--color-heading', '#ffffff'),
  };

  function getCSSVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // Relative luminance helper
  function luminance(hex) {
    const [r, g, b] = hexToRGB(hex).map(c => {
      const srgb = c / 255;
      return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function hexToRGB(hex) {
    let h = hex.replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const int = parseInt(h, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function rgbStringToHex(rgb) {
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return '#000000';
    return '#' + [m[1], m[2], m[3]].map(x => Number(x).toString(16).padStart(2, '0')).join('');
  }

  function contrastRatio(hex1, hex2) {
    const l1 = luminance(hex1);
    const l2 = luminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Attempts to lighten or darken toward pole (#000 or #fff) to reach target ratio
  function adjustTowardPole(fg, bg, target) {
    const fgLum = luminance(fg);
    const bgLum = luminance(bg);
    const pole = fgLum > bgLum ? '#000000' : '#ffffff'; // pick opposite direction for more contrast
    let working = fg;
    for (let i = 0; i < 16; i++) {
      if (contrastRatio(working, bg) >= target) break;
      working = mixHex(working, pole, 0.15); // 15% incremental shifts
    }
    return working;
  }

  // Mix two hex colors with given weight toward second color
  function mixHex(a, b, weight) {
    const [ar, ag, ab] = hexToRGB(a);
    const [br, bg, bb] = hexToRGB(b);
    const r = Math.round(ar + (br - ar) * weight);
    const g = Math.round(ag + (bg - ag) * weight);
    const bl = Math.round(ab + (bb - ab) * weight);
    return '#' + [r, g, bl].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  function isLargeText(el) {
    const style = getComputedStyle(el);
    const sizePx = parseFloat(style.fontSize);
    const weight = parseInt(style.fontWeight, 10) || 400;
    // Large text if >= 18.66px normal or >= 14px & bold (>=700)
    return sizePx >= 18.66 || (sizePx >= 14 && weight >= 700);
  }

  function hasGradient(style) {
    const bg = style.backgroundImage;
    return bg && bg !== 'none' && /gradient/i.test(bg);
  }

  function getEffectiveBackground(el) {
    let current = el;
    while (current && current !== document.documentElement) {
      const style = getComputedStyle(current);
      const bg = style.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        if (!hasGradient(style)) return rgbStringToHex(bg);
      }
      current = current.parentElement;
    }
    const rootBg = getComputedStyle(document.documentElement).backgroundColor;
    return rgbStringToHex(rootBg);
  }

  function autoContrast() {
    const targets = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,button,span,small');
    const changed = [];
    targets.forEach(el => {
      if (el.classList.contains('c-contrast') || el.hasAttribute('data-contrast-fixed')) return;
      const text = el.textContent?.trim();
      if (!text) return;
      const style = getComputedStyle(el);
      const fgHex = rgbStringToHex(style.color);
      const bgHex = getEffectiveBackground(el);
      const required = isLargeText(el) ? 3.0 : 4.5;
      const ratio = contrastRatio(fgHex, bgHex);
      if (ratio >= required) return; // already sufficient

      // Try brand primary, accent, heading in order that meets ratio
      const brandCandidates = [BRAND.heading, BRAND.primary, BRAND.accent, BRAND.primaryStrong];
      let replacement = null;
      for (const candidate of brandCandidates) {
        if (contrastRatio(candidate, bgHex) >= required) { replacement = candidate; break; }
      }
      if (!replacement) {
        replacement = adjustTowardPole(fgHex, bgHex, required);
      }

      if (contrastRatio(replacement, bgHex) < ratio) return; // safety: do not worsen contrast

      el.setAttribute('data-contrast-original', fgHex);
      el.setAttribute('data-contrast-bg', bgHex);
      el.style.color = replacement;
      el.setAttribute('data-contrast-fixed', 'true');
      el.setAttribute('data-contrast-ratio', contrastRatio(replacement, bgHex).toFixed(2));
      changed.push(el);
    });

    if (changed.length) {
      if (typeof console !== 'undefined') {
        console.log('[auto-contrast] Adjusted', changed.length, 'elements for accessibility');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoContrast);
  } else {
    autoContrast();
  }

  // Allow manual invocation (e.g., theme changes)
  window.autoContrast = autoContrast;
})();
