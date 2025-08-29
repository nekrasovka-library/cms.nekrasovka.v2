import React, { useEffect } from "react";
import {
  ProjectsCardsContainer,
  ProjectsContainer,
} from "./projects.styles.js";
import ProjectCard from "./components/project.card.jsx";
import ProjectsHeader from "./components/projects.header.jsx";
import { useDispatch, useSelector } from "react-redux";
import Transition from "../components/Transition/transition.jsx";
import { AnimatePresence } from "framer-motion";
import {
  fetchProjectsRequest,
  resetProjects,
} from "../../../features/projects/projectsSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(({ projects }) => projects);

  useEffect(() => {
    dispatch(fetchProjectsRequest());

    return () => dispatch(resetProjects());
  }, [dispatch]);

  return (
    <>
      <ProjectsHeader />
      <AnimatePresence mode="wait">
        <Transition key={projects.status === "succeeded"}>
          {projects.status === "succeeded" && (
            <ProjectsCardsContainer>
              {projects.items.map((item) => (
                <ProjectCard
                  key={item.id}
                  id={item.id}
                  url={item.url}
                  name={item.name}
                />
              ))}
            </ProjectsCardsContainer>
          )}
        </Transition>
      </AnimatePresence>
    </>
  );
};

export default Projects;
