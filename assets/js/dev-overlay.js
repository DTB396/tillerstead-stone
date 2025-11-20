/* dev-overlay.js — Developer Contrast & SEO Audit Panel
   Activates via URL param ?audit=1 or localStorage key 'ts:audit=1'.
   Features:
   - Lists elements adjusted by auto-contrast (data-contrast-fixed)
   - Displays original, background, new color, ratio
   - Provides copy-to-clipboard JSON export
   - Basic SEO summary: title length, meta description length, canonical present, og:image dimensions attributes
   - Non-invasive; attaches fixed panel bottom-right; hidden in production unless triggered.
*/
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const auditParam = params.get('audit');
  const lsFlag = localStorage.getItem('ts:audit');
  if (!(auditParam === '1' || lsFlag === '1')) return; // activation condition

  function collectContrast() {
    return [...document.querySelectorAll('[data-contrast-fixed]')].map(el => ({
      text: el.textContent.trim().slice(0, 80),
      original: el.getAttribute('data-contrast-original'),
      background: el.getAttribute('data-contrast-bg'),
      applied: el.style.color || '',
      ratio: el.getAttribute('data-contrast-ratio'),
      tag: el.tagName.toLowerCase()
    }));
  }

  function collectSEO() {
    const title = document.title.trim();
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    return {
      titleLength: title.length,
      title,
      descriptionLength: metaDesc.length,
      canonicalPresent: !!canonical,
      canonical,
      ogImage,
      description: metaDesc.slice(0, 200)
    };
  }

  function createPanel() {
    const panel = document.createElement('div');
    panel.className = 'ts-dev-overlay';
    panel.innerHTML = `
      <div class="ts-dev-overlay-head">
        <strong>Audit Panel</strong>
        <button type="button" data-close aria-label="Close audit panel">×</button>
      </div>
      <div class="ts-dev-section">
        <h4>Contrast Fixes <small data-contrast-count></small></h4>
        <div class="ts-dev-contrast-list" data-contrast-list></div>
        <button type="button" data-copy-contrast>Copy JSON</button>
      </div>
      <div class="ts-dev-section">
        <h4>SEO Summary</h4>
        <pre class="ts-dev-seo" data-seo></pre>
      </div>
      <div class="ts-dev-foot">
        <label><input type="checkbox" data-persist ${auditParam==='1'?'checked':''}/> Persist (localStorage)</label>
      </div>
    `;
    document.body.appendChild(panel);
    return panel;
  }

  function renderContrast(listEl) {
    const data = collectContrast();
    listEl.innerHTML = data.length ? data.map(d => `
      <div class="ts-dev-item">
        <code>${d.tag}</code> <span class="ts-dev-text">${d.text || '(empty)'}</span>
        <div class="ts-dev-meta">
          <span>orig: <b>${d.original}</b></span>
          <span>bg: <b>${d.background}</b></span>
          <span>new: <b>${d.applied}</b></span>
          <span>ratio: <b>${d.ratio}</b></span>
        </div>
      </div>`).join('') : '<em>No auto-contrast adjustments.</em>';
    panel.querySelector('[data-contrast-count]').textContent = `(${data.length})`;
    return data;
  }

  function renderSEO(preEl) {
    const seo = collectSEO();
    preEl.textContent = JSON.stringify(seo, null, 2);
    return seo;
  }

  const panel = createPanel();
  const contrastList = panel.querySelector('[data-contrast-list]');
  const seoPre = panel.querySelector('[data-seo]');
  const contrastData = renderContrast(contrastList);
  const seoData = renderSEO(seoPre);

  panel.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]')) {
      panel.remove();
    } else if (e.target.matches('[data-copy-contrast]')) {
      try {
        navigator.clipboard.writeText(JSON.stringify(contrastData, null, 2));
        e.target.textContent = 'Copied!';
        setTimeout(() => (e.target.textContent = 'Copy JSON'), 1800);
      } catch (_) { /* ignore */ }
    } else if (e.target.matches('[data-persist]')) {
      if (e.target.checked) {
        localStorage.setItem('ts:audit', '1');
      } else {
        localStorage.removeItem('ts:audit');
      }
    }
  });

  // Re-render contrast after a short delay (post theme / auto adjustments)
  setTimeout(() => renderContrast(contrastList), 600);
})();
