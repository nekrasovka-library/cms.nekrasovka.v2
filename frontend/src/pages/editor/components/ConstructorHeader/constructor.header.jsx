import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  HeaderLeft,
  HeaderLeftBlankPageLink,
  HeaderLeftBlankPageList,
  HeaderLeftHome,
  HeaderRight,
  HeaderRightPreview,
} from "./constructor.header.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { Link } from "react-router-dom";
import ConstructorHeaderDropdown from "./components/constructor.header.dropdown.jsx";
import { fetchProjectRequest } from "../../../../features/project/projectSlice";
import { setPreviewVisibility } from "../../../../features/visibility/visibilitySlice";

const ConstructorHeader = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const page = useSelector(({ page }) => page);
  const project = useSelector(({ project }) => project);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isManagementsOpen, setIsManagementsOpen] = useState(false);
  const route = useSelector(({ route }) => route);

  const handleToggleView = () => {
    dispatch(setPreviewVisibility());
  };

  const handleSaveProjectPage = () => {
    dispatch({});
  };

  useEffect(() => {
    if (route.params.projectId && route.params.pageId) {
      if (project.status !== "succeeded") {
        dispatch(fetchProjectRequest({ id: route.params.projectId }));
      }
      setIsProjectOpen(true);
    } else setIsProjectOpen(false);
  }, [dispatch, route, project]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLeftHome
          to="/projects"
          onClick={() => setIsManagementsOpen(false)}
        >
          <Icon icon="home" />
          <span>Мои проекты</span>
        </HeaderLeftHome>
        {isProjectOpen && (
          <>
            /
            <HeaderLeftBlankPageLink>
              <Icon icon="globus" />
              <Link to={`/projects/${project.items.id}`}>
                {project.items.name}
              </Link>
            </HeaderLeftBlankPageLink>
            /
            <HeaderLeftBlankPageList
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              $isDropdownOpen={isDropdownOpen}
            >
              <Icon icon="blankPage" />
              <span>{page.items.name}</span>
              {isDropdownOpen && (
                <ConstructorHeaderDropdown
                  pages={project.items.pages}
                  projectId={project.items.id}
                  setIsDropdownOpen={setIsDropdownOpen}
                  mainPageId={project.items.settings.main_page_id}
                  pageId={page.items.id}
                />
              )}
            </HeaderLeftBlankPageList>
          </>
        )}
        {isManagementsOpen && (
          <>
            /
            <HeaderLeftBlankPageLink>
              <span>Управление</span>
            </HeaderLeftBlankPageLink>
          </>
        )}
      </HeaderLeft>
      <HeaderRight>
        {isProjectOpen ? (
          <>
            <HeaderRightPreview onClick={handleToggleView}>
              Предпросмотр
            </HeaderRightPreview>
            <HeaderRightPreview onClick={handleSaveProjectPage}>
              Сохранить страницу
            </HeaderRightPreview>
          </>
        ) : (
          !isManagementsOpen && (
            <HeaderRightPreview
              as={Link}
              to="managements"
              onClick={() => setIsManagementsOpen(true)}
            >
              Управление
            </HeaderRightPreview>
          )
        )}
      </HeaderRight>
    </HeaderContainer>
  );
};

export default ConstructorHeader;
