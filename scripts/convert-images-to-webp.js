#!/usr/bin/env node
/**
 * convert-images-to-webp.js
 *
 * Purpose: Scan assets/img for .jpg / .jpeg / .png images and create optimized .webp versions
 * without overwriting existing WebP files unless --force is passed.
 *
 * Usage:
 *   node scripts/convert-images-to-webp.js          # convert missing
 *   node scripts/convert-images-to-webp.js --force  # reconvert all
 *   node scripts/convert-images-to-webp.js --quality=80
 *   npm run images:webp
 *
 * Options:
 *   --force        Re-generate WebP even if file already exists
 *   --quality=Q    Set WebP quality (default 82)
 *   --dry-run      Show actions only, do not write files
 *   --dir=path     Override source directory (default assets/img)
 *
 * Notes:
 *   - Requires sharp (added as devDependency)
 *   - Skips SVG, already-WebP, favicon, and files starting with '.'
 *   - Writes alongside original: example.jpg -> example.webp
 */

const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('\n[ERROR] sharp not installed. Run: npm install --save-dev sharp\n');
  process.exit(1);
}

const argv = process.argv.slice(2);
const arg = (name, def) => {
  const found = argv.find(a => a.startsWith(`--${name}`));
  if (!found) return def;
  const parts = found.split('=');
  return parts.length > 1 ? parts[1] : true;
};

const FORCE = !!arg('force', false);
const QUALITY = parseInt(arg('quality', '82'), 10);
const DRY_RUN = !!arg('dry-run', false);
const SOURCE_DIR = path.resolve(arg('dir', 'assets/img'));

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`[ERROR] Source directory not found: ${SOURCE_DIR}`);
  process.exit(1);
}

function isConvertible(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;
  if (file.startsWith('.')) return false;
  if (/favicon|logo|sprite/i.test(file)) return true; // logos allowed
  return true;
}

function targetPath(file) {
  return file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'patterns') continue; // skip hidden & patterns (already optimized)
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk(SOURCE_DIR);
const candidates = allFiles.filter(f => isConvertible(path.basename(f)));

let converted = 0;
let skipped = 0;
let reconverted = 0;

(async () => {
  console.log(`\nImage WebP Conversion\n----------------------`);
  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Quality: ${QUALITY}`);
  console.log(`Force: ${FORCE ? 'yes' : 'no'}  Dry-run: ${DRY_RUN ? 'yes' : 'no'}`);
  console.log(`Found ${candidates.length} convertible images.\n`);

  for (const file of candidates) {
    const out = targetPath(file);
    const exists = fs.existsSync(out);

    if (exists && !FORCE) {
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`[DRY] Would convert: ${path.basename(file)} -> ${path.basename(out)}`);
      continue;
    }

    try {
      await sharp(file)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(out);
      if (exists && FORCE) {
        reconverted++;
        console.log(`[Reconvert] ${path.basename(file)} -> ${path.basename(out)}`);
      } else {
        converted++;
        console.log(`[Convert] ${path.basename(file)} -> ${path.basename(out)}`);
      }
    } catch (err) {
      console.error(`[ERROR] Failed converting ${file}:`, err.message);
    }
  }

  console.log('\nSummary');
  console.log('-------');
  console.log(`Converted:   ${converted}`);
  if (FORCE) console.log(`Reconverted: ${reconverted}`);
  console.log(`Skipped:     ${skipped}`);
  if (DRY_RUN) console.log('NOTE: Dry-run performed, no files written.');

  console.log('\nNext Steps');
  console.log('----------');
  console.log('1. Verify new .webp files load correctly in browser dev tools.');
  console.log('2. Commit changes: git add assets/img/*.webp');
  console.log('3. Ensure portfolio.yml has file_webp entries aligned with generated files.');
})();
