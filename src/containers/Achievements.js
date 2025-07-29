import React from "react";
import { List } from "semantic-ui-react";
import SectionTitle from "../components/SectionTitle";
import achievementsData from "../data/achievements.json";

const renderContent = (item) => {
  if (!item.links) {
    // Simple content, just parse HTML tags
    return <span dangerouslySetInnerHTML={{ __html: item.content }} />;
  }

  // Handle content with links
  let content = item.content;
  
  // Replace {linkText} placeholders with actual links
  Object.entries(item.links).forEach(([linkText, linkData]) => {
    const classNameAttr = linkData.className && linkData.className.trim() ? ` class="${linkData.className}"` : '';
    const linkElement = `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer"${classNameAttr}>${linkText}</a>`;
    content = content.replace(`{${linkText}}`, linkElement);
  });

  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

class Achievements extends React.Component {
  render() {
    if (achievementsData && achievementsData.length > 0) {
      return (
        <div>
          <SectionTitle title={"EXTRACURRICULAR"} />
          <List bulleted>
            {achievementsData.map((item, ix) => {
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
  }
}

export default Achievements;
