# Data Schema Documentation

This document describes the JSON data structure used to store CV content. All personal data is stored in JSON files located in `src/data/`, separated from the application logic.

## Table of Contents

- [Overview](#overview)
- [Data Files](#data-files)
- [Schema Files](#schema-files)
- [Common Patterns](#common-patterns)
- [Link Placeholder System](#link-placeholder-system)
- [HTML Support](#html-support)
- [Detailed Schema Reference](#detailed-schema-reference)
  - [Header Schema](#header-schema)
  - [Experience Schema](#experience-schema)
  - [Education Schema](#education-schema)
  - [Skills Schema](#skills-schema)
  - [Achievements Schema](#achievements-schema)

## Overview

The CV application uses a **data-driven architecture** where all content is stored in JSON files. This separation allows for:

- Easy content updates without touching React components
- Type safety through JSON Schema validation
- Version control for CV content
- Simple content localization or A/B testing

## Data Files

All data files are located in `src/data/`:

| File | Description | Schema |
|------|-------------|--------|
| `header.json` | Personal info, name, title, contact details | [header.schema.json](../schemas/header.schema.json) |
| `experience.json` | Work history, positions, responsibilities | [experience.schema.json](../schemas/experience.schema.json) |
| `education.json` | Academic background, degrees, courses | [education.schema.json](../schemas/education.schema.json) |
| `skills.json` | Technical skills grouped by category | [skills.schema.json](../schemas/skills.schema.json) |
| `achievements.json` | Awards, interests, languages, activities | [achievements.schema.json](../schemas/achievements.schema.json) |

## Schema Files

JSON Schema files are located in `schemas/` and follow the [JSON Schema Draft-07](https://json-schema.org/draft-07/schema) specification. These schemas:

- Define the structure and types for each data file
- Specify required and optional fields
- Provide validation rules (e.g., date formats, URL formats)
- Include examples and descriptions for each field

**Using the schemas:**

Many IDEs and editors support JSON Schema validation. In VS Code, you can add schema associations to `.vscode/settings.json`:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["src/data/header.json"],
      "url": "./schemas/header.schema.json"
    },
    {
      "fileMatch": ["src/data/experience.json"],
      "url": "./schemas/experience.schema.json"
    },
    {
      "fileMatch": ["src/data/education.json"],
      "url": "./schemas/education.schema.json"
    },
    {
      "fileMatch": ["src/data/skills.json"],
      "url": "./schemas/skills.schema.json"
    },
    {
      "fileMatch": ["src/data/achievements.json"],
      "url": "./schemas/achievements.schema.json"
    }
  ]
}
```

## Common Patterns

### Date Format

Dates use the format `MM/YYYY` or `YYYY`:

```json
"startDate": "09/2020",
"endDate": "12/2023"
```

For current positions/education, use `null`:

```json
"startDate": "01/2024",
"endDate": null
```

### Named Objects

Companies and institutions use a consistent structure:

```json
{
  "name": "Company Name",
  "url": "https://www.company.com/"
}
```

## Link Placeholder System

The CV uses a **template system** for embedding links within text content. This preserves formatting while keeping data structured.

### How It Works

1. **In your JSON content**, wrap link text in curly braces `{...}`:

```json
"content": "Won 1st place at {AI Hackathon 2023} organized by {Tech Corp}"
```

2. **Define links** in a `links` object with matching keys:

```json
"links": {
  "AI Hackathon 2023": {
    "url": "https://example.com/hackathon",
    "className": "colorHighlight"
  },
  "Tech Corp": {
    "url": "https://techcorp.com",
    "className": ""
  }
}
```

3. **At render time**, placeholders are replaced with anchor tags:

```html
Won 1st place at <a href="https://example.com/hackathon" class="colorHighlight">AI Hackathon 2023</a> organized by <a href="https://techcorp.com">Tech Corp</a>
```

### Link ClassName

The `className` field controls link styling:

- `"colorHighlight"` - Applies accent color (for important links)
- `""` (empty string) - Default link styling

## HTML Support

Content strings support basic HTML tags for formatting:

| Tag | Usage | Example |
|-----|-------|---------|
| `<i>` | Italics | `"<i>Research Project:</i> Machine Learning"` |
| `<b>` | Bold | `"GPA: <b>3.9/4.0</b>"` |
| `<sup>` | Superscript | `"Ranked 1<sup>st</sup> place"` |

**Important:** HTML is rendered using `dangerouslySetInnerHTML`. Only use trusted HTML from your own data files.

## Detailed Schema Reference

### Header Schema

**File:** `src/data/header.json`
**Schema:** `schemas/header.schema.json`

Contains personal information displayed in the page header.

```json
{
  "name": "John Doe",
  "title": "Senior Software Engineer",
  "documentTitle": "John Doe ▸ CV",
  "contact": {
    "phone": "+1 555 123 4567",
    "email": "john.doe@example.com",
    "github": {
      "url": "https://github.com/johndoe",
      "label": "github/johndoe"
    },
    "linkedin": {
      "url": "https://www.linkedin.com/in/johndoe/",
      "label": "linkedin/johndoe"
    }
  }
}
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name displayed in large header text |
| `title` | string | ✅ | Professional title or role |
| `documentTitle` | string | ✅ | Browser tab title (often includes name + "CV") |
| `contact` | object | ✅ | Contact information object |
| `contact.phone` | string | ✅ | Phone number with country code |
| `contact.email` | string | ✅ | Email address (validated as email format) |
| `contact.github` | object | ✅ | GitHub profile information |
| `contact.github.url` | string | ✅ | GitHub profile URL |
| `contact.github.label` | string | ✅ | Display text for GitHub link |
| `contact.linkedin` | object | ✅ | LinkedIn profile information |
| `contact.linkedin.url` | string | ✅ | LinkedIn profile URL |
| `contact.linkedin.label` | string | ✅ | Display text for LinkedIn link |

---

### Experience Schema

**File:** `src/data/experience.json`
**Schema:** `schemas/experience.schema.json`

An array of work experience entries, ordered chronologically (most recent first).

```json
[
  {
    "company": {
      "name": "Tech Company",
      "url": "https://www.techcompany.com/"
    },
    "location": "San Francisco, United States",
    "position": "Senior Software Engineer",
    "startDate": "01/2020",
    "endDate": "12/2023",
    "responsibilities": [
      "Built scalable backend APIs using {Node.js} and TypeScript",
      "Led a team of 5 engineers on {Project Alpha}"
    ],
    "links": {
      "Node.js": {
        "url": "https://nodejs.org/",
        "className": "colorHighlight"
      },
      "Project Alpha": {
        "url": "https://example.com/project-alpha",
        "className": ""
      }
    }
  }
]
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company` | object | ✅ | Company information |
| `company.name` | string | ✅ | Company name |
| `company.url` | string | ✅ | Company website URL |
| `location` | string | ✅ | Work location (city, country, or "Remote") |
| `position` | string | ✅ | Job title or role |
| `startDate` | string | ✅ | Start date (MM/YYYY or YYYY format) |
| `endDate` | string/null | ❌ | End date or null for current position |
| `responsibilities` | array | ✅ | List of responsibilities or achievements |
| `links` | object | ❌ | Link definitions for placeholders in responsibilities |

#### Responsibility Types

Responsibilities can be either **simple strings** or **complex objects**:

**Simple (most common):**
```json
"Developed backend services using Python and Django"
```

**Complex (for nested bullet points):**
```json
{
  "type": "complex",
  "content": "Led multiple machine learning initiatives:",
  "subItems": [
    "Predictive maintenance using LSTM networks",
    "Customer segmentation with clustering algorithms"
  ]
}
```

---

### Education Schema

**File:** `src/data/education.json`
**Schema:** `schemas/education.schema.json`

An array of education entries, ordered chronologically (most recent first).

```json
[
  {
    "institution": {
      "name": "Stanford University",
      "url": "https://www.stanford.edu/"
    },
    "location": "California, United States",
    "degree": "Master of Science, Computer Science",
    "startDate": "2018",
    "endDate": "2020",
    "achievements": [
      "GPA: 3.9/4.0",
      "Teaching Assistant for {CS 229: Machine Learning}"
    ],
    "links": {
      "CS 229: Machine Learning": {
        "url": "http://cs229.stanford.edu/",
        "className": ""
      }
    },
    "relevantCourses": [
      "CS 231n: Deep Learning for Computer Vision",
      "CS 224n: Natural Language Processing"
    ]
  }
]
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `institution` | object | ✅ | Educational institution |
| `institution.name` | string | ✅ | Institution name |
| `institution.url` | string | ✅ | Institution website URL |
| `location` | string | ✅ | Institution location |
| `degree` | string | ❌ | Degree type and field (e.g., "Bachelor of Science, Computer Science") |
| `program` | object | ❌ | Alternative to degree for workshops/summer schools |
| `program.name` | string | ✅* | Program name (*required if program is used) |
| `program.url` | string | ✅* | Program URL (*required if program is used) |
| `startDate` | string | ❌ | Start date (MM/YYYY or YYYY) |
| `endDate` | string | ❌ | End date (MM/YYYY or YYYY) |
| `achievements` | array | ❌ | Academic achievements, honors, or activities |
| `links` | object | ❌ | Link definitions for placeholders in achievements |
| `relevantCourses` | array | ❌ | List of relevant courses (displayed in smaller text) |

**Note:** Either `degree` or `program` should be provided, but not necessarily both.

#### Achievement Types

Similar to responsibilities, achievements can be **simple** or **complex**:

**Simple:**
```json
"Dean's Honor List - GPA: 3.8/4.0"
```

**Complex (for research projects with multiple sub-items):**
```json
{
  "type": "complex",
  "content": "Research Projects:",
  "subItems": [
    {
      "content": "<i>Project A:</i> Deep learning for medical imaging"
    },
    {
      "content": "<i>Project B:</i> Natural language processing for sentiment analysis"
    }
  ]
}
```

---

### Skills Schema

**File:** `src/data/skills.json`
**Schema:** `schemas/skills.schema.json`

An array of skill categories, each containing a list of skills.

```json
[
  {
    "category": "front-end",
    "skills": [
      "React.js",
      "Vue.js",
      "TypeScript",
      "HTML5, CSS3"
    ]
  },
  {
    "category": "back-end",
    "skills": [
      "Node.js",
      "Python; Django, Flask",
      "MongoDB, PostgreSQL"
    ]
  }
]
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | ✅ | Skill category name (e.g., "front-end", "machine learning") |
| `skills` | array | ✅ | Array of skill strings |

#### Skill String Format

Skills can be simple or grouped:

- **Simple:** `"React.js"`
- **Grouped (semicolon):** `"Python; Django, Flask, FastAPI"` - Primary skill followed by related frameworks
- **Grouped (comma):** `"HTML5, CSS3, Sass"` - Related skills at the same level

---

### Achievements Schema

**File:** `src/data/achievements.json`
**Schema:** `schemas/achievements.schema.json`

An array of extracurricular activities, awards, interests, and languages.

```json
[
  {
    "type": "achievement",
    "content": "Won 1<sup>st</sup> place at {Tech Hackathon 2023}",
    "links": {
      "Tech Hackathon 2023": {
        "url": "https://example.com/hackathon",
        "className": "colorHighlight"
      }
    }
  },
  {
    "type": "interests",
    "content": "Running, cooking, playing guitar, developing video games"
  },
  {
    "type": "languages",
    "content": "Languages: English (Native), Spanish (Fluent), French (Intermediate)"
  }
]
```

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | Entry type: "achievement", "community", "interests", or "languages" |
| `content` | string | ✅ | Achievement content (supports HTML and link placeholders) |
| `links` | object | ❌ | Link definitions for placeholders in content |

#### Type Categories

- **achievement** - Awards, competitions, rankings
- **community** - Community involvement, volunteer work, organizations
- **interests** - Hobbies and personal interests
- **languages** - Language proficiencies

---

## Validation

To validate your JSON files against the schemas, you can use tools like:

- **VS Code** - Built-in JSON schema validation with IntelliSense
- **ajv-cli** - Command-line JSON Schema validator:
  ```bash
  npm install -g ajv-cli
  ajv validate -s schemas/header.schema.json -d src/data/header.json
  ```
- **Online validators** - [JSONSchemaLint](https://jsonschemalint.com/)

## Tips for Editing

1. **Start with existing data** - Use the current JSON files as templates
2. **Validate frequently** - Use schema validation in your editor
3. **Test links** - Ensure all URLs are valid and accessible
4. **Keep it concise** - CV content should be scannable and brief
5. **Use HTML sparingly** - Only for necessary formatting like italics or superscripts
6. **Maintain consistency** - Follow the same patterns across entries

## Troubleshooting

**Links not appearing:**
- Ensure placeholder text `{...}` exactly matches the key in `links` object
- Check that the `links` object is at the same level as the content

**Validation errors:**
- Check required fields are present
- Verify date formats match `MM/YYYY` or `YYYY`
- Ensure URLs are properly formatted with protocol (https://)

**HTML not rendering:**
- Remember only `<i>`, `<b>`, and `<sup>` tags are commonly used
- Close all HTML tags properly
- Escape special characters if needed

---

## Further Reading

- [JSON Schema Specification](https://json-schema.org/)
- [JSON Schema Draft-07](https://json-schema.org/draft-07/schema)
- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
