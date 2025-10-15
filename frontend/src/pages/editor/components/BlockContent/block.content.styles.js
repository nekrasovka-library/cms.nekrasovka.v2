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

const SettingsContentChanges = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
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

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;
    }
  }
`;

const TextInputWithIcon = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    right: 7px;
  }
`;

const TextInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  transition-duration: 0.3s;
  transition-property: border-color, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::placeholder {
    opacity: 0.6;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;
    }
  }
`;

const SwitchButton = styled.button`
  position: relative;
  width: 52px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${({ $checked }) => ($checked ? "#ff855d" : "#E5E5EA")};
  transition: background-color 200ms ease;
  cursor: pointer;
  outline: none;

  &:active .thumb {
    transform: ${({ $checked }) =>
      $checked ? "translateX(20px) scale(0.96)" : "translateX(0) scale(0.96)"};
  }
`;

const Thumb = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.25),
    0 1px 2px rgba(0, 0, 0, 0.15);
  transform: ${({ $checked }) =>
    $checked ? "translateX(20px)" : "translateX(0)"};
  transition: transform 200ms ease;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
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
  SettingsContentChanges,
  ContentContainer,
  PaddingSelect,
  TextInput,
  SwitchButton,
  Thumb,
  HiddenCheckbox,
  TextInputWithIcon,
};
