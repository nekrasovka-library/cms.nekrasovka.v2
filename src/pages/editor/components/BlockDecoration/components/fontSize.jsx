import React from "react";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../block.decoration.styles";

const FontSize = ({ elementFontSize, handleSettingsChange }) => {
  return (
    <RadiusContainer>
      <SettingsLabel>Размер шрифта</SettingsLabel>
      <RadiusInput
        type="text"
        name="elementFontSize"
        value={elementFontSize}
        onChange={handleSettingsChange}
        placeholder="0"
      />
    </RadiusContainer>
  );
};

export default FontSize;
