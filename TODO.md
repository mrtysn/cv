# TODO.md

This file tracks tasks and progress for the CV repository. Future Claude instances should use this file to manage development work.

## Task Management Rules
- Mark task as IN PROGRESS before starting work
- Only ONE task IN PROGRESS at a time
- Mark COMPLETED immediately when finished
- Update PROGRESS.md for substantial changes
- Keep tasks atomic and single-session completable

---

## Next

### [COMPLETED] Add "download as PDF" button
- **Description**: Add button to web version that allows users to download CV as PDF
- **Acceptance Criteria**: Button triggers PDF generation/download with proper formatting
- **Notes**: Improves user experience for web version. Implemented with jsPDF + html2canvas
- **Updated**: 2025-07-28

### [PENDING] Convert all text input to load from JSON file
- **Description**: Extract hardcoded content from components to JSON data files
- **Acceptance Criteria**: All CV content (experience, education, skills, etc.) loaded from JSON files
- **Notes**: Same as "Extract hardcoded content" task - makes content updates easier
- **Updated**: 2025-07-28

### [PENDING] Extract hardcoded content to data files
- **Description**: Create JSON data files for Experience, Education, Skills, and Achievements content
- **Acceptance Criteria**: Content moved to separate JSON files, components read from data, same output
- **Notes**: Makes content updates easier without touching component code
- **Updated**: 2025-07-28

### [PENDING] Add hover previews to links for web version
- **Description**: Add hover preview functionality to external links in the web version
- **Acceptance Criteria**: Links show preview/tooltip on hover with relevant information
- **Notes**: Enhances user experience for web viewers
- **Updated**: 2025-07-28

### [PENDING] Convert Experience class component to functional component
- **Description**: Convert Experience.js from class component to functional component for consistency
- **Acceptance Criteria**: Experience component uses function syntax, maintains same functionality and styling
- **Notes**: Skills and Header already use functional components, Education/Achievements still class-based
- **Updated**: 2025-07-28

### [PENDING] Convert Education class component to functional component
- **Description**: Convert Education.js from class component to functional component for consistency
- **Acceptance Criteria**: Education component uses function syntax, maintains same functionality and styling
- **Notes**: Part of modernizing all components to functional style
- **Updated**: 2025-07-28

### [PENDING] Convert Achievements class component to functional component
- **Description**: Convert Achievements.js from class component to functional component for consistency
- **Acceptance Criteria**: Achievements component uses function syntax, maintains same functionality and styling
- **Notes**: Part of modernizing all components to functional style
- **Updated**: 2025-07-28

### [PENDING] Convert SectionItem class component to functional component
- **Description**: Convert SectionItem.js from class component to functional component
- **Acceptance Criteria**: SectionItem component uses function syntax, maintains all props and styling
- **Notes**: Most used component, needs careful testing after conversion
- **Updated**: 2025-07-28

### [PENDING] Add responsive breakpoints for tablet view
- **Description**: Improve responsive design between mobile (450px) and desktop breakpoints
- **Acceptance Criteria**: CV looks good on tablet-sized screens (451px-768px)
- **Notes**: Currently only has mobile (<450px) and desktop breakpoints
- **Updated**: 2025-07-28

### [PENDING] Fix GIF generation failure in CV repo
- **Description**: Debug and fix the automated GIF generation that's failing due to diff detection
- **Acceptance Criteria**: GIF generation workflow runs successfully on CV updates
- **Notes**: GitHub Actions workflow improvement
- **Updated**: 2025-07-28

### [PENDING] Add PropTypes validation to components
- **Description**: Add PropTypes validation to SectionItem, SkillRow, and SectionTitle components
- **Acceptance Criteria**: All components have proper PropTypes, no console warnings
- **Notes**: Improves development experience and catches prop errors
- **Updated**: 2025-07-28

### [PENDING] Fix CSS class naming inconsistencies
- **Description**: Standardize CSS class names (some use camelCase, some use kebab-case)
- **Acceptance Criteria**: All CSS classes follow consistent naming convention
- **Notes**: Current mix of colorHighlight, px12, narrowSkillTitle styles
- **Updated**: 2025-07-28

### [PENDING] Add basic error boundaries
- **Description**: Add React error boundary component to gracefully handle component errors
- **Acceptance Criteria**: Error boundary catches errors and shows fallback UI instead of blank page
- **Notes**: Improves user experience if components fail to render
- **Updated**: 2025-07-28

