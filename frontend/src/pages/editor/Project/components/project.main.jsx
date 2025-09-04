import React from "react";
import {
  ProjectMainContainer,
  ProjectMainContainerHeader,
} from "../project.styles.js";
import ProjectMainCard from "./project.main.card.jsx";

const ProjectMain = ({ pages, mainPageId }) => {
  return (
    <ProjectMainContainer>
      <ProjectMainContainerHeader>Страницы проекта:</ProjectMainContainerHeader>
      {[...pages]
        .sort((a, b) => {
          if (a.id === mainPageId) return -1;
          if (b.id === mainPageId) return 1;
          return a.id - b.id;
        })
        .map(({ id, name, url, settings }) => {
          return (
            <ProjectMainCard
              key={id}
              pageId={id}
              isPageMain={id === mainPageId}
              name={name}
              url={url}
              settings={settings}
            />
          );
        })}
    </ProjectMainContainer>
  );
};

export default ProjectMain;
