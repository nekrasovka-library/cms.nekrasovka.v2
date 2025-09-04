import React from "react";
import { ProjectCardContainer } from "../projects.styles.js";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, url, name }) => {
  return (
    <ProjectCardContainer>
      <div>
        <Link to={`${id}`}>{name}</Link>
      </div>
      <div>
        <div>
          <Link to={`/projects/${id}`}>РЕДАКТИРОВАТЬ ПРОЕКТ</Link>
        </div>
        <div>{url && <a href={url}>ссылка</a>}</div>
      </div>
    </ProjectCardContainer>
  );
};

export default ProjectCard;
