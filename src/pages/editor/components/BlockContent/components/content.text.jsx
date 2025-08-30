import React from "react";
import {
  ContentContainer,
  TextInput,
  SettingsLabel,
} from "../block.content.styles";

const Text = ({ label, value, type, handleContentChange }) => {
  return (
    <ContentContainer>
      <SettingsLabel>{label}</SettingsLabel>
      <TextInput
        type="text"
        name={type}
        value={value}
        onChange={handleContentChange}
      />
    </ContentContainer>
  );
};

export default Text;
