import React, { useState } from "react";
import { ProjectsHeaderContainer } from "../projects.styles.js";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import ProjectCreate from "./project.create.jsx";

const ProjectsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ProjectsHeaderContainer>
      <div>Мои проекты:</div>
      <div onClick={() => setIsModalOpen(true)}>
        <Icon icon="add" fill="#fa886e" />
        <div>Создать новый проект</div>
      </div>
      {isModalOpen && <ProjectCreate handleClose={handleClose} />}
    </ProjectsHeaderContainer>
  );
};

export default ProjectsHeader;
