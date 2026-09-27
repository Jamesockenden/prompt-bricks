import JSZip from 'jszip';
import { PromptBrick, TemplateVariation } from '../types/prompt';

export type ExportFramework = 'jekyll' | 'hugo' | 'gh-pages';

export interface GeneratedFile {
  path: string;
  content: string;
  category: string;
}

export function generateStaticSiteFiles(
  bricks: PromptBrick[],
  variations: TemplateVariation[],
  framework: ExportFramework,
  repoName: string = 'prompt-brick-repo'
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (framework === 'jekyll') {
    // 1. _config.yml
    files.push({
      path: '_config.yml',
      category: 'Configuration',
      content: `# PromptBrick Static Site Configuration for Jekyll
title: "${repoName} - Modular Prompt Repository"
description: "Composable Lego-style prompt brick library deployed via GitHub Pages"
baseurl: "" # the subpath of your site, e.g. /prompt-repo
url: "https://pages.github.io" # the base hostname & protocol

markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge

collections:
  prompts:
    output: true
    permalink: /:collection/:path/

defaults:
  - scope:
      path: ""
      type: "prompts"
    values:
      layout: "prompt"

exclude:
  - .github/
  - Gemfile
  - Gemfile.lock
  - node_modules/
  - vendor/
`
    });

    // 2. Gemfile
    files.push({
      path: 'Gemfile',
      category: 'Configuration',
      content: `source "https://rubygems.org"
gem "jekyll", "~> 4.3.3"
gem "kramdown-parser-gfm"
gem "webrick"
`
    });

    // 3. _layouts/default.html
    files.push({
      path: '_layouts/default.html',
      category: 'Layouts',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }} | {{ site.title }}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <style>
    :root { --pico-font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    pre { background: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 8px; overflow-x: auto; }
    .brick-meta { display: flex; gap: 1rem; color: #64748b; font-size: 0.85rem; margin-bottom: 1.5rem; }
    .badge { display: inline-block; padding: 0.15rem 0.6rem; border-radius: 4px; background: #e2e8f0; font-size: 0.75rem; }
    nav { margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
  </style>
</head>
<body>
  <main class="container">
    <nav>
      <ul>
        <li><strong>{{ site.title }}</strong></li>
      </ul>
      <ul>
        <li><a href="{{ site.baseurl }}/">All Bricks</a></li>
        <li><a href="https://github.com" target="_blank">Git Repository</a></li>
      </ul>
    </nav>
    {{ content }}
  </main>
</body>
</html>`
    });

    // 4. _layouts/prompt.html
    files.push({
      path: '_layouts/prompt.html',
      category: 'Layouts',
      content: `---
layout: default
---
<article>
  <header>
    <h1>{{ page.title }}</h1>
    <div class="brick-meta">
      <span>Category: <strong>{{ page.category }}</strong></span>
      <span>·</span>
      <span>Path: <code>{{ page.path }}</code></span>
      <span>·</span>
      <span>Author: {{ page.author }}</span>
    </div>
    <p>{{ page.description }}</p>
  </header>

  {% if page.params %}
  <section>
    <h3>Configurable Parameters</h3>
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        {% for p in page.params %}
        <tr>
          <td><code>{{ p.name }}</code></td>
          <td>{{ p.type }}</td>
          <td><code>{{ p.defaultValue }}</code></td>
          <td>{{ p.description }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>
  {% endif %}

  <section>
    <h3>Raw Prompt Template</h3>
    <pre><code>{{ page.content | escape }}</code></pre>
  </section>
</article>`
    });

    // 5. GitHub Actions workflow
    files.push({
      path: '.github/workflows/deploy.yml',
      category: 'CI/CD Workflow',
      content: `name: Deploy Jekyll to GitHub Pages

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
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
    });

    // 6. index.html (Catalog page)
    files.push({
      path: 'index.html',
      category: 'Static Site Pages',
      content: `---
layout: default
title: "Prompt Brick Catalog"
---
<h2>Prompt Bricks Library</h2>
<p>Browse composable, version-controlled markdown bricks for assembling LLM prompts.</p>

<div class="grid">
  {% for prompt in site.prompts %}
  <article style="border: 1px solid #e2e8f0; padding: 1.5rem; border-radius: 8px;">
    <h3><a href="{{ prompt.url | relative_url }}">{{ prompt.title }}</a></h3>
    <p><small style="color: #64748b;">{{ prompt.category }} · {{ prompt.filename }}</small></p>
    <p>{{ prompt.description }}</p>
  </article>
  {% endfor %}
</div>`
    });

  } else if (framework === 'hugo') {
    // Hugo config
    files.push({
      path: 'hugo.toml',
      category: 'Configuration',
      content: `baseURL = 'https://pages.github.io/'
languageCode = 'en-us'
title = '${repoName} - Modular Prompt Repository'
theme = 'ananke'

[params]
  description = 'Composable Lego-style prompt brick library deployed via Hugo & GitHub Pages'
`
    });

    files.push({
      path: 'layouts/_default/single.html',
      category: 'Layouts',
      content: `{{ define "main" }}
<div class="pa4 sans-serif max-w-4xl">
  <h1 class="f2 mb2">{{ .Title }}</h1>
  <p class="gray f6">{{ .Params.category }} · {{ .Params.filename }} · {{ .Params.lastModified }}</p>
  <div class="lh-copy">{{ .Content }}</div>
</div>
{{ end }}
`
    });

    files.push({
      path: '.github/workflows/hugo-deploy.yml',
      category: 'CI/CD Workflow',
      content: `name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true
      - run: hugo --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
`
    });
  } else {
    // Standalone GitHub Pages SPA
    files.push({
      path: 'index.html',
      category: 'Static Site Pages',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${repoName} - Prompt Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold tracking-tight mb-2">${repoName}</h1>
    <p class="text-slate-400 mb-8">Static Prompt Generator Service running directly on GitHub Pages</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="bricks-list">
      <!-- Bricks loaded via static JSON -->
    </div>
  </div>
</body>
</html>`
    });
  }

  // Common: Add all Prompt Brick markdown files with YAML frontmatter
  for (const b of bricks) {
    const yamlParams = JSON.stringify(b.params);
    const yamlTags = JSON.stringify(b.tags);
    const prefix = framework === 'hugo' ? 'content/' : '';
    const fullPath = `${prefix}${b.path}`;

    const mdFileContent = `---
title: "${b.title.replace(/"/g, '\\"')}"
category: "${b.category}"
filename: "${b.filename}"
path: "${b.path}"
description: "${b.description.replace(/"/g, '\\"')}"
tags: ${yamlTags}
commitHash: "${b.commitHash}"
lastModified: "${b.lastModified}"
author: "${b.author}"
params: ${yamlParams}
---

${b.content}
`;

    files.push({
      path: fullPath,
      category: `Bricks (${b.category})`,
      content: mdFileContent
    });
  }

  // Add variations history file
  files.push({
    path: 'variations/history.json',
    category: 'Version Control',
    content: JSON.stringify(variations, null, 2)
  });

  // Add README.md with clear git deployment commands
  files.push({
    path: 'README.md',
    category: 'Documentation',
    content: `# ${repoName}

> A modular prompt generator service exposed via GitHub Pages using ${framework === 'jekyll' ? 'Jekyll' : framework === 'hugo' ? 'Hugo' : 'GitHub Pages'}.

## Repository Architecture

\`\`\`
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
\`\`\`

## Quick Deployment to GitHub Pages

1. **Initialize Git Repository**:
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: initial prompt brick repository"
   git branch -M main
   \`\`\`

2. **Push to your GitHub repository**:
   \`\`\`bash
   git remote add origin https://github.com/YOUR_USERNAME/${repoName}.git
   git push -u origin main
   \`\`\`

3. **Enable GitHub Pages**:
   - Go to your repository **Settings** → **Pages**.
   - Under **Build and deployment**, set Source to **GitHub Actions** (the included workflow \`.github/workflows/\` handles builds automatically).
   - Your prompt generator service will be published live at \`https://YOUR_USERNAME.github.io/${repoName}/\`!
`
  });

  return files;
}

/**
 * Creates and downloads a .zip archive of the entire repository
 */
export async function downloadRepoZip(
  bricks: PromptBrick[],
  variations: TemplateVariation[],
  framework: ExportFramework,
  repoName: string = 'prompt-brick-repo'
): Promise<void> {
  const files = generateStaticSiteFiles(bricks, variations, framework, repoName);
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.path, file.content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${repoName}-${framework}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
