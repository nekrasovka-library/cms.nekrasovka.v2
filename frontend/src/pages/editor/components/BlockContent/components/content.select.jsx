import React from "react";
import {
  PaddingSelect,
  SettingsLabel,
  ContentContainer,
} from "../block.content.styles";

const SelectField = ({ disabled, options, label, name, value, onChange }) => {
  return (
    <div>
      <SettingsLabel>{label}</SettingsLabel>
      <PaddingSelect
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </PaddingSelect>
    </div>
  );
};

const Select = ({
  value,
  label,
  type,
  options = { value: "", label: "" },
  handleContentChange,
  disabled,
}) => {
  return (
    <ContentContainer>
      <SelectField
        name={type}
        label={label}
        value={value}
        options={options}
        disabled={disabled}
        onChange={handleContentChange}
      />
    </ContentContainer>
  );
};

export default Select;
