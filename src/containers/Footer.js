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
          Designed and developed by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mrtysn.github.io/cv/"
          >
            Mert Yaşin
          </a>{" "}
          ▸ Made with <span className="colorHeart">❤</span> in İstanbul, Turkey{" "}
        </span>
        <span>
          Powered by{" "}
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
          ▸ {CV_VERSION} ▸ {DATE} ▸{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mrtysn/cv"
          >
            source
          </a>
        </span>
      </div>
    );
  }
}

export default Footer;
