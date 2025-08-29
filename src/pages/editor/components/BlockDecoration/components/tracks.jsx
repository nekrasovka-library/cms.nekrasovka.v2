import React from "react";
import {
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
} from "../block.decoration.styles";

const Tracks = ({ tracks, handleSettingsChange }) => {
  return (
    <RadiusContainer>
      <SettingsLabel>Количество</SettingsLabel>
      <RadiusInput
        type="number"
        min="0"
        max="10"
        name="tracks"
        value={tracks}
        onChange={handleSettingsChange}
        placeholder="0"
      />
    </RadiusContainer>
  );
};

export default Tracks;
