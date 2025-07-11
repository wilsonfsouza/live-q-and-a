<p align="center">
   <img alt="License" src="https://img.shields.io/badge/license-MIT-%23F26C6C">

  <a href="https://www.linkedin.com/in/wilsonfsouza/">
    <img alt="Made by Wilson Franca" src="https://img.shields.io/badge/made%20by-Wilson%20Franca-%230AA186">
  </a>
</p>

<h1 align="center">
    Live Streamming Q&A
</h1>

<h4 align="center">
  Table of contents
</h4>

<p align="center">
 <a href="#-about-the-project">About</a> •
 <a href="#-preview">Preview</a> •
 <a href="#user-content-️-features">Features</a> •
 <a href="#-technologies">Technologies</a> •
 <a href="#-getting-started">Getting Started</a> •
 <a href="#-author">Author</a> •
 <a href="#user-content--license">License</a>
</p>

## 💻 About the project

This is the web application for a live streamming tool boosted by an AI agent that uses semantic search to predict and suggest answers in real time based on the audio trasnscription of the live stream.

To see the REST API, click here: [REST API](https://github.com/wilsonfsouza/live-stream-agent)

## 🔥 Preview

> In progress

## ⚙️ Features

- Users can create a room for a live stream and post questions in there.
- Streammer must start recording.
  Recorded audio will be broke down into chunks of 5s of text to be stored in the database by the REST API.
- Gemini AI will transcribe audio into text, generate vector embeddings, and generate answers to users' questions based on the content of the audio.

## 🛠 Technologies

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI & Shadcn UI
- **Icons:** Lucide React
- **Forms:** React Hook Form & Zod
- **Routing:** React Router
- **Data Fetching:** TanStack React Query
- **Code Quality:** Biome
- **Audio Recording:** DOM API

## 🚀 Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally for preview.

## 💪 How to contribute to this project

1. **Fork** the project.
2. Start a new branch with your changes: `git checkout -b my-new-feature`
3. Save it and create a commit message describing what you have done: `git commit -m "feature: My new feature"`
4. Send your alterations: `git push origin my-feature`

## 👨‍💻 Author

<br/>
<h3 style="display: flex; align-items: center; justify-content: flex-start;">
 <img style="border-radius: 50%; margin-right: 20px; width: 80px;" src="https://avatars0.githubusercontent.com/u/21347383?s=460&u=fdb399c92e369762d45d6495cbd2e87eef9e4d65&v=4" width="100px;" alt=""/>
 <br />
 <sub>Wilson Franca</sub></h3>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Wilson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/wilsonfsouza/)](https://www.linkedin.com/in/wilsonfsouza/)
[![Gmail Badge](https://img.shields.io/badge/-wilson.franca.92@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:wilson.franca.92@gmail.com)](mailto:wilson.franca.92@gmail.com)

## 📝 License

This project is being developed under [MIT License](./LICENSE).

Made with ❤️ by Wilson Franca 👋
