import React, { useEffect, useState } from "react";
import { Container1, SettingsTitleLabel } from "./page.settings.styles";
import Header from "./components/header.jsx";
import { resetPage } from "../../../../features/page/pageSlice";
import { updateInProjectPageRequest } from "../../../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsVisibility } from "../../../../features/visibility/visibilitySlice";
import { SettingsContentChanges } from "../BlockContent/block.content.styles";
import { getBlockSettingsTypes } from "./page.settings.constants";

const PageSettings = () => {
  const dispatch = useDispatch();
  const page = useSelector(({ page }) => page);
  const project = useSelector(({ project }) => project);
  const { isSettingsVisible } = useSelector(({ visibility }) => visibility);
  const [pageSettings, setPageSettings] = useState(null);

  const savePageSettings = () => {
    dispatch(
      updateInProjectPageRequest({
        id: page.items.id,
        ...pageSettings,
      }),
    );
  };

  const saveAndExitPageSettings = () => {
    savePageSettings();
    dispatch(resetPage());
    dispatch(setSettingsVisibility());
    setPageSettings(null);
  };

  const handleSettingsChange = ({ target: { name, value } }) => {
    if (name === "parent") {
      const selectedPage = project.items.pages.find((p) => p.id === +value);

      setPageSettings((prev) => ({
        settings: {
          ...prev.settings,
          parent: {
            pageId: selectedPage ? selectedPage.id : null,
            url: selectedPage ? selectedPage.url : "",
            name: selectedPage ? selectedPage.name : "",
          },
        },
      }));
    } else {
      setPageSettings((prev) => ({
        settings: {
          ...prev.settings,
          [name]: value,
        },
      }));
    }
  };

  const renderSettings = (type) => {
    const settingsType = getBlockSettingsTypes(
      project,
      type,
      page.items.id,
      page.items.url,
    );

    if (settingsType === undefined) return;
    const SettingsComponent = settingsType.element;

    const params = {
      ...settingsType.params,
      value:
        type === "parent"
          ? pageSettings.settings[type].pageId
          : pageSettings.settings[type],
      type,
    };

    return (
      <SettingsComponent
        key={type}
        {...params}
        handleContentChange={handleSettingsChange}
      />
    );
  };

  useEffect(() => {
    if (isSettingsVisible) {
      setPageSettings({
        settings: page.items.settings,
      });
    }
  }, [isSettingsVisible, page]);

  // TODO: Добавить в настройки отображение информации для Группы страниц. Показывать картинки как в выборе блока из меню. Привязать к картинкам настройки, что отдавать из content.

  return (
    <Container1 $isMenuOpen={isSettingsVisible}>
      <Header
        saveSettings={savePageSettings}
        saveAndExitSettings={saveAndExitPageSettings}
      />
      <SettingsTitleLabel>Настройки страницы</SettingsTitleLabel>
      {!!pageSettings && (
        <SettingsContentChanges>
          {Object.entries(pageSettings.settings)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item) => renderSettings(Object.keys(item)[0]))}
        </SettingsContentChanges>
      )}
    </Container1>
  );
};

export default PageSettings;
