import React from 'react';
import {Header, List} from "semantic-ui-react";

class CVHeader extends React.Component {

    render() {
        return (
            <div>
                <Header as='h1' style={{marginTop: 0}}>MERT YAŞİN</Header>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <List bulleted horizontal>
                        <List.Item>
                            +90 538 470 03 93
                        </List.Item>
                        <List.Item>
                            <a href="mailto:mert.yasin@gmail.com" target="_blank" rel="noopener noreferrer">
                                mert.yasin@gmail.com
                            </a>
                        </List.Item>
                        <List.Item>
                            <a href="https://github.com/mrtysn" target="_blank" rel="noopener noreferrer">
                                github.com/mrtysn
                            </a>
                        </List.Item>
                        <List.Item>
                            <a href="https://www.linkedin.com/in/mert-yachine" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default CVHeader;