### 📝 Curriculum Vitae (CV) Template

A minimalistic CV / Resume template for academic and professional use, designed with React and Semantic UI by Mert Yaşin

##

### 🔗 GitHub Pages Demo

Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/)

[![CV Preview](cv-preview.gif)](https://mrtysn.github.io/cv/)

##

### Documentation

- [📋 Project Progress](#progress)
- [💻 How to Run Locally](#run)
- [🛠️ How to Deploy to GitHub Pages](#deploy)
- [🖨️ How to Save as a PDF](#save)
- [🎨 How to Customize the CV for yourself](#customize)
- [📊 Data Schema Documentation](DATA_SCHEMA.md)
- [🐌 Does a CV Need to be a Bloated Web Application?](#why)
- [🙌 How to Contribute](#contribute)

## <a name="progress"></a>

### 📋 Project Progress

- See the current progress at the [kanban board](https://github.com/users/mrtysn/projects/2) of this project
- Browse the [open issues](https://github.com/mrtysn/cv/issues) on GitHub

## <a name="run"></a>

### 💻 How to Run Locally

On the root folder of the project, run:

- `pnpm install`
- `pnpm run start`
- Visit [localhost:3000](http://localhost:3000)

## <a name="deploy"></a>

### 🛠️ How to Deploy to GitHub Pages

Make sure your GitHub repository is properly configured for GitHub Pages:

- Set `source` to `deploy from branch`
- Set `branch` to `gh-pages`
- Set `folder` to `/ (root)`
- Update the `homepage` URL in `package.json` with your GitHub username

On the root folder of the project, run:

- `pnpm install`
- `pnpm run predeploy`
- `pnpm run deploy`
- Visit [{your-username}.github.io/cv](https://mrtysn.github.io/cv/)

## <a name="save"></a>

### 🖨️ How to Save as a PDF

- 👨‍💻 If you are working locally on your computer

  - Run `pnpm install` and `pnpm run start`
  - Visit [localhost:3000](http://localhost:3000) (where the app is running)

- 🌐 If you have already deployed to a public website

  - Visit [{your-username}.github.io/cv](https://mrtysn.github.io/cv/) (where you deployed it)

- 🖨️ Open the print dialog by hitting `ctrl/cmd + P` on your keyboard or by right clicking the web page
  - 🖊️ Set `margins` to `custom`. Manually, set the top and bottom margins to around `0.19 inches` inches and the rest to `0`. This is (unfortunately) necessary to get the text to align properly while dealing with CSS and the browser print dialog.
  - 🖌️ Disable `headers and footers`
  - 🧹 Enable `background graphics` so you get that nice accent color
  - 📃 Set `page size` to `A4`
  - 💾 Set the `destination` to `Save as PDF`, and save
  - 📤 Remember to properly _rename the document_ before sending it out!

## <a name="customize"></a>

### 🎨 How to Customize the CV for yourself

#### Quick Start

1. **Fork the repository** to your own account
2. **Edit the JSON files** in `src/data/` with your own information:
   - `header.json` - Your name, title, and contact info
   - `experience.json` - Jobs, internships, contracts
   - `education.json` - Schools, courses, degrees
   - `skills.json` - Technical skills grouped by category
   - `achievements.json` - Awards, interests, languages

3. **Read the [Data Schema Documentation](DATA_SCHEMA.md)** for detailed structure and examples

#### Understanding the Structure

The CV is **fully data-driven**. All content lives in JSON files (`src/data/`), completely separated from the React components.

**Main sections:**
- **Header** - name, title and contact info
- **Experience** - jobs, internships, contracts
- **Education** - schools, courses, theses
- **Skills** - technical skills grouped by categories
- **Achievements** - extracurricular activities, awards, interests
- **Footer** - optional, author attribution and links. Keep it if you want to support me

#### Editing Content

**All CV content is in JSON files** - no need to touch React code! Simply edit the files in `src/data/`:

```
src/data/
├── header.json         # Personal info and contact
├── experience.json     # Work history
├── education.json      # Academic background
├── skills.json         # Technical skills
└── achievements.json   # Awards and interests
```

Each JSON file has a corresponding **schema file** in `schemas/` that defines its structure and validates your data. Many editors (like VS Code) will provide autocomplete and validation automatically.

**See [DATA_SCHEMA.md](DATA_SCHEMA.md) for:**
- Complete schema reference
- Field descriptions and examples
- Link placeholder system
- HTML formatting support
- Validation setup

#### Customizing Layout & Styling

- **Styling** is handled by `Semantic UI` and `App.css`
- You'll find custom inline styles in component files for specific layout needs
- If Semantic UI conflicts occur, the `!important` CSS flag can help
- Check `constants.js` for CV version and date (used in Footer)

#### Deployment Configuration

- Update the `homepage` URL in `package.json` with your GitHub username
- See [How to Deploy to GitHub Pages](#deploy) for deployment instructions

#### Tips

- **Version control:** Use git branches to maintain different CV versions for different roles
- **Fast editing:** JSON format makes it easy to copy-paste from existing CVs
- **Validation:** Set up JSON schema validation in your editor for real-time error checking
- **Track changes:** Version your CV to remember which variant you used for each application

## <a name="why"></a>

### 🐌 Does a CV Need to be a Bloated Web Application?

No, it doesn't. What could be a simple document is transformed into a much larger package with this project. However, after finalizing your resume, there are ways to minimize the end result:

- You can render the React application into static `HTML`. This minified version (around 50-300KB) can be deployed on the web or used as a document.
- You can save the webpage as a `PDF`, which can be further compressed using mainstream PDF editor tools, reducing it from around 1MB to 700KB.

For individuals versed in web development, this serves as an intuitive method to efficiently generate, update, and distribute a CV.

## <a name="contribute"></a>

### 🙌 How to Contribute

First of all, how kind of you 🤗

You can

- ⤴️ Fork this project and create your own CV
- 💯 Make suggestions and report problems through [GitHub issues](https://github.com/mrtysn/cv/issues)
- ↩️ Send pull requests via GitHub
- ⭐ Star this project on GitHub

You might

- 🗣️ Tell your friends and co-workers about your new CV
- 💭 Talk about this CV/resume template on social media

You are welcome to

- 📧 Mail me through [mert.yasin@gmail.com](mailto:mert.yasin@gmail.com)
- ♟️ Follow me on [github/mrtysn](https://github.com/mrtysn)
- 🐦 Follow me on [twitter/mertyas_in](https://twitter.com/mertyas_in)
- 🆗 Add me on [linkedin/mert-yasin](https://linkedin.com/in/mert-yasin/)
