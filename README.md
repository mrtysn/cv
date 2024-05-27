### 📝 Curriculum Vitae (CV) Template

A minimalistic CV / Resume template for academic and professional use, designed with React and Semantic UI by Mert Yaşin

### 🔗 GitHub Pages Demo

- Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/)

  [![CV Preview](cv-preview.gif)](https://mrtysn.github.io/cv/)

### Documentation

- [💻 How to Run Locally](#-how-to-run-locally)
- [🛠️ How to Deploy to GitHub Pages](#%EF%B8%8F-how-to-deploy-to-github-pages)
- [🖨️ How to Create a PDF](#%EF%B8%8F-how-to-create-a-pdf)
- [🎨 How to Customize the CV for yourself](#-how-to-customize-the-cv-for-yourself)
- [🐌 Does a CV Need to be a Bloated Web Application?](#-does-a-cv-need-to-be-a-bloated-web-application)
- [🙌 How to Contribute](#-how-to-contribute)

### Documentation

- [💻 How to Run Locally](#run)
- [🛠️ How to Deploy to GitHub Pages](#deploy)
- [🖨️ How to Create a PDF](#create-pdf)
- [🎨 How to Customize the CV for yourself ZERO](#customize0)
- [🎨 How to Customize the CV for yourself](#customize)
- [🐌 Does a CV Need to be a Bloated Web Application?](#why)
- [🙌 How to Contribute](#contribute)

### 💻 How to Run Locally

## <a name="run"></a>

On the root folder of the project, run:

- `pnpm install`
- `pnpm run start`
- Visit [localhost:3000](http://localhost:3000)

### 🛠️ How to Deploy to GitHub Pages

## <a name="deploy"></a>

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

### 🖨️ How to Create a PDF

## <a name="create-pdf"></a>

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

## <a name="customize0"></a>

### 🎨 How to Customize the CV for yourself

## <a name="customize"></a>

- ⤴️ Fork the repository to your own account.

- 📖 _Read it_, seriously. Go to `App.js` and see the main structure in the React code:

  - **Header** - name, title and contact info
  - **Experience** - jobs, internships, contracts
  - **Education** - schools, courses, theses
  - **Skills** - optional, group your know-how by categories
  - **Achievements** - extracurricular activities
  - **Footer** - optional, author attribution and links. Keep it if you want to support me

- ✂️ Start replacing the **in-line** content with your own. Learning what to put where might take some time as this project is not completely modular at the moment. There isn't a `json` file to edit to replace all the contents (yet).
- ⌨️ With that said, there are only a few main React components you would be working with. They accept the following props:
  - `SectionItem` (Used both in Education and Experience)
    - Company Title
    - Location
    - Job Title
    - Start Date
    - End Date (optional)
    - Description (optional, short paragraph)
    - Items (optional, main bullet points, I prefer this over description)
    - Relevant Items (optional, smaller bullet points mainly for listing classes)
  - `SkillRow` (Used in Skills)
    - Title (e.g. game development)
    - Items (e.g. godot, unity3d, unreal)
  - `Achievements` (Extracurricular)
    - Items (e.g. hobbies, awards, certificates)
- Once you are familiarized with the structure of the repository, copy pasting from your existing CV (probably a docx) and editing the code should be easier. The fastest way to edit would be searching throughout the code for the text you would like to replace.

- You have complete control of the layout. I found text editors to be insufficient for my margin and padding needs, that's why I built this. ✨ Style as you wish ✨, or keep it as it is.
- Most of the styling is handled by `Semantic UI` and `App.css`. However, you'll find custom in-line stylings and one-off CSS classes in the code. _CSS in code_ is not ideal, but it's sometimes the fastest to iterate with.
- If your styling changes fail due to a conflict with `Semantic UI`, the `!important` flag is (sometimes) your friend.
- Don't forget to update the `homepage` URL in `package.json` with your GitHub username if you want to deploy this web application to `GitHub Pages`.
- Check the `constants.js` file if you are using the `Footer` component, to properly date and version your CV. Remember this will be an always-updating document throughout your career and it's very useful to keep everything in check.
- _Tip:_ You can maintain multiple versions of your CV for different job titles through separate git branches. Versioning also helps keep track of your applications since you would know which variant you applied with.

### 🐌 Does a CV Need to be a Bloated Web Application?

## <a name="why"></a>

No, it doesn't. What could be a simple document is transformed into a much larger package with this project. However, after finalizing your resume, there are ways to minimize the end result:

- You can render the React application into static `HTML`. This minified version (around 50-300KB) can be deployed on the web or used as a document.
- You can save the webpage as a `PDF`, which can be further compressed using mainstream PDF editor tools, reducing it from around 1MB to 700KB.

For individuals versed in web development, this serves as an intuitive method to efficiently generate, update, and distribute a CV.

### 🙌 How to Contribute

## <a name="contribute"></a>

First of all, how kind of you 🤗

You can

- 💯 Make suggestions and report problems through GitHub issues
- ↩️ Send pull requests via GitHub
- ⭐ Star this project on GitHub

You might

- 🗣️ Tell your friends and co-workers about your new CV
- 💭 Talk about this CV/resume template on social media

You are welcome to

- 📧 Mail me through [mert.yasin@gmail.com](mailto:mert.yasin@gmail.com)
- ♟️ Follow me on [github/mrtysn](https://github.com/mrtysn)
- 🐦 Follow me on [twitter/mertyas_in](https://twitter.com/mertyas_in)
- 🆗 Add me on [linkedin/mert-yasin](linkedin.com/in/mert-yasin/)
