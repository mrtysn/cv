import React from "react";
import { Divider, Header } from "semantic-ui-react";

const SectionTitle = ({ title, children }) => {
  return (
    <div>
      <Header
        as="h2"
        style={{ marginTop: "1em", marginBottom: 0 }}
        className={"fontSectionHeader colorSectionItem"}
      >
        {title}
        {children}
      </Header>
      <Divider style={{ marginTop: 0, marginBottom: 0 }} />
    </div>
  );
};

export default SectionTitle;
