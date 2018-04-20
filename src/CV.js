import React from "react";
import CVHeader from "./containers/CVHeader";
import Experience from "./containers/Experience";
import Education from "./containers/Education";
import Skills from "./containers/Skills";
import Achievements from "./containers/Achievements";
import {Container} from "semantic-ui-react";

class CV extends React.Component {

    render() {
        return (
            <Container text>
                <CVHeader/>
                <Skills/>
                <Experience/>
                <Education/>
                <Achievements/>
            </Container>
        );
    }
}

export default CV;