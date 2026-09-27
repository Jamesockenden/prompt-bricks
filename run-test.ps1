Write-Host "Running markdownlint auto-fix..." -ForegroundColor Cyan
npx markdownlint-cli2 --fix "**/*.md"

Write-Host "Building site with strict rules..." -ForegroundColor Green
bundle exec jekyll build --strict
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Local validation passed. Starting Jekyll local server..." -ForegroundColor Green
wsl bash -lc "bundle exec jekyll serve --livereload"
