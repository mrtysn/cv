import React from "react";
import { List } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";
import { useCVContext } from "../context/CVContext";
import { processData } from "../utils/filterData";
import achievementsData from "../data/achievements.json";

const renderContent = (item) => {
  if (!item.links) {
    return <span dangerouslySetInnerHTML={{ __html: item.content }} />;
  }

  let content = item.content;

  Object.entries(item.links).forEach(([linkText, linkData]) => {
    const classNameAttr = linkData.className && linkData.className.trim() ? ` class="${linkData.className}"` : '';
    const linkElement = `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer"${classNameAttr}>${linkText}</a>`;
    content = content.replace(`{${linkText}}`, linkElement);
  });

  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

const Achievements = () => {
  const { state } = useCVContext();
  const data = processData(achievementsData, state);

  if (data && data.length > 0) {
    return (
      <div>
        <SectionTitle title={"EXTRACURRICULAR"} />
        <List bulleted>
          {data.map((item, ix) => {
            return (
              <List.Item key={ix} className={"px12"}>
                {renderContent(item)}
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  } else {
    return null;
  }
};

export default Achievements;
