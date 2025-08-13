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

