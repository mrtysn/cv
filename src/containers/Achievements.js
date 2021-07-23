import React from "react";
import { List } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";

const items = [
  "Treasure hunting, running, cycling, swimming, cooking, playing the guitar, playing video games, learning to learn, learning",
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

  <span>
    University of Waterloo – Fermat, Hypatia, and Senior{" "}
    <a
      href="https://www.cemc.uwaterloo.ca/contests/past_contests.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      math contests
    </a>{" "}
    – two medals and several honor rolls – 2011 & 2012
  </span>,
  <span>
    American Mathematics Competition{" "}
    <a
      href="https://artofproblemsolving.com/wiki/index.php/AMC_12_Problems_and_Solutions"
      target="_blank"
      rel="noopener noreferrer"
    >
      AMC12B
    </a>{" "}
    – 2011 & 2012 participant
  </span>,
  <span>
    Team captain of İzmir Gelişim College’s 1<sup>st</sup> and 2<sup>nd</sup>{" "}
    Mathematics League winning team – 2011 & 2012
  </span>,
  <span>
    Represented Slovenia in the Social Humanitarian and Cultural Committee
    (SOCHUM) of{" "}
    <a href="https://www.hnmun.org/" target="_blank" rel="noopener noreferrer">
      Harvard National Model United Nations (HNMUN)
    </a>{" "}
    – 2011
  </span>,
];

class Achievements extends React.Component {
  render() {
    if (items && items.length > 0) {
      return (
        <div>
          <SectionTitle title={"ACHIEVEMENTS & HOBBIES"} />
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
