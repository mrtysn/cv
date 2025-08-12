# TODO.md

Task tracking for CV repository. Rules: Mark tasks in progress before starting, only one task in progress at a time, mark completed immediately when finished.

**Legend**: [ ] = pending, [🔄] = in progress, [x] = completed

## Next
- [x] Add "download as PDF" button (implemented with jsPDF + html2canvas)
- [x] Convert all text input to load from JSON file (extract hardcoded content to JSON)
- [x] Extract hardcoded content to data files (create JSON files for all CV content)
- [x] Modify PDF and GitHub button scroll behavior (100-0-100 pattern: visible at top, hidden in middle, reappear at bottom)
- [x] Add hover previews to links for web version (removed - user preference)
- [ ] Convert Experience class component to functional component (maintain same functionality)
- [ ] Convert Education class component to functional component (modernize to functional style)
- [x] Convert Achievements class component to functional component (modernize to functional style)
- [x] Convert SectionItem class component to functional component (most used component, test carefully)
- [ ] Add responsive breakpoints for tablet view (improve 451px-768px breakpoint)
- [ ] Fix GIF generation failure in CV repo (debug GitHub Actions workflow)
- [ ] Add PropTypes validation to components (SectionItem, SkillRow, SectionTitle)
- [ ] Fix CSS class naming inconsistencies (standardize camelCase vs kebab-case)
- [ ] Add basic error boundaries (graceful error handling with fallback UI)
- [ ] Optimize bundle size analysis (add webpack-bundle-analyzer script)

## Backlog
- [ ] Update Cypher section in CV (update job description and details in Experience)
- [ ] Add SEO indexing to Google Search Console (improve discoverability)
- [ ] Deploy mertyas.in domain for CV project (custom domain setup)
- [ ] Remove high school education section (not relevant for senior positions)
- [ ] Remove relevant courses from education entries (course listings don't add value)
- [ ] Reduce VenueX bullet points (currently 10 points, reduce to 3-4 max)
- [ ] Remove 2nd and 3rd extracurricular items (streamline achievements section)
- [ ] Remove GTA reference (not professional for senior roles)
- [ ] Shrink skills section based on job target (focus on full-stack vs ML roles)

## IRL Tasks
- [ ] Share CV template on LinkedIn (marketing/promotion post)
- [ ] Share CV template on Twitter (marketing/promotion post)
- [ ] Promote CV project on Reddit & Hacker News (coordinate with social media)
- [ ] Prepare backend focused CV version (emphasize backend skills)
- [ ] Prepare machine learning focused CV version (emphasize ML/AI experience)