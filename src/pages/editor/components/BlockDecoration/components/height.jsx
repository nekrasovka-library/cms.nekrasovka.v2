import React from "react";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../block.decoration.styles";

const Height = ({ height, handleSettingsChange }) => {
  return (
    <RadiusContainer>
      <SettingsLabel>Высота</SettingsLabel>
      <RadiusInput
        type="text"
        name="height"
        value={height}
        onChange={handleSettingsChange}
        placeholder="0"
      />
    </RadiusContainer>
  );
};

export default Height;
