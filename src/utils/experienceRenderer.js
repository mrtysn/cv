import React from "react";

export const renderCompanyTitle = (company) => {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "rgba(0,0,0,.87)" }}
    >
      {company.name}
    </a>
  );
};

export const renderResponsibility = (responsibility, experienceLinks = {}) => {
  // Handle complex responsibility structure (for ING Bank)
  if (typeof responsibility === 'object' && responsibility.type === 'complex') {
    return (
      <div>
        {responsibility.content}
        {responsibility.subItems.map((subItem, index) => (
          <div key={index} style={{ marginTop: "5px" }}>
            {"◦"}&nbsp;&nbsp;{subItem}
          </div>
        ))}
      </div>
    );
  }

  // Handle simple string responsibility
  if (typeof responsibility === 'string') {
    // If no links, just parse HTML tags
    if (!experienceLinks || Object.keys(experienceLinks).length === 0) {
      return <span dangerouslySetInnerHTML={{ __html: responsibility }} />;
    }

    // Replace {linkText} placeholders with actual links
    let content = responsibility;
    Object.entries(experienceLinks).forEach(([linkText, linkData]) => {
      const classNameAttr = linkData.className ? ` class="${linkData.className}"` : '';
      const linkElement = `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer"${classNameAttr}>${linkText}</a>`;
      content = content.replace(`{${linkText}}`, linkElement);
    });

    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <span>{responsibility}</span>;
};