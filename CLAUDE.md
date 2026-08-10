# CLAUDE.md

A React CV that renders from JSON, deploys to GitHub Pages, and exports a PDF
with live hyperlinks. Also published as a template others clone.

Standing behaviour (communication style, question handling, shell conventions)
comes from `~/.claude/rules/`. This file is only what is specific to this repo.

## Workflow

1. Read TODO.md before starting.
2. Mark the task `[x]` immediately when done.
3. Tasks must be completable in one session.
4. Log substantial changes in PROGRESS.md: architecture, discoveries, breaking
   changes, new dependencies. Follow the dated entry format at the top of that
   file.

No time estimates. Break work down finer instead.

## Commands

pnpm only, not npm, not yarn.

| Command | Does |
|---|---|
| `pnpm start` | Dev server on :3000 (`BROWSER=none`) |
| `pnpm build` | Production build, then `scripts/prerender.js` |
| `pnpm generate-pdf` | Build, then render the PDF via Puppeteer |
| `pnpm generate-pdf-local` | Render the PDF against a running dev server |
| `pnpm record-preview` | Build, then record the README preview GIF (needs `ffmpeg`) |
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

`postbuild` prerenders the app into `build/index.html` so crawlers get content.
`scripts/prerender.js` bundles `scripts/prerender-entry.js` for node with
esbuild and renders it with `renderToString`, which means **the component tree
has to survive being imported outside a browser**. Touch `window` or `document`
only inside an effect, never during render; `decodeStateFromURL` carries the one
guard this needed. A wrapper added to `src/index.js` must be added to
`prerender-entry.js` as well, or the two trees disagree and React throws the
prerendered markup away.

Styling is Semantic UI React plus `App.css` plus inline styles for layout. The
CSS is self-hosted in `public/vendor`, built by `scripts/vendor-semantic` as a
subset of the components the app imports. Importing a new Semantic UI component
means adding it to `COMPONENTS` in that script and re-running it, or it renders
unstyled.

## PDF and the ATS check

`.github/workflows/build-and-publish.yml` is the only workflow. It builds once,
then generates `Mert_Yasin_CV.pdf` and publishes the `cv-latest` and
`cv-<version>` releases, and records the preview README GIF via
`scripts/record-preview.js` onto the `cv-preview` release. That last tag is
separate on purpose: the PDF releases are deleted and recreated on every run and
would take an asset parked there with them.

Both artifacts come from the build the workflow just produced, never from the
deployed site — deploys are manual, so fetching the live URL captures the
previous version. The PDF runs first because it is the artifact people download;
the GIF is cosmetic and goes last, where a failure cannot cost a PDF release.

An ATS does not see the rendered page. It runs the PDF through a text extractor
and parses fields out of the resulting string, so what matters is what the
extractor recovers. `scripts/check-cv-pdf` runs three extractors with different
strategies (pdfminer.six is layout-aware, pypdf follows content-stream order
like PDFBox and Tika, pymupdf uses the MuPDF engine) and reports what each one
gets: name, employers, date ranges, hyperlink annotations, section headings.
Expected values come from `src/data/*.json`, so the check stays correct as the
CV changes.

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

Two warnings are known and accepted: bullet glyphs sit in their own text run, so
list-item detection is unreliable though the text is intact, and pypdf fuses a
few words across line breaks where the other two do not.

Three App.css rules exist only to keep the check passing, and each carries a
comment saying so. Tracking on `.fontSectionHeader` must stay at or under 1px or
the headings extract as `E X P E R I E N C E`; the `position: static` override
on bulleted list items keeps responsibilities next to the job they belong to;
and the self-hosted `@font-face` blocks in `public/index.html` must carry no
`unicode-range` or Turkish characters split their words apart.

## GitHub Pages

Source: deploy from branch. Branch: `gh-pages`. Folder: `/`. The `homepage`
field in `package.json` must match the deployed URL.
