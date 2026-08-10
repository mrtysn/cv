# PROGRESS.md

This file documents substantial updates, changes, and important notes for the CV repository. Use this for tracking significant developments and maintaining context for future work.

## Usage Guidelines

### When to Update This File
- **Architectural decisions** - Major changes to code structure or approach
- **Important discoveries** - Key insights about the codebase or dependencies
- **Breaking changes** - Changes that affect existing functionality
- **Performance improvements** - Optimizations and their impact
- **New dependencies** - Added libraries, tools, or external services
- **Configuration changes** - Deployment, build, or environment updates
- **Current task notes** - Temporary notes while working on complex tasks

### Entry Format
```
## YYYY-MM-DD - Brief Title
**Type**: [Architecture/Discovery/Breaking Change/Performance/Dependency/Config/Notes]
**Impact**: [High/Medium/Low]

---

## 2025-07-28 - Font Loading Fix
**Impact**: Medium

Fixed Firefox font loading. Ubuntu font only, added weight 500.
```

---

## 2026-08-10 - Removed the Last Third-Party Runtime Dependencies
**Type**: [Architecture/Dependency]
**Impact**: Medium

The page now loads nothing from a third party, and the build no longer carries a
2019 browser.

**Semantic UI is self-hosted.** It was loaded from cdnjs at version 2.2.12 while
package.json declared semantic-ui-css 2.5.0 as a dependency that was never
imported, so the pinned CDN version and the declared one had silently diverged.
Its stylesheet also `@import`s Lato from Google Fonts, a request for a font that
never renders because App.css forces Ubuntu on every element. `scripts/vendor-semantic`
copies the installed stylesheet and its icon fonts into public/vendor with that
import stripped, and fails loudly if any Google Fonts reference survives. Re-run
it after bumping the dependency.

The 2.2.12 to 2.5.0 jump was verified rather than assumed: rendering the PDF
before and after and diffing the pages gives **0 differing pixels out of
573,300**.

**react-snap is gone.** It was unmaintained and bundled puppeteer 1.20, whose
Chromium download is disabled, so `pnpm build` died at postbuild on any clean
install. `scripts/prerender.js` now does the prerender directly: it serves
build/ through `serve-build.js`, loads it in the project's own puppeteer, waits
for fonts and for the `app-loaded` class, and writes the rendered DOM back over
build/index.html. `src/index.js` still branches on `rootElement.hasChildNodes()`,
so the output is hydrated exactly as before. It refuses to overwrite the build
if `#root` came back empty, and reports page errors instead of silently shipping
a blank shell.

Output compared against react-snap's: identical body class, identical script and
stylesheet counts, identical set of 35 external content hosts, identical
rendered content. 2.7 KB larger because HTML minification is not reproduced (one
file, served gzipped, not worth a minifier dependency). 200.html is also not
reproduced, as GitHub Pages uses 404.html and there is none.

With the 2019 Chromium gone, puppeteer was removed from
`pnpm.ignoredBuiltDependencies` so a clean install provisions its browser again.
CI already sets `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` on the install step and
installs Chrome explicitly, so nothing downloads twice there.

Vestigial and left alone: the `#loading` CSS in public/index.html styles an
element that does not exist, and the `app-loaded` class it keys off is set by
two components but matched by nothing else.

---

## 2026-08-10 - Reading Order, Production Path, and Contact Fields
**Type**: [Architecture/Discovery/Config]
**Impact**: High

`scripts/check-cv-pdf` now runs three extraction engines and reports 10 passed,
2 warnings, 0 failed.

**Reading order was the real parsing bug.** Semantic UI sets `position: relative`
on every bulleted list item so it can hang the bullet off an absolutely
positioned `::before`. Positioned elements paint in the last phase of a stacking
context, so Chrome emitted all eleven job headers first and every bullet
afterwards. An extractor following content-stream order (PDFBox and Tika, which
sit under many applicant tracking systems) saw eleven employers with no
responsibilities and then an orphaned block of bullets. Putting the item and its
marker back in normal flow restored document order; the render is unchanged.

**Production path.** `generate-pdf.js` built the app and then fetched the
*deployed* site, so the released PDF always described the previous deploy. It now
serves `build/` over HTTP via `scripts/serve-build.js` (zero dependencies; the
built app cannot load over file:// because `homepage` makes asset paths
absolute). The repo-root artifact is written by `pdf-generator.js` itself, so
every entry point produces it identically. `scripts/prerender.js` gives react-snap
the Chrome the project already has, fixing a clean-install failure where
`pnpm build` died at postbuild. The ATS check runs in the workflow before
anything is released, and `check-cv-pdf` is POSIX sh so it works on ubuntu-latest.

