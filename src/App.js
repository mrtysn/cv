import React from "react";
import { Container, Divider } from "semantic-ui-react";
import "./App.css";
import { CVProvider } from "./context/CVContext";
import Achievements from "./containers/Achievements";
import Education from "./containers/Education";
import Experience from "./containers/Experience";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import Skills from "./containers/Skills";
import PdfDownloadButton from "./components/PdfDownloadButton";
import GitHubLinkButton from "./components/GitHubLinkButton";
import ModeToggle from "./components/ModeToggle";

function App() {
  return (
    <CVProvider>
      <Container text>
        <PdfDownloadButton />
        <GitHubLinkButton />
        <Divider hidden style={{ marginTop: 10 }} className="hideFromPrint" />
        <Header />
        <ModeToggle />
        <Experience />
        <Education />
        <Skills />
        <Achievements />
        <Footer />
        <Divider hidden style={{ marginTop: 10 }} className="hideFromPrint" />
      </Container>
    </CVProvider>
  );
}

export default App;
