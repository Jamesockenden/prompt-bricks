# prompt-brick-service

> A modular prompt generator service exposed via GitHub Pages using Jekyll.

## Prompt Pages

Markdown files under `prompts/` are published as individual prompt pages and
listed in the catalog at the site root. For example,
`prompts/core/architecture-guardrails.md` is served at
`/prompts/core/architecture-guardrails.html`. Prompt template expressions such
as `{{secret_manager_provider}}` and `{{#if ...}}` are preserved as written.

To build the site locally, run `bundle exec jekyll build`; the generated pages
are written to `_site/`.

The catalog includes a prompt builder: select one or more bricks, combine their
contents in the selected order, and copy the result. It runs entirely in the
browser and does not require a backend. The builder also shows an approximate
token count based on four characters per token; actual counts vary by model
tokenizer.

## Repository Architecture

```
prompts/
├── core/
│   ├── output-format-clean-code.md   # Brick 1: Strict markdown block rule
│   └── architecture-guardrails.md    # Brick 2: Zero inline secrets, use Secret Manager
├── stack/
│   ├── java21-spring3.md             # Brick 3: Use Records, Virtual Threads, WebFlux
│   └── gcp-cloudrun.md               # Brick 4: Port 8080, Workload Identity
└── tasks/
    ├── generate-controller.md         # Brick 5: Specific endpoint task
    ├── generate-harness-step.md       # Brick 6: CI/CD step
    └── generate-test-suite.md         # Brick 7: Unit and integration tests
```

## Quick Deployment to GitHub Pages

1. **Initialize Git Repository**:

   ```bash
   git init
   git add .
   git commit -m "feat: initial prompt brick repository"
   git branch -M main
   ```

2. **Push to your GitHub repository**:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/prompt-brick-service.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository **Settings** → **Pages**.
   - Under **Build and deployment**, set Source to **GitHub Actions** (the included workflow `.github/workflows/` handles builds automatically).
   - Your prompt generator service will be published live at `https://YOUR_USERNAME.github.io/prompt-brick-service/`!
