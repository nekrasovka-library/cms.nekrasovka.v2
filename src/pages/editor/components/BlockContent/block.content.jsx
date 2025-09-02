import React, { useEffect, useState } from "react";
import {
  Container1,
  SettingsContentChanges,
  SettingsTitleLabel,
} from "./block.content.styles.js";
import { useDispatch, useSelector } from "react-redux";
import ContentHeader from "./components/content.header.jsx";
import {
  resetBlock,
  updateBlockRequest,
} from "../../../../features/block/blockSlice";
import { setContentVisibility } from "../../../../features/visibility/visibilitySlice";
import {
  BLOCK_CONTENT_TYPES,
  getBlockSettingsTypes,
} from "./block.content.constants";
import Select from "./components/content.select";
import Switch from "./components/content.switch";

const BlockContent = () => {
  const dispatch = useDispatch();
  const block = useSelector(({ block }) => block);
  const project = useSelector(({ project }) => project);
  const [blockContent, setBlockContent] = useState(null);
  const { isContentVisible } = useSelector(({ visibility }) => visibility);
  const route = useSelector(({ route }) => route);

  const saveContent = () => {
    dispatch(
      updateBlockRequest({
        id: block.items.id,
        ...blockContent,
        ...(route.params.blockId && { blockId: route.params.blockId }),
      }),
    );
  };

  const saveAndExitContent = () => {
    saveContent();
    dispatch(resetBlock());
    dispatch(setContentVisibility());
  };

  const handleContentChange = ({ target: { name, value } }) => {
    value = isNaN(value) ? value : Number(value);

    setBlockContent((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value,
      },
    }));
  };

  const handleSettingsChange = ({ target: { name, value } }) => {
    value = isNaN(value) ? value : Number(value);

    setBlockContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (isContentVisible) {
      setBlockContent({
        content: block.items.content,
        settings: block.items.settings,
      });
    }
  }, [isContentVisible]);

  const renderContent = (type) => {
    const contentType = BLOCK_CONTENT_TYPES[type];

    if (contentType === undefined) return;
    const ContentComponent = contentType.element;

    const params = {
      ...contentType.params,
      value: blockContent.content[type],
      type,
    };

    return (
      <ContentComponent {...params} handleContentChange={handleContentChange} />
    );
  };

  const renderSettings = (type) => {
    const BLOCK_SETTINGS_TYPES = getBlockSettingsTypes(project);
    const settingsType = BLOCK_SETTINGS_TYPES[type];

    if (settingsType === undefined) return;
    const SettingsComponent = settingsType.element;

    const params = {
      ...settingsType.params,
      value: blockContent.settings[type],
      type,
    };

    return (
      <SettingsComponent
        {...params}
        handleContentChange={handleSettingsChange}
      />
    );
  };

  return (
    <Container1 $isMenuOpen={isContentVisible}>
      <ContentHeader
        saveSettings={saveContent}
        saveAndExitSettings={saveAndExitContent}
      />
      <SettingsTitleLabel>Изменение контента</SettingsTitleLabel>
      {!!blockContent && (
        <SettingsContentChanges>
          {Object.entries(blockContent.content)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item) => {
              return renderContent(Object.keys(item)[0]);
            })}
        </SettingsContentChanges>
      )}
      <SettingsTitleLabel>Настройки контента</SettingsTitleLabel>
      {!!blockContent && (
        <SettingsContentChanges>
          {Object.entries(blockContent.settings)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item) => {
              return renderSettings(Object.keys(item)[0]);
            })}
        </SettingsContentChanges>
      )}
    </Container1>
  );
};

export default BlockContent;
