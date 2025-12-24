import React from "react";
import { List } from "semantic-ui-react";

const SectionItem = ({ companyTitle, location, jobTitle, startDate, endDate, description, items, relevantItems }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
      className="noPageBreak"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className={"px16"} style={{ marginRight: "10px" }}>
          <span style={{ fontWeight: 500 }}>{companyTitle}</span>
        </div>
        <div className={"px16"}>
          <span style={{ fontWeight: 500 }}>{location}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className={"px14"} style={{ marginRight: "10px" }}>
          <em>{jobTitle}</em>
        </div>
        <div className={"px14"}>
          {startDate ? [startDate, " – "] : null}
          {endDate || "Present"}
        </div>
      </div>
      {description && (
        <div className={"px12"}>{description}</div>
      )}
      {items ? (
        <List
          bulleted
          style={{
            paddingLeft: "2em",
            marginTop: "10px",
            marginBottom: "0px",
          }}
        >
          {items.map((item, ix) => {
            return (
              <List.Item key={ix} className={"px12"}>
                {item}
              </List.Item>
            );
          })}
        </List>
      ) : null}
      {relevantItems ? (
        <div style={{ marginTop: "5px" }}>
          <div
            className={"px10"}
            style={{
              paddingLeft: "6em",
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            <strong>Relevant Courses</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {relevantItems.map((item, ix) => {
                return (
                  <div
                    key={ix}
                    style={{
                      flex: "1 0 50%",
                    }}
                  >
                    {"•"}&nbsp;&nbsp;
                    {item}
                    {ix + 1 < relevantItems.length ? (
                      <span>&nbsp;&nbsp;</span>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SectionItem;
