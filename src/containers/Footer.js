import React from "react";
import { CV_VERSION, DATE } from "../constants";

class Footer extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
        className={"px10"}
      >
        <span>
          Made with <span style={{ color: "#DA0037" }}>❤</span> in İstanbul,
          Turkey ▸ Powered by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://react.semantic-ui.com/"
          >
            Semantic UI
          </a>
          {" & "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://reactjs.org/"
          >
            React
          </a>{" "}
          ▸ {CV_VERSION} ▸ {DATE}
        </span>
      </div>
    );
  }
}

export default Footer;
