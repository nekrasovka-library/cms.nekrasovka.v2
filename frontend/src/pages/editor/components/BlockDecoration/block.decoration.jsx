import React, { Fragment, useState } from "react";
import {
  Container1,
  Container2,
  SettingsContentTitleLabel,
  SettingsTitleLabel,
} from "./block.decoration.styles";
import { useDispatch, useSelector } from "react-redux";
import Padding from "./components/padding.jsx";
import Header from "./components/header.jsx";
import Columns from "./components/columns.jsx";
import BackgroundColor from "./components/background-color.jsx";
import Align from "./components/align.jsx";
import Radius from "./components/radius.jsx";
import Color from "./components/color.jsx";
import Opacity from "./components/opacity.jsx";
import Gap from "./components/gap.jsx";
import Height from "./components/height.jsx";
import Border from "./components/border.jsx";
import FontSize from "./components/fontSize";
import Tracks from "./components/tracks.jsx";
import {
  resetBlock,
  updateBlockRequest,
} from "../../../../features/block/blockSlice";
import { setDecorationVisibility } from "../../../../features/visibility/visibilitySlice";
import { CloseMenuButton } from "../ConstructorMenus/constructor.menus.styles";
import Icon from "../../../../nekrasovka-ui/Icon/icon";

const BlockDecoration = () => {
  const dispatch = useDispatch();
  const block = useSelector(({ block }) => block);
  const { isDecorationVisible } = useSelector(({ visibility }) => visibility);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState({
    name: "",
    data: {},
  });
  const [blockStyles, setBlockStyles] = useState("");

  const saveStyles = () => {
    dispatch(
      updateBlockRequest({
        id: block.items.id,
        styles: blockStyles,
      }),
    );
  };

  const saveAndExitStyles = () => {
    handleCloseContent();
    saveStyles();
    dispatch(resetBlock());
    dispatch(setDecorationVisibility());
  };

  const handleStylesChange = ({ target: { name, value } }) => {
    setBlockStyles((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseContent = () => {
    setIsContentVisible(false);
    setSelectedContent({ name: "", data: {} });
  };

  const renderStyleComponent = (
    Component,
    propIndex,
    propKey,
    propValue,
    defaults,
  ) => {
    const hasOverride =
      blockStyles && Object.prototype.hasOwnProperty.call(blockStyles, propKey);
    const value = hasOverride ? blockStyles[propKey] : propValue;

    return (
      <Component
        key={propIndex}
        {...{ [propKey]: value }}
        handleSettingsChange={handleStylesChange}
        defaultStyles={defaults}
      />
    );
  };

  const DECORATION_STYLE = {
    maxWidth: Columns,
    gap: Gap,
    textAlign: Align,
    paddingTop: Padding,
    paddingBottom: Padding,
    tracks: Tracks,
    backgroundColor: BackgroundColor,
    color: Color,
    fontSize: FontSize,
    opacity: Opacity,
    borderRadius: Radius,
    border: Border,
    height: Height,
  };

  return (
    <>
      <Container1
        $isMenuOpen={isDecorationVisible}
        $isContentVisible={isContentVisible}
      >
        <Header
          saveSettings={saveStyles}
          saveAndExitSettings={saveAndExitStyles}
        />
        <SettingsTitleLabel>Оформление блока</SettingsTitleLabel>
        {block.status === "succeeded" && (
          <>
            {Object.entries(block?.items?.styles["block"]["desktop"]).map(
              ([key, value], index) => {
                const defaults = block?.items?.styles["block"]["desktop"];
                const Component = DECORATION_STYLE[key];
                return Component
                  ? renderStyleComponent(Component, index, key, value, defaults)
                  : null;
              },
            )}
          </>
        )}
        <SettingsTitleLabel>Оформление контента</SettingsTitleLabel>
        {block.status === "succeeded" &&
          Object.entries(block?.items?.styles["content"]).map(
            ([parentKey, parentValue]) => {
              const defaults = parentValue["desktop"];

              return (
                <Fragment key={parentKey}>
                  <SettingsContentTitleLabel
                    $isActive={selectedContent.name === parentKey}
                    onClick={() => {
                      setSelectedContent({ name: parentKey, data: defaults });
                      setIsContentVisible(true);
                    }}
                  >
                    {parentKey}
                    <span />
                  </SettingsContentTitleLabel>
                </Fragment>
              );
            },
          )}
      </Container1>
      <Container2 $isMenuOpen={isContentVisible}>
        <div>
          <CloseMenuButton>
            <Icon icon="closeMenu" type="button" onClick={handleCloseContent} />
          </CloseMenuButton>
        </div>
        <SettingsTitleLabel>{selectedContent.name}</SettingsTitleLabel>
        {Object.entries(selectedContent.data).map(([key, value], index) => {
          const Component = DECORATION_STYLE[key];
          return Component
            ? renderStyleComponent(
                Component,
                index,
                key,
                value,
                selectedContent.data,
              )
            : null;
        })}
      </Container2>
    </>
  );
};

export default BlockDecoration;
