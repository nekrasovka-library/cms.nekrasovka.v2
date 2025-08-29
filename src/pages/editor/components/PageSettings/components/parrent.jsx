import React from "react";
import {
  PaddingContainer,
  SettingsLabel,
  PaddingSelect,
} from "../page.settings.styles";

const PaddingSelectField = ({
  disabled,
  label,
  name,
  value,
  handleSettingsChange,
  options,
}) => {
  const onChange = (e) => {
    const selectedPage = options.find(
      (option) => option.name === e.target.value,
    );

    handleSettingsChange({
      settings: {
        parent: {
          pageId: selectedPage.id,
          url: selectedPage.url,
          name: selectedPage.name,
        },
      },
    });
  };

  return (
    <div>
      <SettingsLabel>{label}</SettingsLabel>
      <PaddingSelect
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </PaddingSelect>
    </div>
  );
};

const Parent = ({
  parent,
  pages,
  mainPageId,
  handleSettingsChange,
  pageId,
}) => {
  const options = [
    { name: "Страница не выбрана", id: null },
    ...pages
      .filter((page) => page.id !== pageId)
      .filter((page) => page.id !== mainPageId)
      .filter((page) => page.settings.parent.pageId !== pageId),
  ];

  return (
    <PaddingContainer>
      <PaddingSelectField
        label="Родительская страница"
        name="parent"
        value={parent.name}
        options={options}
        disabled={mainPageId === pageId || options.length < 2}
        handleSettingsChange={handleSettingsChange}
      />
    </PaddingContainer>
  );
};

export default Parent;
