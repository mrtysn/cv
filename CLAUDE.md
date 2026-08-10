# CLAUDE.md

A React CV that renders from JSON, deploys to GitHub Pages, and exports a PDF
with live hyperlinks. Also published as a template others clone.

Standing behaviour (communication style, question handling, shell conventions)
comes from `~/.claude/rules/`. This file is only what is specific to this repo.

## Workflow

1. Read TODO.md before starting.
2. Mark the task `[🔄]` before working, `[x]` immediately when done.
3. One task in progress at a time. Tasks must be completable in one session.
4. Log substantial changes in PROGRESS.md: architecture, discoveries, breaking
   changes, new dependencies. Follow the dated entry format at the top of that
   file.

No time estimates. Break work down finer instead.

## Commands

pnpm only, not npm, not yarn.

| Command | Does |
|---|---|
| `pnpm start` | Dev server on :3000 (`BROWSER=none`) |
| `pnpm build` | Production build, then `react-snap` prerender |
| `pnpm generate-pdf` | Build, then render the PDF via Puppeteer |
| `pnpm generate-pdf-local` | Render the PDF against a running dev server |
| `pnpm deploy` | Build and publish to the `gh-pages` branch |
| `scripts/check-cv-pdf` | Check the PDF the way an ATS reads it (below) |

## Content lives in JSON, not in components

Do not edit text in `src/containers/`. Every string on the CV comes from
`src/data/*.json`:

```
src/data/header.json         name, title, contact
src/data/experience.json     jobs, in display order
src/data/education.json
src/data/skills.json
src/data/achievements.json
schemas/*.schema.json        the shape each file must hold
DATA_SCHEMA.md               field reference, read this before changing shape
```

Containers read their JSON, pass it through `utils/filterData.js`, and hand the
result to `SectionItem` or `SkillRow`. Adding a job means adding an object to
`experience.json` and touching no JS.

Three conventions in the data are easy to miss. Links inside a bullet are
`{Placeholder}` tokens, resolved against the entry's `links` object by
`utils/experienceRenderer.js`; the renderer iterates that object generically, so
an entry may carry several links. The `short` object holds overrides applied in
short mode, and a field set to `null` there is removed entirely, so a bullet
edited in `responsibilities` usually needs the matching edit in
`short.responsibilities` or the two will contradict each other. Finally, `tags`
drive the filter toggles: an item is hidden only when all of its tags are
hidden, untagged items always show, and the tags themselves live in
`src/constants/tags.js`.

Rendered HTML in bullets goes through `dangerouslySetInnerHTML`, so keep the
data files hand-authored.

## Structure

```
src/App.js              section order, wrapped in CVProvider
src/context/            CVContext, holds filter mode and hidden tags
src/containers/         one per section; reads JSON, renders
src/components/         SectionItem, SkillRow, SectionTitle, ErrorBoundary,
                        PdfDownloadButton, GitHubLinkButton, Mode/SectionToggle
src/utils/              filterData, experienceRenderer, educationRenderer,
                        urlState, useWindowSize
src/App.css             print styles: .hideFromPrint, .noPageBreak
src/constants.js        CV_VERSION and DATE, bump on content changes
```

Styling is Semantic UI React plus `App.css` plus inline styles for layout.

## PDF and the ATS check

`.github/workflows/pdf-generation.yml` regenerates `Mert_Yasin_CV.pdf` and
publishes a release. `generate-gif.yml` records the preview GIF.

An ATS does not see the rendered page. It runs the PDF through a text extractor
and parses fields out of the resulting string, so what matters is what the
extractor recovers. `scripts/check-cv-pdf` runs two extractors with different
strategies (pdfminer.six, pypdf) and reports what each one gets: name,
employers, date ranges, hyperlink annotations, section headings. Expected values
come from `src/data/*.json`, so the check stays correct as the CV changes.

```
scripts/check-cv-pdf                 # newest *_CV.pdf at the repo root
scripts/check-cv-pdf path.pdf --json
```

Dependencies live in `.venv-ats/`, created on first run and gitignored. Set
`CV_ATS_PYTHON` to use a different interpreter.

`.githooks/pre-commit` runs the check against the staged blob whenever a
`*_CV.pdf` is staged, and blocks on a FAIL. It is enabled via `core.hooksPath`,
so a fresh clone needs `git config core.hooksPath .githooks` once. `--no-verify`
bypasses it.

Known FAIL: `.fontSectionHeader` in `App.css` sets `letter-spacing: 4px`, so a
layout-aware extractor reads the headings as `E X P E R I E N C E`. Section
headings are how an ATS scopes the block beneath them. Fixing it means finding
tracking that survives extraction, or accepting tighter headings.

## GitHub Pages

Source: deploy from branch. Branch: `gh-pages`. Folder: `/`. The `homepage`
field in `package.json` must match the deployed URL.
