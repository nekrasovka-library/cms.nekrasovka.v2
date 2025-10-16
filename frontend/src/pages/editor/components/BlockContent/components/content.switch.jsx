import React from "react";
import {
  ContentContainer,
  SettingsLabel,
  HiddenCheckbox,
  SwitchButton,
  Thumb,
} from "../block.content.styles";
import { BLOCK_CONTENT_SWITCH_OPTIONS } from "../block.content.constants";

const ContentSwitch = ({ type, value, label, handleContentChange }) => {
  const checked = Number(value) === 1;

  const emit = (nextChecked) => {
    const nextValue = nextChecked ? 1 : 0;

    handleContentChange({
      target: { name: type, value: nextValue },
    });
  };

  const handleToggle = (e) => {
    e.preventDefault();
    emit(!checked);
  };

  return (
    <ContentContainer>
      <SettingsLabel>
        {BLOCK_CONTENT_SWITCH_OPTIONS[value]} {label}
      </SettingsLabel>
      <HiddenCheckbox
        checked={checked}
        onChange={(e) => emit(e.target.checked)}
        tabIndex={-1}
        aria-hidden
      />
      <SwitchButton
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${type}-switch`}
        onClick={handleToggle}
        $checked={checked}
        type="button"
      >
        <Thumb className="thumb" $checked={checked} />
      </SwitchButton>
    </ContentContainer>
  );
};

export default ContentSwitch;
