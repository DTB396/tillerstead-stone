<#
  dev-audit.ps1 — Lightweight accessibility & SEO heuristic checks (no Node required)

  Usage:
    powershell -ExecutionPolicy Bypass -File scripts/dev-audit.ps1

  Checks:
    - Missing alt attributes on <img>
    - Title length (50-60 ideal)
    - Meta description length (150-160 ideal)
    - Presence of canonical link
    - Counts headings (H1 should be 1 per page)
    - Flags inline styles using color without contrast utilities
#>

$ErrorActionPreference = 'SilentlyContinue'
Write-Host '=== Tillerstead Dev Audit (Heuristic) ===' -ForegroundColor Cyan

# Gather HTML files (root + pages + _includes optional top-level pages)
$files = Get-ChildItem -Path $PSScriptRoot/.. -Include *.html -Recurse | Where-Object { -not $_.FullName.Contains('_site') }

foreach ($f in $files) {
  $html = Get-Content $f.FullName -Raw
  $title = ($html -match '<title>([\s\S]*?)</title>') ? ($html | Select-String -Pattern '<title>([\s\S]*?)</title>' | ForEach-Object { $_.Matches[0].Groups[1].Value.Trim() }) : ''
  $metaDesc = ($html | Select-String -Pattern '<meta\s+name="description"\s+content="([^"]*)"') | ForEach-Object { $_.Matches[0].Groups[1].Value }
  $canonical = ($html | Select-String -Pattern '<link\s+rel="canonical"\s+href="([^"]+)"') | ForEach-Object { $_.Matches[0].Groups[1].Value }
  $imgs = [regex]::Matches($html, '<img[^>]*>')
  $missingAlt = @()
  foreach ($img in $imgs) {
    if ($img.Value -notmatch 'alt=') { $missingAlt += $img.Value }
  }
  $h1Count = ([regex]::Matches($html, '<h1[\s\S]*?>')).Count

  $inlineColorStyles = [regex]::Matches($html, 'style="[^"]*color:\s*#?[0-9a-fA-F]{3,6}').Count

  Write-Host "File: $($f.Name)" -ForegroundColor Yellow
  if ($title) { Write-Host "  Title length: $($title.Length)" } else { Write-Host '  Title: MISSING' }
  if ($metaDesc) { $descLen = $metaDesc[0].Length; Write-Host "  Meta description length: $descLen" } else { Write-Host '  Meta description: MISSING' }
  Write-Host "  Canonical present: $([bool]$canonical)"
  Write-Host "  H1 count: $h1Count"
  if ($missingAlt.Count -gt 0) { Write-Host "  Missing alt images: $($missingAlt.Count)" -ForegroundColor Red } else { Write-Host '  Missing alt images: 0' }
  if ($inlineColorStyles -gt 0) { Write-Host "  Inline color styles (check contrast): $inlineColorStyles" -ForegroundColor Magenta }
  Write-Host ''
}

Write-Host '=== Completed ===' -ForegroundColor Cyan
