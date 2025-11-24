# Tillerstead Site

## Ruby environment (Windows via RubyInstaller)
- Install [RubyInstaller 3.1+ with MSYS2](https://rubyinstaller.org/downloads/) and select option 3 to run `ridk install` when prompted so the DevKit and build tooling are configured.
- From a PowerShell terminal in the project root, run `powershell -ExecutionPolicy Bypass -File scripts/activate-ruby.ps1`. The helper locates your RubyInstaller installation, sources `ridk`/`setrbvars`, and installs Bundler `2.4.19` if it is missing.
- Re-run `scripts/activate-ruby.ps1` any time you open a fresh shell so the Ruby toolchain is on your `PATH` before invoking Bundler or Jekyll.
- If Ruby is installed in a non-standard directory, provide the path manually: `powershell -ExecutionPolicy Bypass -File scripts/activate-ruby.ps1 -RubyRoot 'D:\Tools\Ruby32-x64'`.

### Typical workflow
```powershell
# Activate Ruby (installs Bundler on first run)
powershell -ExecutionPolicy Bypass -File scripts/activate-ruby.ps1

# Install Ruby gems / Node dependencies once
bundle install
npm install

# Build the site
npm run build:site   # runs Sass build + bundle exec jekyll build
```

If `scripts/activate-ruby.ps1` cannot find RubyInstaller it will stop with a helpful message that includes the download URL. Once activated, the terminal echoes the Ruby version so you know the environment is ready.
