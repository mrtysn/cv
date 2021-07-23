import React from "react";
import { Header } from "semantic-ui-react";

class MyHeader extends React.Component {
  render() {
    return (
      <div>
        <Header
          as="h1"
          style={{ marginTop: 0 }}
          className="fontHeader textShadowCorner"
        >
          Mert Yaşin
        </Header>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            letterSpacing: "0.33px",
          }}
          className={"px12"}
        >
          <span>+90 538 470 03 93</span>
          &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
          <span>+1 312 934 6883</span>
          &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
          <a
            href="mailto:mert.yasin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={"colorHighlight"}
          >
            mert.yasin@gmail.com
          </a>
          &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
          <a
            href="https://github.com/mrtysn"
            target="_blank"
            rel="noopener noreferrer"
            className={"colorHighlight"}
          >
            github.com/mrtysn
          </a>
          &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
          <a
            href="https://www.linkedin.com/in/mert-yasin/"
            target="_blank"
            rel="noopener noreferrer"
            className={"colorHighlight"}
          >
            LinkedIn
          </a>
        </div>
      </div>
    );
  }
}

export default MyHeader;
