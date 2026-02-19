import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";
import SectionToggle from "../components/SectionToggle";
import { TAGS } from "../constants/tags";
import { useCVContext } from "../context/CVContext";
import educationData from "../data/education.json";
import { processEducationData } from "../utils/filterData";
import { renderInstitutionTitle, renderEducationItems, renderJobTitle } from "../utils/educationRenderer";

function Education() {
  const { state } = useCVContext();
  const data = processEducationData(educationData, state);

  return (
    <div>
      <SectionTitle title={"EDUCATION"}>
        <SectionToggle tag={TAGS.COURSEWORK} label="courses" />
      </SectionTitle>
      {data.map((education, index) => {
        return (
          <SectionItem
            key={index}
            companyTitle={renderInstitutionTitle(education.institution, education.program)}
            location={education.location}
            jobTitle={renderJobTitle(education)}
            startDate={education.startDate}
            endDate={education.endDate}
            items={renderEducationItems(education)}
            relevantItems={education.relevantCourses}
          />
        );
      })}
    </div>
  );
}

export default Education;
