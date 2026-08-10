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
    // A fragment, not a wrapper div. App.css keeps list markers in normal flow
    // so the PDF text layer stays in document order, and an in-flow marker
    // followed by a block-level child gets pushed onto its own line. Leading
    // with the text keeps the bullet beside it.
    return (
      <React.Fragment>
        {responsibility.content}
        {responsibility.subItems.map((subItem, index) => (
          <div key={index} style={{ marginTop: "5px" }}>
            {"◦"}&nbsp;&nbsp;{subItem}
          </div>
        ))}
      </React.Fragment>
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