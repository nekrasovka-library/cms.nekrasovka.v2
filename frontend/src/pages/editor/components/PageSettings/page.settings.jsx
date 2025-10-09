import React from "react";
import { Container1, SettingsTitleLabel } from "./page.settings.styles";
import Header from "./components/header.jsx";
import Parent from "./components/parrent";
import { resetPage, setPageChanges } from "../../../../features/page/pageSlice";
import { updateInProjectPageRequest } from "../../../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsVisibility } from "../../../../features/visibility/visibilitySlice";

const PageSettings = () => {
  const dispatch = useDispatch();
  const page = useSelector(({ page }) => page);
  const project = useSelector(({ project }) => project);
  const { isSettingsVisible } = useSelector(({ visibility }) => visibility);

  const savePageSettings = () => {
    dispatch(
      updateInProjectPageRequest({ id: page.items.id, ...page.changes }),
    );
  };

  const saveAndExitPageSettings = () => {
    if (Object.keys(page.changes).length > 0) {
      savePageSettings();
      dispatch(resetPage());
    }

    dispatch(setSettingsVisibility());
  };

  const handlePageSettingsChange = (props) => {
    dispatch(setPageChanges({ ...page.changes, ...props }));
  };

  return (
    <Container1 $isMenuOpen={isSettingsVisible}>
      <Header
        saveSettings={savePageSettings}
        saveAndExitSettings={saveAndExitPageSettings}
      />
      <SettingsTitleLabel>Настройки страницы</SettingsTitleLabel>
      {page.status === "succeeded" && project.status === "succeeded" && (
        <>
          <Parent
            parent={page.items.settings.parent}
            pages={project.items.pages}
            mainPageId={project.items.settings.main_page_id}
            handleSettingsChange={handlePageSettingsChange}
            pageId={page.items.id}
          />
        </>
      )}
    </Container1>
  );
};

export default PageSettings;
