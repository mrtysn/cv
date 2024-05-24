import React from "react";
import { Grid, List } from "semantic-ui-react";

export class SkillRow extends React.Component {
  render() {
    return (
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column
          style={{ fontWeight: 700 }}
          width={this.props.titleColumnWidth}
          textAlign="right"
          className={"colorSkillTitle"}
          id={this.props.isNarrow ? "narrowSkillTitle" : ""}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
              height: "100%",
            }}
          >
            {this.props.title}
          </div>
        </Grid.Column>
        <Grid.Column width={this.props.dataColumnWidth}>
          {this.props.items ? (
            <List horizontal>
              {this.props.items.map((item, ix) => {
                return (
                  <List.Item
                    key={ix}
                    className={"px12"}
                    style={{ marginLeft: "0px" }}
                  >
                    {"•"}&nbsp;&nbsp;
                    {item}
                    {ix + 1 < this.props.items.length ? (
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    ) : (
                      ""
                    )}
                  </List.Item>
                );
              })}
            </List>
          ) : null}
        </Grid.Column>
      </Grid.Row>
    );
  }
}
