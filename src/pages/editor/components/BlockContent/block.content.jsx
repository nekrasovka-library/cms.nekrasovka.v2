import React, { useEffect, useState } from "react";
import {
  Container1,
  SettingsContentChanges,
  SettingsLabel,
  SettingsTitleLabel,
} from "./block.content.styles.js";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header.jsx";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import {
  resetBlock,
  updateBlockRequest,
} from "../../../../features/block/blockSlice";
import { setContentVisibility } from "../../../../features/visibility/visibilitySlice";

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

  return (
    <Container1 $isMenuOpen={isContentVisible}>
      <Header
        saveSettings={saveContent}
        saveAndExitSettings={saveAndExitContent}
      />
      <SettingsTitleLabel>Настройки контента</SettingsTitleLabel>
      <SettingsTitleLabel>Изменения контента</SettingsTitleLabel>
      {!!blockContent?.data?.next && (
        <SettingsContentChanges>
          {Object.entries(blockContent.data.next)
            .map(([key, value]) => ({
              [key]: value,
            }))
            .map((item, index) => {
              return (
                <div key={index}>
                  <SettingsLabel>{Object.keys(item)[0]}</SettingsLabel>
                  <Icon
                    icon="closeMenu"
                    height="10"
                    type="button"
                    onClick={() => console.log("delete", Object.keys(item)[0])}
                  />
                </div>
              );
            })}
        </SettingsContentChanges>
      )}
    </Container1>
  );
};

export default BlockContent;
