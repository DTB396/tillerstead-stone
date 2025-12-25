# scripts/ts-20-fix-jekyll-config.ps1
[CmdletBinding()]
param(
  [string]$RepoRoot = (Get-Location).Path,
  [string]$SiteUrl  = "https://tillerstead.com",
  [string]$BaseUrl  = ""  # usually "" for root domain
)

$ErrorActionPreference = "Stop"

$configPath = Join-Path $RepoRoot "_config.yml"
if (-not (Test-Path $configPath)) {
  throw "No _config.yml found. If this isn't Jekyll, don't run this."
}

$cfg = Get-Content -Raw $configPath

function Upsert-YamlScalar([string]$yaml, [string]$key, [string]$value) {
  # naive but effective for simple scalars
  $pattern = "(?m)^\s*$([regex]::Escape($key))\s*:\s*.*$"
  if ($yaml -match $pattern) {
    return [regex]::Replace($yaml, $pattern, "$key: $value")
  } else {
    return ($yaml.TrimEnd() + "`n$key: $value`n")
  }
}

$cfg = Upsert-YamlScalar $cfg "url"    $SiteUrl
$cfg = Upsert-YamlScalar $cfg "baseurl" $BaseUrl

# Encourage correct defaults
if ($cfg -notmatch "(?m)^\s*permalink\s*:") {
  $cfg = $cfg.TrimEnd() + "`npermalink: pretty`n"
}

Set-Content -Encoding UTF8 $configPath $cfg
Write-Host "Updated _config.yml: url=$SiteUrl baseurl=$BaseUrl"
