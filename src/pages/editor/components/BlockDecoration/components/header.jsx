import React from "react";
import {
  HeaderButtons,
  HeaderButtonSave,
  HeaderButtonSaveAndExit,
  HeaderContainer,
} from "../block.decoration.styles";

const Header = ({ saveSettings, saveAndExitSettings }) => {
  return (
    <HeaderContainer>
      <HeaderButtons>
        <HeaderButtonSave type="button" onClick={saveSettings}>
          Сохранить
        </HeaderButtonSave>
        <HeaderButtonSaveAndExit type="button" onClick={saveAndExitSettings}>
          Сохранить и закрыть
        </HeaderButtonSaveAndExit>
      </HeaderButtons>
    </HeaderContainer>
  );
};

export default Header;
