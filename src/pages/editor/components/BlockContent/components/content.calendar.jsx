import React from "react";
import {
  SettingsLabel,
  ContentContainer,
  TextInput,
} from "../block.content.styles";

const ContentCalendar = ({ label, value, name, handleContentChange }) => {
  return (
    <ContentContainer>
      <SettingsLabel>{label}</SettingsLabel>
      <TextInput
        type="text"
        name={name}
        value={value}
        onChange={handleContentChange}
      />
    </ContentContainer>
  );
};

export default ContentCalendar;
