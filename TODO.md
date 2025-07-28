# TODO.md

This file tracks tasks and progress for the CV repository. Future Claude instances should use this file to manage development work.

## Task Lifecycle Instructions

### 1. Task States
- **PENDING** - Task identified but not started
- **IN PROGRESS** - Currently working on this task  
- **COMPLETED** - Task finished successfully
- **BLOCKED** - Task cannot proceed (note blocker reason)
- **CANCELLED** - Task no longer needed

### 2. Task Management Rules
- **ALWAYS mark a task as IN PROGRESS before starting work**
- Only have ONE task IN PROGRESS at a time
- Mark tasks COMPLETED immediately when finished
- Update PROGRESS.md for any substantial changes or findings
- Remove COMPLETED tasks periodically to keep file clean

### 3. Task Format
```
## [STATUS] Task Title
- **Priority**: High/Medium/Low
- **Description**: Brief description of what needs to be done
- **Acceptance Criteria**: What constitutes completion
- **Notes**: Any relevant context or blockers
- **Updated**: YYYY-MM-DD
```

### 4. Task Granularity - Keep Tasks Atomic
- **Break down complex tasks** into smaller, actionable pieces
- Each task should be completable in a single focused work session
- If a task has multiple steps, split it into separate tasks
- **Avoid time estimates** - focus on making tasks small and well-defined
- **Examples of good atomic tasks**:
  - "Add email validation to contact form"
  - "Update header component to use new logo"
  - "Fix responsive layout issue in Skills section"
- **Examples of tasks that need breaking down**:
  - "Redesign the entire website" → Split into layout, styling, content tasks
  - "Add contact form" → Split into form component, validation, submission tasks

### 5. When to Create Tasks
- New features or enhancements (broken into atomic pieces)
- Bug fixes (each bug as separate task)
- Code refactoring (component by component)
- Documentation updates (file by file)
- Testing requirements (feature by feature)
- Deployment changes (step by step)

### 6. When to Update PROGRESS.md
- Significant architectural decisions
- Important discoveries about the codebase
- Breaking changes or major refactors
- Performance improvements
- New dependencies or tools
- Deployment or configuration changes

---

## Current Tasks

### [PENDING] Example Task Template
- **Priority**: Medium
- **Description**: This is an example of how to format atomic tasks
- **Acceptance Criteria**: Task format is clear and documented, focuses on single actionable item
- **Notes**: Replace this with actual tasks - remember to keep them atomic
- **Updated**: 2025-07-28

---

## Completed Tasks

### [COMPLETED] Create development tracking structure
- **Priority**: High
- **Description**: Set up TODO.md and PROGRESS.md files for project tracking with atomic task focus
- **Acceptance Criteria**: Both files exist with clear instructions, no time estimates, emphasis on atomic tasks
- **Notes**: Part of initial project organization, updated to remove time estimates
- **Updated**: 2025-07-28