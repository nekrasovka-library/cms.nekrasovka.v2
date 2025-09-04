import React from "react";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../block.decoration.styles";

const Radius = ({ borderRadius, handleSettingsChange }) => {
  return (
    <RadiusContainer>
      <SettingsLabel>Радиус</SettingsLabel>
      <RadiusInput
        type="number"
        min="0"
        max="50"
        name="borderRadius"
        value={borderRadius}
        onChange={handleSettingsChange}
        placeholder="0"
      />
    </RadiusContainer>
  );
};

export default Radius;
