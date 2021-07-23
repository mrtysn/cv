import React from "react";
import { List } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";

const items = [
  <span>
    Treasure hunting, running, cycling, swimming, cooking, playing the guitar,
    playing video games, <i>learning to learn</i>
  </span>,
  <span>
    Co-founded the volunteer alumni community{" "}
    <a
      href="https://boyutbogazici.org/en/about-boyut-2/"
      target="_blank"
      rel="noopener noreferrer"
    >
      BOYUT (Boğaziçi University International Community)
    </a>{" "}
    with the aim of supporting institutional autonomy and academic freedom in
    every university and particularly in Boğaziçi University – 01/2021
  </span>,
  "TOEFL; Reading: 28, Listening: 28, Speaking: 24, Writing: 27 – 04/2018",
  "TOEFL; Reading: 26, Listening: 30, Speaking: 26, Writing: 26 – 10/2015",
  "GRE; Quantitative Reasoning: 168, Verbal Reasoning: 146, Analytical Writing: 3.0 – 10/2015",
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
