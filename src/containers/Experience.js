import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";
import experienceData from "../data/experience.json";
import { renderCompanyTitle, renderResponsibility } from "../utils/experienceRenderer";

class Experience extends React.Component {
  render() {
    return (
      <div>
        <SectionTitle title={"EXPERIENCE"} />
        {experienceData.map((experience, index) => {
          const items = experience.responsibilities.map((responsibility, idx) =>
            renderResponsibility(responsibility, experience.links || {})
          );

          return (
            <SectionItem
              key={index}
              companyTitle={renderCompanyTitle(experience.company)}
              location={experience.location}
              jobTitle={experience.position}
              startDate={experience.startDate}
              endDate={experience.endDate}
              items={items}
            />
          );
        })}
      </div>
    );
  }
}

export default Experience;
