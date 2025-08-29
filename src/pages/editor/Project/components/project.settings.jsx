import React, { useState } from "react";
import {
  ProjectSettingsActions,
  ProjectSettingsContainer,
  ProjectSettingsFontsAndColors,
  ProjectSettingsMainPage,
  ProjectSettingsProjectMain,
  ProjectSettingsTitles,
  ProjectSettingsTitlesTitle,
  PaddingSelect,
  RadiusInput,
  SettingsLabel,
  ColorChange,
  ColorCircle,
  ColorInput,
} from "../project.styles.js";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { settingsTitles, settingsFonts } from "./project.constants";

const ProjectSettings = ({
  name,
  styles,
  settings,
  pages,
  changes,
  handleSettingsChange,
}) => {
  const [activeTitle, setActiveTitle] = useState(1);

  return (
    <ProjectSettingsContainer>
      <ProjectSettingsTitles>
        {settingsTitles.map((title) => {
          return (
            <ProjectSettingsTitlesTitle
              key={title.id}
              $isTitleActive={title.id === activeTitle}
              onClick={() => setActiveTitle(title.id)}
            >
              {title.title}
            </ProjectSettingsTitlesTitle>
          );
        })}
      </ProjectSettingsTitles>
      <ProjectSettingsActions>
        {activeTitle === 1 && (
          <ProjectSettingsProjectMain>
            <div>
              <SettingsLabel>Название проекта</SettingsLabel>
              <RadiusInput
                type="text"
                name="name"
                value={changes.name || name || ""}
                onChange={(e) => handleSettingsChange({ name: e.target.value })}
              />
            </div>
          </ProjectSettingsProjectMain>
        )}
        {activeTitle === 2 && (
          <ProjectSettingsFontsAndColors>
            <div>
              <SettingsLabel>Шрифт страницы</SettingsLabel>
              <PaddingSelect
                name="fontFamily"
                onChange={(e) =>
                  handleSettingsChange({
                    styles: {
                      ...changes.styles,
                      fontFamily: e.target.value,
                    },
                  })
                }
                value={changes.styles?.fontFamily || styles.fontFamily}
              >
                {settingsFonts.map((font) => (
                  <option key={font.id} value={font.name}>
                    {font.name}
                  </option>
                ))}
              </PaddingSelect>
            </div>
            <div>
              <SettingsLabel>Цвет фона страницы</SettingsLabel>
              <ColorChange>
                <ColorCircle
                  $backgroundColor={
                    changes.styles?.backgroundColor || styles.backgroundColor
                  }
                />
                <ColorInput
                  type="text"
                  name="backgroundColor"
                  value={
                    changes.styles?.backgroundColor ||
                    styles.backgroundColor ||
                    ""
                  }
                  onChange={(e) =>
                    handleSettingsChange({
                      styles: {
                        ...changes.styles,
                        backgroundColor: e.target.value,
                      },
                    })
                  }
                  placeholder="#fff"
                />
                {changes.styles?.backgroundColor && (
                  <Icon
                    icon="closeMenu"
                    type="button"
                    onClick={() => {
                      const newStyles = { ...changes.styles };
                      delete newStyles.backgroundColor;

                      handleSettingsChange({
                        styles: newStyles,
                      });
                    }}
                  />
                )}
              </ColorChange>
            </div>
            <div>
              <SettingsLabel>Цвет текста страницы</SettingsLabel>
              <ColorChange>
                <ColorCircle
                  $backgroundColor={changes.styles?.color || styles.color}
                />
                <ColorInput
                  type="text"
                  name="color"
                  value={changes.styles?.color || styles.color || ""}
                  onChange={(e) =>
                    handleSettingsChange({
                      styles: {
                        ...changes.styles,
                        color: e.target.value,
                      },
                    })
                  }
                  placeholder="#000"
                />
                {!!changes.styles?.color && (
                  <Icon
                    icon="closeMenu"
                    type="button"
                    onClick={() => {
                      const newStyles = { ...changes.styles };
                      delete newStyles.color;

                      handleSettingsChange({
                        styles: newStyles,
                      });
                    }}
                  />
                )}
              </ColorChange>
            </div>
          </ProjectSettingsFontsAndColors>
        )}
        {activeTitle === 3 && (
          <ProjectSettingsMainPage>
            <SettingsLabel>Главная страница</SettingsLabel>
            <PaddingSelect
              name="main_page_id"
              onChange={(e) =>
                handleSettingsChange({
                  settings: {
                    ...changes.settings,
                    main_page_id: +e.target.value,
                  },
                })
              }
              value={changes.main_page_id || settings.main_page_id}
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </PaddingSelect>
            <div>
              Выберите, какая страница будет главной для вашего сайта
              (открывается по умолчанию при заходе на сайт).
            </div>
          </ProjectSettingsMainPage>
        )}
      </ProjectSettingsActions>
    </ProjectSettingsContainer>
  );
};

export default ProjectSettings;
