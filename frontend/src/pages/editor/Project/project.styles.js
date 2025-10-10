import styled from "styled-components";

const ProjectHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  row-gap: 30px;
  max-width: 1280px;
  margin: 0 auto;

  > div {
    display: flex;
    align-items: center;
    width: 100%;

    &:nth-child(1) {
      visibility: ${({ $isProjectSettingsOpen }) =>
        $isProjectSettingsOpen ? "hidden" : "visible"};
      justify-content: flex-end;

      > div {
        display: flex;
        column-gap: 5px;
        font-size: 16px;
        font-weight: 300;
        width: 471.39px;

        span:nth-child(2) {
          color: #000;
        }
      }

      span {
        color: #999;
      }

      a {
        color: ${({ $isHref }) => ($isHref ? "#999" : "#f4846b")};
      }
    }

    &:nth-child(2) {
      justify-content: space-between;

      h3 {
        font-size: 50px;
        margin: 0;
        font-weight: 300;

        &:nth-child(2) {
          opacity: 0.3;
        }
      }

      > div {
        display: flex;
        column-gap: 20px;
        align-items: center;

        > div {
          display: flex;
          align-items: center;
          column-gap: 10px;
          font-size: 18px;
          color: #000;
          cursor: pointer;

          &:nth-child(1) {
            svg {
              width: 27px;
              height: 27px;
            }
          }
        }
      }
    }
  }

  @media (hover: hover) {
    > div:nth-child(2) > div > div span:hover,
    > div:nth-child(2) > div > div div:hover {
      color: #f4846b;
    }
  }
`;

const ProjectMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
`;

const ProjectMainContainerHeader = styled.div`
  font-size: 18px;
  font-weight: 300;
  opacity: 0.5;
  padding: 35px 0 30px;
`;

const ProjectMainCardPageName = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  > div {
    display: flex;
  }

  > a {
    display: flex;
    column-gap: 10px;
  }

  input {
    border: none;
    outline: none;
    font-family: inherit;
    padding: 0;
  }

  span,
  input {
    font-size: 17px;
  }

  > div {
    display: flex;
    column-gap: 10px;

    svg {
      visibility: hidden;
      opacity: 0.3;
    }
  }
`;

const ProjectMainCardGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div {
    font-size: 10px;
    border: 1px solid;
    padding: 5px 10px;
    border-radius: 5px;
  }

  @media (hover: hover) {
    > div:hover {
      border-color: #f4846b;
    }
  }

  ${({ $isActive }) =>
    $isActive
      ? `
    > div {
      background-color: #f4846b;
      border-color: #f4846b;
      color: #fff;
    }
  `
      : `> div { border-color: #edede9;}`}
`;

const ProjectMainCardAction = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  visibility: hidden;
  justify-content: flex-end;

  > div {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 10px;
  }
`;

const ProjectMainCardPage = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  height: 60px;

  a {
    color: #000;
  }

  > :nth-child(2) {
    color: #979797;
    text-align: left;
  }

  @media (hover: hover) {
    > :nth-child(1):hover a,
    > :nth-child(2):hover span,
    > :nth-child(4) > div:hover {
      color: #f4846b;
    }

    > :nth-child(1) > div svg:hover,
    > :nth-child(2) > div svg:hover {
      opacity: 1;
    }

    &:hover > :nth-child(1) > div svg,
    &:hover > :nth-child(2) > div svg,
    &:hover > :nth-child(4) {
      visibility: visible;
    }
  }
`;

const ProjectMainCardTable = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  padding-left: 25px;
  padding-bottom: 20px;
  font-size: 14px;

  .rc-table {
    width: 100%;
  }

  table {
    border-collapse: collapse; /* Важно для корректного отображения границ */
    width: 100%;
  }

  th {
    height: 40px;
    text-align: left;
    padding: 0;
  }

  tr {
    border-bottom: 1px solid rgba(213, 213, 213, 0.4); /* Толщина, стиль и цвет линии */

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 10px 0;
    vertical-align: top;
    line-height: 1.5;

    &:nth-child(3) {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      max-height: calc(1.5 * 3 * 1em + 15px);
      max-width: 600px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
`;

const ProjectMainCardTableActions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const ProjectMainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d5d5d5;
  cursor: pointer;
`;

const ProjectSettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 225px 1fr;
  background: #fff;
  border: 1px solid #e7e7e7;
  max-width: 1280px;
  margin: 0 auto;
`;

const ProjectSettingsTitles = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

const ProjectSettingsTitlesTitle = styled.div`
  padding: 18px 30px;
  transition-duration: 0.1s;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
  font-weight: 400;
  font-size: 18px;

  ${({ $isTitleActive }) =>
    $isTitleActive && "background-color: #fa876b; color: #fff;"};

  @media (hover: hover) {
    &:hover {
      ${({ $isTitleActive }) =>
        !$isTitleActive &&
        "background-color: rgba(0, 0, 0, 0.03); color: #fa876b; cursor: pointer;"};
    }
  }
`;

const ProjectSettingsActions = styled.div`
  padding: 60px 150px;
  display: flex;
  justify-content: center;
`;

const ProjectSettingsProjectMain = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  width: 100%;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    input {
      font-size: 24px;
      font-weight: 300;
      color: #000;
    }
  }
