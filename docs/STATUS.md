# Build & Serve Status (2025-05-21)

- **Major** [`vendor/gems/jekyll/lib/jekyll/cli.rb`]: `bundle exec jekyll serve --livereload` fails with “Unknown command: serve” because the vendored Jekyll CLI only implements the `build` subcommand (see `tmp/jekyll_serve_failure.log`). Root cause: serve/livereload support is not present in the custom CLI, blocking local dev server usage.
- **Minor** [`tmp/jekyll_build.log`]: `bundle exec jekyll build` completes successfully with verbose output and no Liquid errors, missing assets, or SCSS/JS issues. Root cause: templates and assets under `_includes`, `_layouts`, `_sass`, and `assets/js` compile cleanly against the current data and config.

## File safety classification
- **Safe:** `_includes`, `_layouts`, `_sass`, `assets/js` (no warnings surfaced during the build).
- **Problematic:** `vendor/gems/jekyll/lib/jekyll/cli.rb` (serve/livereload command path missing).
- **Defer for later:** Enhance the vendored CLI to expose `jekyll serve`/livereload so local dev preview works.

## Baseline references
- `_config.yml` snapshot: `docs/baseline/_config.yml`.
- `_data` snapshots: `docs/baseline/_data/` (all source data files copied).
- Build log: `tmp/jekyll_build.log`.
- Commands executed: `bundle install`; `bundle exec jekyll build`.
