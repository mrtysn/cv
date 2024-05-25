### 📝 CV

- A coded CV template from Mert Yaşin
- Designed from scratch using Semantic UI and React

### 🔗 Online Demo

- Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/)

  [![CV Preview](cv-preview.gif)](https://mrtysn.github.io/cv/)

### 💻 How to Run Locally

On the root folder of the project, run

- `pnpm install`
- `pnpm run start`

### 🛠️ How to Deploy to GitHub Pages

On the root folder of the project, run

- `pnpm install`
- `pnpm run predeploy`
- `pnpm run deploy`

### 🖨️ How to Create a PDF

- 👨‍💻 If you are working on a local copy

  - Run `pnpm install` and `pnpm run start`
  - Visit [localhost:3000](http://localhost:3000) (where the app is running)

- 🌐 If you already deployed

  - Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/) (where you deployed it)

- Open the print dialog by hitting `ctrl + P`
  - Set margins to custom. Set the top padding to `0.19 inches` inches and the rest to `0 inches`. This is (unfortunately) necessary to get the text to align properly while dealing with CSS and the browser print dialog
  - 📃 Set `A4` as the page size
  - 🖌️ Enable `background graphics` so you get that nice accent color
  - 🖨️ Save as PDF
  - 📤 Remember to properly _rename the document_ before sending it out!

### 🎨 How to Customize the CV for _yourself_

- 🍴 Fork the repository to your own account.

- _Read it_, seriously. Go to `App.js` and see the main structure in the React code:

  - **Header** - name, title and contact info
  - **Experience** - jobs, internships, contracts
  - **Education** - schools, courses, theses
  - **Skills** - optional, group your know-how by categories
  - **Achievements** - extracurricular activities
  - **Footer** - optional, author attribution and links. Keep it if you want to support me

- Start replacing the **in-line** content with your own. Learning what to put where might take some as this project is not fully modular at the moment. There isn't a `json` file to edit to replace all the contents (yet).
- With that said, there are only a few main React components you would be working with. They accept the following props:
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
- Once you are familiarized with the structure of the repository, copy pasting from your existing CV (probably a docx) and editing the code should be easier.

- You have complete control of the layout. I found text editors to be insufficient for my margin and padding needs, that's why I built this. ✨ Style as you wish ✨, or keep it as it is.
- Most of the styling is handled by `Semantic UI` and `App.css`. However, you'll find custom in-line stylings and one-off CSS classes in the code. _CSS in code_ is not ideal, but it's sometimes the fastest to iterate with.
- If your styling changes fail due to a conflict with `Semantic UI`, the `!important` flag is (sometimes) your friend.
- Check the `constants.js` file if you are using the `Footer` component, to properly date and version your CV. Remember this will be an always-updating document throughout your career and it's very useful to keep everything in check.

### 🙌 How to Contribute

First of all, how kind of you 🤗

You can

- Raise issues and send pull requests via GitHub

You might

- Tell your friends and co-workers about your new CV
- Share about this _CV with code_ on social media

You are welcome to

- Contact me through [mert.yasin@gmail.com](mailto:mert.yasin@gmail.com)
- Follow me on [github](https://github.com/mrtysn)
- Follow me on [twitter](https://twitter.com/mertyas_in)
- Add me on [linkedin](linkedin.com/in/mert-yasin/)
