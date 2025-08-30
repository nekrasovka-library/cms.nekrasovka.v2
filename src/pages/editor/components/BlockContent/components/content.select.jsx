import React from "react";
import {
  PaddingSelect,
  SettingsLabel,
  ContentContainer,
} from "../block.content.styles";

const SelectField = ({ options, label, name, value, onChange }) => (
  <div>
    <SettingsLabel>{label}</SettingsLabel>
    <PaddingSelect name={name} onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </PaddingSelect>
  </div>
);

const Select = ({
  value,
  label,
  type,
  options = { value: "", label: "" },
  handleContentChange,
}) => {
  return (
    <ContentContainer>
      <SelectField
        name={type}
        label={label}
        value={value}
        options={options}
        onChange={handleContentChange}
      />
    </ContentContainer>
  );
};

export default Select;
