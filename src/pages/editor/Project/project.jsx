import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Компоненты
import ProjectHeader from "./components/project.header.jsx";
import ProjectMain from "./components/project.main.jsx";
import ProjectSettings from "./components/project.settings.jsx";
import { AnimatePresence } from "framer-motion";
import Transition from "../components/Transition/transition.jsx";
import {
  fetchProjectRequest,
  resetProject,
  setProjectChanges,
  updateProjectRequest,
  createInProjectPageRequest,
} from "../../../features/project/projectSlice";
import { resetPage } from "../../../features/page/pageSlice";

const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const project = useSelector(({ project }) => project);

  const handleSaveSettings = () => {
    dispatch(updateProjectRequest({ id: projectId, ...project.changes }));
    setIsProjectSettingsOpen(false);
  };

  const handleCloseSettings = () => {
    setIsProjectSettingsOpen(false);
  };

  const handleSettingsChange = (params) => {
    dispatch(setProjectChanges({ ...project.changes, ...params }));
  };

  const handleCreateProjectPage = () => {
    dispatch(
      createInProjectPageRequest({ projectId, templateId: project.templateId }),
    );
  };

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectRequest({ id: projectId }));
    }

    return () => {
      dispatch(resetProject());
      dispatch(resetPage());
    };
  }, [dispatch, projectId]);

  return (
    project.status === "succeeded" && (
      <>
        <ProjectHeader
          href={project.items.url}
          name={project.items.name}
          setIsProjectSettingsOpen={setIsProjectSettingsOpen}
          isProjectSettingsOpen={isProjectSettingsOpen}
          handleSaveSettings={handleSaveSettings}
          handleCloseSettings={handleCloseSettings}
          handleCreateProjectPage={handleCreateProjectPage}
        />
        <AnimatePresence mode="wait">
          <Transition key={isProjectSettingsOpen}>
            {isProjectSettingsOpen ? (
              <ProjectSettings
                handleSettingsChange={handleSettingsChange}
                settings={project.items.settings}
                styles={project.items.styles}
                name={project.items.name}
                pages={project.items.pages}
                changes={project.changes}
              />
            ) : (
              <ProjectMain
                mainPageId={project.items.settings.main_page_id}
                pages={project.items.pages}
              />
            )}
          </Transition>
        </AnimatePresence>
      </>
    )
  );
};

export default Project;
