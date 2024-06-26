import React from "react";
import { List } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";

const items = [
  <span>
    <a
      href="https://twitter.com/mertyas_in/status/1479888082598084613"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ranked 1<sup>st</sup>
    </a>{" "}
    at{" "}
    <a href="https://inzva.com/" target="_blank" rel="noopener noreferrer">
      inzva
    </a>
    's{" "}
    <a
      href="https://inzva.com/reports/2022/ai-projects-7"
      target="_blank"
      rel="noopener noreferrer"
    >
      AI Projects #7
    </a>{" "}
    with the project{" "}
    <a
      href="https://github.com/inzva/procedural-pattern-generation"
      target="_blank"
      rel="noopener noreferrer"
    >
      Deep Learning for Procedural Pattern Generation
    </a>{" "}
    – 01/2022
  </span>,
  <span>
    Co-founded the volunteer alumni community, Boğaziçi University International
    Community{" "}
    <a
      href="https://web.archive.org/web/20231005025306/https://boyutbogazici.org/en/about-boyut-2/"
      target="_blank"
      rel="noopener noreferrer"
    >
      (BOYUT)
    </a>{" "}
    – 01/2021
  </span>,
  <span>
    Running, cooking, cycling, swimming, playing guitar, playing video games,
    developing video games, <i>learning to learn</i>
  </span>,
  "Languages: Turkish (Native), English (Fluent), Macedonian (Pre-Intermediate), Dutch (Beginner)",
];

class Achievements extends React.Component {
  render() {
    if (items && items.length > 0) {
      return (
        <div>
          <SectionTitle title={"EXTRACURRICULAR"} />
          <List bulleted>
            {items.map((item, ix) => {
              return (
                <List.Item key={ix} className={"px12"}>
                  {item}
                </List.Item>
              );
            })}
          </List>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Achievements;
