import React, { useState } from "react";
import { Container1, SettingsTitleLabel } from "./block.decoration.styles";
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
import ElementBackgroundColor from "./components/element-background-color.jsx";
import ElementFontSize from "./components/fontSize";
import Tracks from "./components/tracks.jsx";
import {
  resetBlock,
  updateBlockRequest,
} from "../../../../features/block/blockSlice";
import { setDecorationVisibility } from "../../../../features/visibility/visibilitySlice";

const BlockDecoration = () => {
  const dispatch = useDispatch();
  const block = useSelector(({ block }) => block);
  const { isDecorationVisible } = useSelector(({ visibility }) => visibility);
  const [blockStyles, setBlockStyles] = useState(null);
  const route = useSelector(({ route }) => route);

  const saveStyles = () => {
    dispatch(
      updateBlockRequest({
        id: block.items.id,
        styles: blockStyles,
        ...(route.params.blockId && { blockId: route.params.blockId }),
      }),
    );
  };

  const saveAndExitStyles = () => {
    saveStyles();
    dispatch(resetBlock());
    dispatch(setDecorationVisibility());
  };

  const handleStylesChange = ({ target: { name, value } }) => {
    setBlockStyles((prev) => ({ ...prev, [name]: value }));
  };

  const renderStyleComponent = (Component, propKey, additionalProps = {}) => {
    const defaults = block.items.styles;

    if (Array.isArray(propKey)) {
      // Рендерим только если все ключи объявлены в дефолтных стилях
      const allExistInDefaults = propKey.every(
        (key) => defaults?.[key] !== undefined,
      );
      if (!allExistInDefaults) return null;

      // Для каждого ключа берём изменённое значение из blockStyles (если оно есть),
      // иначе — дефолтное из block.items.styles
      const extractedProps = propKey.reduce((acc, key) => {
        const hasOverride =
          blockStyles && Object.prototype.hasOwnProperty.call(blockStyles, key);
        const value = hasOverride ? blockStyles[key] : defaults[key];
        return { ...acc, [key]: value };
      }, {});

      return (
        <Component
          {...extractedProps}
          {...additionalProps}
          handleSettingsChange={handleStylesChange}
          defaultStyles={defaults}
        />
      );
    }

    // Одиночный ключ: показываем контрол, если он есть в дефолтных стилях
    if (defaults?.[propKey] !== undefined) {
      const hasOverride =
        blockStyles &&
        Object.prototype.hasOwnProperty.call(blockStyles, propKey);
      const value = hasOverride ? blockStyles[propKey] : defaults[propKey];

      return (
        <Component
          {...{ [propKey]: value }}
          {...additionalProps}
          handleSettingsChange={handleStylesChange}
          defaultStyles={defaults}
        />
      );
    }

    return null;
  };

  return (
    <Container1 $isMenuOpen={isDecorationVisible}>
      <Header
        saveSettings={saveStyles}
        saveAndExitSettings={saveAndExitStyles}
      />
      <SettingsTitleLabel>Оформление блока</SettingsTitleLabel>
      {renderStyleComponent(Columns, "maxWidth")}
      {renderStyleComponent(Gap, "gap")}
      {renderStyleComponent(Align, "textAlign")}
      {renderStyleComponent(Padding, ["paddingTop", "paddingBottom"])}
      {renderStyleComponent(BackgroundColor, "backgroundColor")}
      <SettingsTitleLabel>Оформление элемента</SettingsTitleLabel>
      {renderStyleComponent(Tracks, "tracks")}
      {renderStyleComponent(Color, "color")}
      {renderStyleComponent(ElementFontSize, "elementFontSize")}
      {renderStyleComponent(ElementBackgroundColor, "elementBackgroundColor")}
      {renderStyleComponent(Opacity, "opacity")}
      {renderStyleComponent(Radius, "borderRadius")}
      {renderStyleComponent(Border, "border")}
      {renderStyleComponent(Height, "height")}
    </Container1>
  );
};

export default BlockDecoration;
