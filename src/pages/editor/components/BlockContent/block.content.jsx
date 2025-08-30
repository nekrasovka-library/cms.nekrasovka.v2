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
import { BLOCK_CONTENT_TYPES } from "./block.content.constants";

const BlockContent = () => {
  const dispatch = useDispatch();
  const block = useSelector(({ block }) => block);
  const [blockContent, setBlockContent] = useState(null);
  const { isContentVisible } = useSelector(({ visibility }) => visibility);

  const saveContent = () => {
    dispatch(updateBlockRequest({ id: block.items.id, content: blockContent }));
  };

  const saveAndExitContent = () => {
    saveContent();
    dispatch(resetBlock());
    dispatch(setContentVisibility());
  };

  const handleContentChange = ({ target: { name, value } }) => {
    setBlockContent((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isContentVisible) {
      setBlockContent(block.items.content);
    }
  }, [isContentVisible]);

  const renderContent = (type, position) => {
    const contentType = BLOCK_CONTENT_TYPES[type];

    if (contentType === undefined || contentType.position !== position) return;
    const ContentComponent = contentType.element;

    const params = {
      ...contentType.params,
      value: blockContent[type],
      type,
    };

    return (
      <ContentComponent {...params} handleContentChange={handleContentChange} />
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
          {Object.entries(blockContent)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item) => {
              return renderContent(Object.keys(item)[0], 0);
            })}
        </SettingsContentChanges>
      )}
      <SettingsTitleLabel>Настройки контента</SettingsTitleLabel>
      {!!blockContent && (
        <SettingsContentChanges>
          {Object.entries(blockContent)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item) => {
              return renderContent(Object.keys(item)[0], 1);
            })}
        </SettingsContentChanges>
      )}
    </Container1>
  );
};

export default BlockContent;
