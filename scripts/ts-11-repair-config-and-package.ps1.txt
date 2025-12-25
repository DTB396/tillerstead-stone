# scripts/ts-11-repair-config-and-package.ps1
[CmdletBinding()]
param(
  [string]$RepoRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$configPath = Join-Path $RepoRoot "_config.yml"
if (-not (Test-Path $configPath)) { throw "Missing _config.yml at repo root." }

$raw = Get-Content -Raw -Path $configPath

# Backups
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = Join-Path $RepoRoot "docs\reports"
if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }

$cfgBackup = Join-Path $backupDir "_config.yml.backup-$stamp"
Copy-Item $configPath $cfgBackup -Force

# 1) Extract the embedded JSON object (package.json content) if present
# Heuristic: find first line that looks like '{' after the corrupted 'baseurl: "" {' area
$pkgJson = $null
$pkgStart = $raw.IndexOf("`n{")
if ($pkgStart -lt 0) { $pkgStart = $raw.IndexOf("{") }

if ($pkgStart -ge 0) {
  $candidate = $raw.Substring($pkgStart).Trim()

  # Quick sanity check: contains "scripts" and "devDependencies"
  if ($candidate -match '"scripts"\s*:\s*\{' -and $candidate -match '"devDependencies"\s*:\s*\{') {
    $pkgJson = $candidate
  }
}

if ($pkgJson) {
  $packagePath = Join-Path $RepoRoot "package.json"

  # Backup existing package.json if it exists
  if (Test-Path $packagePath) {
    $pkgBackup = Join-Path $backupDir "package.json.backup-$stamp"
    Copy-Item $packagePath $pkgBackup -Force
  }

  # Write extracted package.json
  # Keep formatting as-is; you can prettify later with Prettier.
  Set-Content -Encoding UTF8 -Path $packagePath -Value $pkgJson
  Write-Host "Extracted embedded package.json -> $packagePath"
} else {
  Write-Host "No embedded package.json blob detected inside _config.yml (or it didn't match expected structure)."
}

# 2) Clean _config.yml: keep only the YAML before the corruption
# Strategy:
# - remove everything starting at the first duplicate url/baseurl block that appears *after* the valid YAML section
# - OR, if package.json was extracted, truncate _config.yml at pkgStart
$clean = $raw

if ($pkgJson -and $pkgStart -ge 0) {
  $clean = $raw.Substring(0, $pkgStart).TrimEnd() + "`n"
}

# Remove duplicate url/baseurl occurrences after the first valid ones
# We'll rebuild a canonical config by:
# - Taking the cleaned YAML (now no JSON)
# - Removing repeated url/baseurl lines beyond the first occurrence
$lines = $clean -split "`r?`n"

$seenUrl = $false
$seenBaseurl = $false
$out = New-Object System.Collections.Generic.List[string]

foreach ($line in $lines) {
  $trim = $line.Trim()

  if ($trim -match '^(url)\s*:\s*') {
    if ($seenUrl) { continue }
    $seenUrl = $true
    $out.Add("url: https://tillerstead.com")
    continue
  }

  if ($trim -match '^(baseurl)\s*:\s*') {
    if ($seenBaseurl) { continue }
    $seenBaseurl = $true
    $out.Add('baseurl: ""                 # keep empty for apex/root')
    continue
  }

  $out.Add($line)
}

# Ensure url/baseurl exist at least once (defensive)
if (-not $seenUrl) { $out.Insert(0, "url: https://tillerstead.com") }
if (-not $seenBaseurl) { $out.Insert(1, 'baseurl: ""') }

$finalCfg = ($out -join "`n").TrimEnd() + "`n"
Set-Content -Encoding UTF8 -Path $configPath -Value $finalCfg

Write-Host "Repaired _config.yml (backup saved at $cfgBackup)."
Write-Host "Next: run a local build and confirm CSS paths are Liquid-safe."
