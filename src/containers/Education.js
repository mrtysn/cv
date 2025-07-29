import React from "react";
import SectionItem from "../components/SectionItem";
import SectionTitle from "../components/SectionTitle";
import educationData from "../data/education.json";
import { renderInstitutionTitle, renderEducationItems, renderJobTitle } from "../utils/educationRenderer";

class Education extends React.Component {
  render() {
    return (
      <div>
        <SectionTitle title={"EDUCATION"} />
        {educationData.map((education, index) => {
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
}

export default Education;