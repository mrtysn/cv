import React from "react";
import { Grid } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";
import { SkillRow } from "../components/SkillRow";
import { useCVContext } from "../context/CVContext";
import useWindowSize from "../utils/useWindowSize";
import { processData } from "../utils/filterData";
import skillsData from "../data/skills.json";

function Skills() {
  const { state } = useCVContext();
  const data = processData(skillsData, state);
  const isNarrow = useWindowSize().width < 450;
  const titleColumnWidth = 3;
  const dataColumnWidth = 13;
  const className = "px12";

  return (
    <div>
      <SectionTitle title={"SKILLS"} />
      <Grid
        columns={2}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        className={className}
        stackable={isNarrow}
      >
        {data.map((skillCategory, index) => (
          <SkillRow
            key={index}
            titleColumnWidth={titleColumnWidth}
            dataColumnWidth={dataColumnWidth}
            title={skillCategory.category}
            items={skillCategory.skills}
            isNarrow={isNarrow}
          />
        ))}
      </Grid>
    </div>
  );
}

export default Skills;
