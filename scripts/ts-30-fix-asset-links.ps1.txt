# scripts/ts-30-fix-asset-links.ps1
[CmdletBinding()]
param(
  [string]$RepoRoot = (Get-Location).Path,
  [switch]$WhatIf
)

$ErrorActionPreference = "Stop"

$targets = Get-ChildItem $RepoRoot -Recurse -Include *.html,*.md,*.liquid -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch "\\_site\\" }

$repls = @(
  @{ pattern = 'href\s*=\s*"\/(assets\/[^"]+)"'; replace = 'href="{{ ''/$1'' | relative_url }}?v={{ site.assets_version }}"' },
  @{ pattern = 'src\s*=\s*"\/(assets\/[^"]+)"';  replace = 'src="{{ ''/$1'' | relative_url }}?v={{ site.assets_version }}"' }
)

$changed = 0
foreach ($f in $targets) {
  $raw = Get-Content -Raw $f.FullName
  $new = $raw
  foreach ($r in $repls) { $new = [regex]::Replace($new, $r.pattern, $r.replace) }

  if ($new -ne $raw) {
    $changed++
    if (-not $WhatIf) { Set-Content -Encoding UTF8 $f.FullName $new }
  }
}

Write-Host "Scanned $($targets.Count) files. Changed $changed files."
if ($WhatIf) { Write-Host "WhatIf: no writes performed." }
