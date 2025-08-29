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
import { Link, useLocation } from "react-router-dom";
import ConstructorHeaderDropdown from "./components/constructor.header.dropdown.jsx";
import { fetchProjectRequest } from "../../../../features/project/projectSlice";
import { fetchPageRequest } from "../../../../features/page/pageSlice";
import { setPreviewVisibility } from "../../../../features/visibility/visibilitySlice";

const ConstructorHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const page = useSelector(({ page }) => page);
  const project = useSelector(({ project }) => project);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleToggleView = () => {
    dispatch(setPreviewVisibility());
  };

  const handleSaveProjectPage = () => {
    dispatch({});
  };

  useEffect(() => {
    const params = location.pathname.split("/");

    if (params[2] && params[3]) {
      dispatch(fetchProjectRequest({ id: params[2] }));
      dispatch(fetchPageRequest({ id: params[3] }));
      setIsProjectOpen(true);
    } else setIsProjectOpen(false);
  }, [dispatch, location]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderLeftHome to="/projects">
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
      </HeaderLeft>
      {isProjectOpen && (
        <HeaderRight>
          <HeaderRightPreview onClick={handleToggleView}>
            Предпросмотр
          </HeaderRightPreview>
          <HeaderRightPreview onClick={handleSaveProjectPage}>
            Сохранить страницу
          </HeaderRightPreview>
        </HeaderRight>
      )}
    </HeaderContainer>
  );
};

export default ConstructorHeader;