**Contact fields.** The profile links rendered as `github/mrtysn` and
`linkedin/mert-yasin`, which no URL regex matches. They existed only as link
annotations, so a parser ignoring annotations got no profile link at all. Labels
are now the bare domain path. Chrome also leaves `/Author` and `/Subject` empty;
`pdf-generator.js` writes them from `header.json` via pdf-lib. That round-trip
also recompressed the file from 166 KB to 78 KB with fonts, tagging (the PDF is
tagged: `/StructTreeRoot`, `/Marked`, `/Lang`), and all 45 URI annotations intact.

Remaining warnings are both extractor-specific and low impact: bullet glyphs sit
in their own text run, and pypdf fuses six words across line breaks where
pdfminer and pymupdf do not.

---

## 2026-08-10 - Fixed Both ATS Extraction Failures
**Type**: [Discovery/Config]
**Impact**: High

`scripts/check-cv-pdf` now reports 7 passed, 0 failed. Both defects it found were
real and had separate causes.

**Turkish diacritics.** Not font subsetting in the print path, which is what the
first TODO entry guessed. The Google Fonts css2 stylesheet splits Ubuntu into
`latin` and `latin-ext` `@font-face` rules by `unicode-range`, so Chrome embedded
two font resources per weight. The split falls exactly on U+0100: Ö, ç, Ü and
dotless ı sit in `latin`, while ğ (U+011F), İ (U+0130) and ş (U+015F) sit in
`latin-ext`. Every Turkish word became three text-showing operations with a font
switch mid-word, and stream-order extractors read the name as "Mert Ya ş in".

Ubuntu is now self-hosted at `public/fonts/ubuntu-{300,400,500,700}.woff2`, one
file per weight, 570 glyphs, no `unicode-range`, declared in `public/index.html`.
The PDF embeds 3 Ubuntu resources instead of 6, and `Mert Yaşin`, `İstanbul` and
`TÜBİTAK` all extract intact. Two render-blocking third-party requests are gone
and the PDF build no longer depends on Google being reachable from CI.

Files were produced by requesting the merged subsets with a woff2-incapable user
agent, then converting with fontTools:

```
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.50 \
  (KHTML, like Gecko) Version/5.1 Safari/534.50" \
  "https://fonts.googleapis.com/css?family=Ubuntu:400&subset=latin,latin-ext"
# then, per weight: TTFont(src).flavor = "woff2"; save()
```

**Heading tracking.** `letter-spacing: 4px` at 18px is 0.22em. pdfminer inserts a
space once the gap between glyphs passes `word_margin`, which defaults to 0.1 of
the font size, and nothing in PDF marks tracking as distinct from a word space.
Measured at 18px: 0 through 1.5px extract clean, 2px and above split. pypdf never
split any of them, since it reads the TJ array without doing geometry.

First attempt at 20px / 1.5px was not enough headroom. `EXPERIENCE` came through
but the longest heading still broke into `EXTR ACURRICUL AR` on position
rounding. Settled at 20px / weight 400 / 1px, matching `.fontHeader`. Size and
weight now carry the presence the wide tracking used to.

That partial split also exposed a hole in the checker: its detector only matched
runs of single capitals, so it passed a PDF whose heading was still broken. It
now flags any all-caps line containing spaces whose despaced form appears as one
word elsewhere, which catches both shapes.

---

## 2026-08-10 - ATS Parse Check and Pre-Commit Hook
**Type**: [Discovery/Dependency/Config]
**Impact**: High

An ATS does not see the rendered CV. It runs the PDF through a text extractor
and parses fields out of the resulting string. Added `scripts/check-cv-pdf`,
which runs the generated PDF through two extractors with different strategies
(pdfminer.six reconstructs reading order from glyph positions, pypdf follows
content-stream order) and asserts what each recovers against `src/data/*.json`.
Nothing about the CV's content is hardcoded in the checker.

The two extractors disagree substantially on the same file, so the outcome
depends on which library the ATS happens to use:

| | pdfminer.six | pypdf |
|---|---|---|
| Name line | `Mert Yaşin` | `Mert Ya ş in` |
| `İstanbul` occurrences | 10 | 0 (all `İ stanbul`) |
| Bullets attached to their employer | yes | no, all 11 job headers emit first, then every bullet in one block |
| Literal `EXPERIENCE` present | no, reads `E X P E R I E N C E` | yes |
| Date ranges found | 10/10 | 10/10 |
| URI annotations | 45 | 45 |

Dates and hyperlinks come through clean in both, which is lucky, since those are
the fields that usually break. Two defects are real and independent of content:

1. `.fontSectionHeader` sets `letter-spacing: 4px`, which becomes literal spaces
   on extraction. Section headings are how an ATS scopes the block beneath them.
   This is the one hard FAIL.
