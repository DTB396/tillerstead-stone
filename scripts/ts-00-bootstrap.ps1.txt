# scripts/ts-00-bootstrap.ps1
[CmdletBinding()]
param(
  [string]$RepoRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$paths = @(
  "scripts",
  "docs",
  "docs\reports",
  ".github\workflows",
  "assets",
  "assets\css",
  "assets\js",
  "assets\img"
)

foreach ($p in $paths) {
  $full = Join-Path $RepoRoot $p
  if (-not (Test-Path $full)) { New-Item -ItemType Directory -Path $full | Out-Null }
}

# Basic .gitignore
$gitignore = Join-Path $RepoRoot ".gitignore"
if (-not (Test-Path $gitignore)) {
@"
_site/
.jekyll-cache/
.sass-cache/
.bundle/
vendor/
node_modules/
.DS_Store
Thumbs.db
"@ | Set-Content -Encoding UTF8 $gitignore
}

# Basic .gitattributes (reduces weird deploy diffs)
$gitattributes = Join-Path $RepoRoot ".gitattributes"
if (-not (Test-Path $gitattributes)) {
@"
* text=auto
*.ps1 text eol=crlf
*.sh  text eol=lf
*.yml text eol=lf
*.md  text eol=lf
*.html text eol=lf
*.css text eol=lf
*.scss text eol=lf
"@ | Set-Content -Encoding UTF8 $gitattributes
}

Write-Host "Bootstrap complete: folders + .gitignore + .gitattributes created/verified."