### [PENDING] Optimize bundle size analysis
- **Description**: Add webpack-bundle-analyzer to identify large dependencies
- **Acceptance Criteria**: Bundle analyzer available as npm script, can identify optimization opportunities
- **Notes**: Semantic UI React is likely the largest dependency
- **Updated**: 2025-07-28

---

## Backlog

### [PENDING] Update Cypher section in CV
- **Description**: Update the current Cypher Games job description and details in Experience section
- **Acceptance Criteria**: Cypher Games section reflects latest job information and achievements
- **Notes**: From user's task list - highest priority
- **Updated**: 2025-07-28

### [PENDING] Add SEO indexing to Google Search Console
- **Description**: Set up and configure Google Search Console for the CV website
- **Acceptance Criteria**: CV website indexed and visible in Google Search Console
- **Notes**: Improves discoverability of the CV template
- **Updated**: 2025-07-28

### [PENDING] Deploy mertyas.in domain for CV project
- **Description**: Set up custom domain deployment for the CV project
- **Acceptance Criteria**: CV accessible at mertyas.in domain with proper DNS configuration
- **Notes**: Professional domain for the CV template
- **Updated**: 2025-07-28

### [PENDING] Remove high school education section
- **Description**: Remove high school education entry from Education section
- **Acceptance Criteria**: High school section completely removed from CV
- **Notes**: CV feedback - not relevant for senior positions
- **Updated**: 2025-07-28

### [PENDING] Remove relevant courses from education entries
- **Description**: Remove the "Relevant Courses" sections from education entries
- **Acceptance Criteria**: No course listings visible in education sections
- **Notes**: CV feedback - course listings don't add value
- **Updated**: 2025-07-28

### [PENDING] Reduce VenueX bullet points
- **Description**: Reduce VenueX experience bullet points from current count to maximum 3-4 points
- **Acceptance Criteria**: VenueX section has concise, impactful bullet points (3-4 max)
- **Notes**: CV feedback - currently too wordy with 10 bullet points
- **Updated**: 2025-07-28

### [PENDING] Remove 2nd and 3rd extracurricular items
- **Description**: Remove specific extracurricular items (2nd and 3rd in the list)
- **Acceptance Criteria**: Extracurricular section has fewer, more relevant items
- **Notes**: CV feedback - streamline achievements section
- **Updated**: 2025-07-28

### [PENDING] Remove GTA reference
- **Description**: Remove any reference to GTA (Grand Theft Auto) from the CV
- **Acceptance Criteria**: No GTA mentions anywhere in the CV
- **Notes**: CV feedback - not professional for senior roles
- **Updated**: 2025-07-28

### [PENDING] Shrink skills section based on job target
- **Description**: Reduce and focus skills section for target job roles (full-stack vs ML)
- **Acceptance Criteria**: Skills section tailored to specific role types with relevant technologies only
- **Notes**: CV feedback - too broad currently, needs focus
- **Updated**: 2025-07-28

---

## IRL Tasks (For User to Complete)

### [PENDING] Share CV template on LinkedIn
- **Description**: Create LinkedIn post showcasing the CV template project
- **Acceptance Criteria**: Professional LinkedIn post published with project details and link
- **Notes**: Marketing/promotion task for the CV template
- **Updated**: 2025-07-28

### [PENDING] Share CV template on Twitter
- **Description**: Create Twitter post showcasing the CV template project
- **Acceptance Criteria**: Twitter post published with project details and link
- **Notes**: Marketing/promotion task for the CV template
- **Updated**: 2025-07-28

### [PENDING] Promote CV project on Reddit & Hacker News
- **Description**: Create posts on Reddit and Hacker News to promote the CV template
- **Acceptance Criteria**: Posts published on relevant subreddits and HN with good engagement
- **Notes**: Marketing/promotion task - coordinate with other social media posts
- **Updated**: 2025-07-28

### [PENDING] Prepare backend focused CV version
- **Description**: Create specialized version of CV highlighting backend development experience
- **Acceptance Criteria**: Separate CV version emphasizing backend skills and projects
- **Notes**: Part of creating multiple CV variants for different job applications
- **Updated**: 2025-07-28

### [PENDING] Prepare machine learning focused CV version
- **Description**: Create specialized version of CV highlighting ML/AI experience and research
- **Acceptance Criteria**: Separate CV version emphasizing ML skills, research, and AI projects
- **Notes**: Part of creating multiple CV variants for different job applications
- **Updated**: 2025-07-28