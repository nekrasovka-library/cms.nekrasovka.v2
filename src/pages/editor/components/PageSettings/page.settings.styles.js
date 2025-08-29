import styled from "styled-components";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  height: 100%;
  overflow: scroll;
  position: fixed;
  top: 0;
  transition-duration: 0.3s;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  color: #333;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")});
  border-right: 1px solid #eee;
  padding-bottom: 60px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Container1 = styled(Container)`
  width: 320px;
  left: 0;
  z-index: 1120;
  background-color: #fff;
`;

const HeaderContainer = styled.div`
  margin-bottom: 10px;
`;

const HeaderButtons = styled.div`
  display: flex;
`;

const HeaderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: none;
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  height: 60px;
  outline: none;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  transition-duration: 0.3s;
  transition-property: font-size;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      font-size: 13px;
    }
  }
`;

const HeaderButtonSave = styled(HeaderButton)`
  background-color: #000;
`;

const HeaderButtonSaveAndExit = styled(HeaderButton)`
  background-color: #ff855d;
`;

const SettingsLabel = styled.label`
  align-items: flex-start;
  color: #000;
  display: flex;
  gap: 5px;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const SettingsTitleLabel = styled(SettingsLabel)`
  padding: 0 15px;
  font-weight: 600;
`;

const PaddingSelect = styled.select`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
  color: #000;
  font-size: 16px;
  font-weight: 300;
  height: 40px;
  outline: none !important;
  padding: 0;
  width: 100%;

  transition-duration: 0.3s;
  transition-property: border-color;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  &:disabled {
    opacity: 0.5;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;
    }
  }
`;

const PaddingContainer = styled.div`
  align-items: flex-end;
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 0 15px;

  > div {
    width: 100%;
  }
`;

export {
  Container,
  Container1,
  HeaderContainer,
  HeaderButtons,
  HeaderButtonSave,
  HeaderButtonSaveAndExit,
  SettingsLabel,
  SettingsTitleLabel,
  PaddingSelect,
  PaddingContainer,
};
