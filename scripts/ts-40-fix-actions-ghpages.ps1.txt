# scripts/ts-40-fix-actions-ghpages.ps1
[CmdletBinding()]
param(
  [string]$RepoRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"
$wfPath = Join-Path $RepoRoot ".github\workflows\pages.yml"

$wf = @"
name: Build and Deploy (Jekyll)

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.3"
          bundler-cache: true

      - name: Build with Jekyll
        env:
          JEKYLL_ENV: production
        run: |
          bundle exec jekyll build --trace

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
"@

Set-Content -Encoding UTF8 $wfPath $wf
Write-Host "Wrote workflow: $wfPath"
Write-Host "Reminder: in repo Settings -> Pages, set Source = GitHub Actions."
