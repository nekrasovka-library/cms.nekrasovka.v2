import React from "react";
import {
  SettingsLabel,
  ContentContainer,
  TextInput,
} from "../block.content.styles";
import { minStartOfTodayForDateTimeLocal } from "../../../../../helpers";

const ContentCalendar = ({ label, value, type, handleContentChange }) => {
  const min = minStartOfTodayForDateTimeLocal();

  return (
    <ContentContainer>
      <SettingsLabel>{label}</SettingsLabel>
      <TextInput
        type="datetime-local"
        name={type}
        value={value}
        min={min}
        onChange={handleContentChange}
      />
    </ContentContainer>
  );
};

export default ContentCalendar;
