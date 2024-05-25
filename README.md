### 📝 CV

- A CV template from Mert Yaşin designed from scratch using Semantic UI and React

### 🔗 Online Demo

- Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/)

  [![CV Preview](cv-preview.gif)](https://mrtysn.github.io/cv/)

### 💻 How to run locally

On the root folder of the project, run

- `pnpm run start`

### 🛠️ How to deploy to GitHub Pages

On the root folder of the project, run

- `pnpm run predeploy`
- `pnpm run deploy`

### 🖨️ How to create a PDF

- 👨‍💻 If you are working on a local copy

  - Run `pnpm run start`
  - Visit [localhost:3000](http://localhost:3000) (where the app is running)

- 🌐 If you already deployed

  - Visit [mrtysn.github.io/cv](https://mrtysn.github.io/cv/) (where you deployed it)

- Open the print dialog by hitting `ctrl + P`
  - Set margins to custom. Set the top padding to `0.19 inches` inches and the rest to `0 inches`. This is (unfortunately) necessary to get the text to align properly while dealing with CSS and the browser print dialog
  - 📃 Set `A4` as the page size
  - 🎨 Enable `background graphics` so you get that nice accent color
  - 🖨️ Save as PDF
  - 📤 Remember to properly _rename the document_ before sending it out!
