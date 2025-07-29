import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";
import headerData from "../data/header.json";

export default function MyHeader() {
  useEffect(() => {
    document.title = headerData.documentTitle;
  });

  return (
    <div>
      <Header as="h1" className="fontHeader">
        {headerData.name}
      </Header>
      <div style={{ textAlign: "center" }} className="px14">
        {headerData.title}
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
        <span>{headerData.contact.phone}</span>
        &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
        <a
          href={`mailto:${headerData.contact.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className={"colorHighlight"}
        >
          {headerData.contact.email}
        </a>
        &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
        <a
          href={headerData.contact.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className={"colorHighlight"}
        >
          {headerData.contact.github.label}
        </a>
        &nbsp;&nbsp;{"•"}&nbsp;&nbsp;
        <a
          href={headerData.contact.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className={"colorHighlight"}
        >
          {headerData.contact.linkedin.label}
        </a>
      </div>
    </div>
  );
}