2. Non-ASCII letters are emitted as separate text runs, so naive extractors
   mangle the name field, which is the first thing an ATS parses.

Dependencies live in a gitignored `.venv-ats/`, bootstrapped on first run, so
this adds no Node dependencies. `.githooks/pre-commit` runs the check against
the staged blob whenever a `*_CV.pdf` is staged and blocks on a FAIL. It is
enabled with `core.hooksPath`, so a fresh clone needs
`git config core.hooksPath .githooks` once.

Also corrected CLAUDE.md, which still claimed content was hardcoded in
`src/containers/`. It has been data driven since the JSON extraction, and the
stale instruction was pointing future work at the wrong files.

---

## 2025-08-12 - Link Preview Implementation Removed
**Type**: Breaking Change
**Impact**: Low

Implemented and immediately removed link preview functionality per user preference. Attempted multiple screenshot services (screenshotone, microlink.io, thum.io) - all had API limitations. Reverted all components (Header, Footer, GitHub button, Experience/Education renderers, Achievements) back to standard anchor tags. Bundle size reduced by 1.28kB. Lesson: validate user requirements before implementing complex UI features.

---

## Progress Log

## 2025-07-28 - Development Tracking System
**Impact**: High

TODO.md and PROGRESS.md established. Single task rule.

## 2025-07-28 - PDF Download Implementation
**Impact**: Medium

jsPDF + html2canvas. Fixed blank page issue. React 18 compatibility.

## 2025-07-28 - TODO.md Restructure
**Impact**: Medium

Next/Backlog/IRL sections. Removed priority labels.

## 2025-07-29 - JSON Data Migration
**Impact**: High

Migrated all hardcoded content to JSON. Template system with link placeholders. 100% formatting preserved.

## 2025-07-29 - TODO.md Format Optimization
**Impact**: Medium

80% size reduction. GitHub-style checkboxes for faster Claude parsing.

## 2025-07-29 - Button Scroll Behavior: 100-0-100 Pattern
**Impact**: Medium

Buttons now fade out in middle, reappear at bottom. Percentage-based scroll calculation.

## 2025-07-29 - Class to Functional Component Conversion  
**Impact**: Medium

SectionItem and Achievements converted to functional components. No breaking changes.

## 2025-07-28 - GitHub Link Button
**Impact**: Low

Added GitHub button with scroll fade animation.

---

## 2025-08-12 - GitHub Icon Enhancement & UI Refinements
**Type**: UI/UX Improvement
**Impact**: Medium

Enhanced GitHub icon with outline/filled hover states using custom SVG files. Replaced traditional borders with `box-shadow` technique (0.5px inset shadow) for precise border control on PDF download button. Added dynamic PDF filename with version number (`Mert_Yasin_CV_v3_3.pdf`). Improved print styling with `!important` rules. Key learning: box-shadow borders bypass CSS cascading issues better than traditional borders.

---

## 2025-08-12 - GitHub Actions PDF Pipeline with Interactive Links
**Type**: Architecture
**Impact**: High

Implemented complete PDF generation pipeline using GitHub Actions + Puppeteer to solve the core issue of non-working links in PDFs. Added smart download system: GitHub Releases API → local fallback. Created `/scripts/generate-pdf.js` with optimized Puppeteer settings for CI/CD. Added Puppeteer as dev dependency for local interactive PDF generation via `pnpm run generate-pdf`. System automatically creates versioned releases with working PDF links on every master push. Key insight: Puppeteer preserves HTML structure including clickable links, unlike html2canvas which creates static images.

---

## 2025-08-13 - GitHub Actions PNPM Configuration Fix
**Type**: Config
**Impact**: Medium

Fixed GitHub Actions failure caused by setup-node@v4 expecting npm/yarn lock files when project uses pnpm. Added pnpm/action-setup@v2 step and updated all package manager commands from npm to pnpm. Removed npm cache configuration from setup-node step. Essential for CI/CD pipeline functionality.

---

## 2025-08-13 - GitHub Actions Puppeteer CI/CD Hardening
**Type**: Architecture
**Impact**: High

Implemented comprehensive Puppeteer CI/CD best practices after research. Added Ubuntu system dependencies (libgbm1, libnss3, libatk-bridge2.0-0) essential for headless Chrome. Enhanced browser launch configuration with CI-specific arguments and environment detection. Added executable path fallback handling and PUPPETEER_SKIP_CHROMIUM_DOWNLOAD optimization. Implemented robust error handling, build verification, and debugging output. Key insight: libgbm1 is critical for Puppeteer 3+ on Ubuntu, and headless mode detection via CI environment variable ensures local development compatibility.

