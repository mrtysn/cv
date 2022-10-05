import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";

export default function MyHeader() {
  useEffect(() => {
    document.title = "Mert Yaşin ▸ CV";
  });

  return (
    <div>
      <Header as="h1" className="fontHeader">
        Mert Yaşin
      </Header>
      <div style={{ textAlign: "center" }} className="px14">
        Computer Science PhD Candidate &nbsp;&nbsp;{"•"}&nbsp;&nbsp; Senior
        Computer Engineer
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          letterSpacing: "0.33px",
          flexWrap: "wrap",
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