`;

const ProjectSettingsFontsAndColors = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    select,
    input {
      font-size: 24px;
      font-weight: 300;
      color: #000;
    }
  }
`;

const ProjectSettingsMainPage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;

  select {
    font-size: 24px;
    font-weight: 300;
    color: #000;
    cursor: pointer;
  }

  > div:last-child {
    font-size: 15px;
    font-weight: 300;
    color: #333;
    padding: 20px 0 10px;
  }
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

const RadiusInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
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

const ColorChange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;

  transition-duration: 0.3s;
  transition-property: border-color, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  button {
    margin-left: auto;
    visibility: hidden;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #ff855d;

      button {
        visibility: visible;
      }
    }

    button:hover {
      scale: 0.9;
    }
  }
`;

const ColorCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  ${({ $backgroundColor }) =>
    $backgroundColor === "transparent"
      ? `background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='//www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%23CCC' d='M0 0h5v5H0zM5 5h5v5H5z'/%3E%3Cpath fill='%23fff' d='M5 0h5v5H5zM0 5h5v5H0z'/%3E%3C/svg%3E")`
      : `background-color: ${$backgroundColor}`}
`;

const ColorInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: none;
  outline: none;

  &::placeholder {
    opacity: 0.6;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  margin: 20px 0;

  &.primary {
    &:not(:disabled) {
      background-color: #fa8669;
      border: none;
      color: white;
    }

    &:disabled {
      opacity: 0.4;
    }
  }

  &.secondary,
  &.primary:disabled {
    background: #fff;
    border: 1px solid #b7b7b7;
    color: #000;
  }

  @media (hover: hover) {
    &.secondary:hover {
      border-color: #fa8669;
    }
  }
`;

export {
  ProjectHeaderContainer,
  ProjectMainContainer,
  ProjectMainCardContainer,
  ProjectMainContainerHeader,
  ProjectSettingsContainer,
  ProjectSettingsTitles,
  ProjectSettingsTitlesTitle,
  ProjectSettingsActions,
  ProjectSettingsMainPage,
  ProjectMainCardPageName,
  ProjectSettingsProjectMain,
  ProjectSettingsFontsAndColors,
  ProjectMainCardAction,
  PaddingSelect,
  RadiusInput,
  SettingsLabel,
  ColorChange,
  ColorCircle,
  ColorInput,
  ProjectMainCardPage,
  ProjectMainCardTable,
  ProjectMainCardTableActions,
  Button,
  ProjectMainCardGroup,
};
