import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";
import { useCVContext } from "../context/CVContext";
import experienceData from "../data/experience.json";
import { processData } from "../utils/filterData";
import { renderCompanyTitle, renderResponsibility } from "../utils/experienceRenderer";

function Experience() {
  const { state } = useCVContext();
  const data = processData(experienceData, state);

  return (
    <div>
      <SectionTitle title={"EXPERIENCE"} />
      {data.map((experience, index) => {
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

export default Experience;
