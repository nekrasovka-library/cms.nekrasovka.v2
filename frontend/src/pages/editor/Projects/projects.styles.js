import styled from "styled-components";

const ProjectsHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 35px 0 30px;
  max-width: 1280px;
  margin: 0 auto;

  > div {
    font-size: 18px;

    &:nth-child(1) {
      font-weight: 300;
      opacity: 0.5;
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
  }

  @media (hover: hover) {
    > div:nth-child(2) {
      cursor: pointer;

      &:hover {
        color: #f4846b;
      }
    }
  }
`;

const ProjectsCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
`;

const ProjectCardContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  transition-duration: 0.2s;
  transition-property: box-shadow, color, border-color;
  transition-timing-function: ease-in-out;
  position: relative;
  padding: 20px 30px 0;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #000;
  }

  > div {
    &:nth-child(1) {
      display: flex;
      height: 140px;
      border-bottom: 1px solid #d9d9d9;
      cursor: pointer;

      a {
        font-size: 36px;
        line-height: 1.2;
        font-weight: 300;
        text-overflow: ellipsis;
        width: 100%;
      }
    }

    &:nth-child(2) {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;

      > div {
        cursor: pointer;

        &:nth-child(1) {
          font-size: 12px;
          font-weight: 500;
        }

        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
      border-color: #fff;
    }

    > div:nth-child(1):hover a,
    > div:nth-child(2) > div a:hover {
      color: #f4846b;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111111;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 600px;
  padding: 15px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 30px 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 30px 15px 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

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

const FormTemplate = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  margin-top: 10px;
`;

const FormTemplateCard = styled.div`
  cursor: pointer;
  background-color: ${({ $isFormCardSelected }) =>
    $isFormCardSelected ? "rgba(238, 238, 238, 0.4)" : "#fff"};
  box-shadow: 0 1px 6px #eee;
  transition-duration: 0.3s;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;

  > div {
    &:nth-child(1) {
      img {
        height: auto;
        width: 100%;
      }
    }

    &:nth-child(2) {
      font-size: 16px;
      padding: 15px;

      h4 {
        font-weight: 700;
        margin: 0;
        color: ${({ $isFormCardSelected }) =>
          $isFormCardSelected ? "#f4846b" : "#000"};
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      background-color: rgba(238, 238, 238, 0.4);

      > div:nth-child(2) h4 {
        color: #f4846b;
      }
    }
  }
`;

const RadiusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
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

export {
  ProjectCardContainer,
  ProjectsHeaderContainer,
  ProjectsCardsContainer,
  ButtonGroup,
  Form,
  ModalContent,
  ModalOverlay,
  Button,
  FormTitle,
  FormTemplate,
  FormTemplateCard,
  RadiusContainer,
  RadiusInput,
  SettingsLabel,
};
