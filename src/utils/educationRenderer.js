import React from "react";

export const renderInstitutionTitle = (institution, program = null) => {
  // Always return the institution name, not the program
  return (
    <a
      href={institution.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "rgba(0,0,0,.87)" }}
    >
      {institution.name}
    </a>
  );
};

export const renderEducationItems = (education) => {
  const items = [];
  
  // Add achievements
  if (education.achievements) {
    education.achievements.forEach((achievement, index) => {
      // Handle complex achievement structure (for PhD research projects)
      if (typeof achievement === 'object' && achievement.type === 'complex') {
        const complexContent = (
          <div key={index}>
            {achievement.content}
            {achievement.subItems.map((subItem, subIndex) => (
              <div key={subIndex} style={{ marginTop: "5px" }}>
                {"◦"}&nbsp;&nbsp;
                <span dangerouslySetInnerHTML={{ __html: subItem.content }} />
              </div>
            ))}
            <div style={{ marginBottom: "10px" }} />
          </div>
        );
        items.push(complexContent);
      } 
      // Handle simple string achievements
      else if (typeof achievement === 'string') {
        // If no links, just parse HTML tags
        if (!education.links || Object.keys(education.links).length === 0) {
          items.push(<div key={index} dangerouslySetInnerHTML={{ __html: achievement }} />);
        } else {
          // Replace {linkText} placeholders with actual links
          let content = achievement;
          Object.entries(education.links).forEach(([linkText, linkData]) => {
            const classNameAttr = linkData.className ? ` class="${linkData.className}"` : '';
            const linkElement = `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer"${classNameAttr}>${linkText}</a>`;
            content = content.replace(`{${linkText}}`, linkElement);
          });
          items.push(<span key={index} dangerouslySetInnerHTML={{ __html: content }} />);
        }
      }
    });
  }
  
  return items;
};

export const renderJobTitle = (education) => {
  if (education.program) {
    return (
      <a
        href={education.program.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "rgba(0,0,0,.87)" }}
      >
        {education.program.name}
      </a>
    );
  }
  return education.degree;
};