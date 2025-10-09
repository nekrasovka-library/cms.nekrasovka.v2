import React from "react";
import {
  ContentContainer,
  TextInput,
  SettingsLabel,
} from "../block.content.styles";

const Text = ({
  label,
  value,
  type,
  isDisabled = false,
  handleContentChange,
}) => {
  return (
    <ContentContainer>
      <SettingsLabel>{label}</SettingsLabel>
      <TextInput
        type="text"
        name={type}
        value={value}
        onChange={handleContentChange}
        disabled={isDisabled}
      />
    </ContentContainer>
  );
};

export default Text;
