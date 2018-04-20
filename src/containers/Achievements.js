import React from 'react';
import CVSectionTitle from "../components/SectionTitle";
import {List} from "semantic-ui-react";

const items = [
    "Represented Slovenia in the Social Humanitarian and Cultural Committee (SOCHUM) of Harvard Model United Nations (HMUN) – 2011",
    "TOEFL; Reading: 28, Listening: 28, Speaking: 24, Writing: 27 – 04/2018",
    "GRE; Quantitative Reasoning: 168, Verbal Reasoning: 146, Analytical Writing: 3.0 – 10/2015",
    "TOEFL; Reading: 26, Listening: 30, Speaking: 26, Writing: 26 – 10/2015",
    "University of Waterloo – Fermat, Hypatia, and Senior mathematics contests – medal and honor roll – 2011 & 2012",
    "American Mathematics Contest – AMC12B – 2011 & 2012",
    <span>
        İzmir Gelişim College’s 1
        <sup>st</sup> and 2
        <sup>nd</sup> Mathematics Leagues – 1
        <sup>st</sup> place for two consecutive years as team captain (2011, 2012)
    </span>,
];

class Achievements extends React.Component {
    render() {
        if (items && items.length > 0) {
            return (
                <div>
                    <CVSectionTitle title={'ACHIEVEMENTS'}/>
                    <List bulleted>
                        {items.map((item, ix) => {
                            return <List.Item key={ix} style={{fontSize: "15px"}}>
                                {item}
                            </List.Item>
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