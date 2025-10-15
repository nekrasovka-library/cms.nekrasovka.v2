import styled from "styled-components";
import { AFISHA_THEME } from "./team.person.constants";

// Извлеченные переменные для медиа-запросов
const DESKTOP_TABLET_MEDIA = `@media (min-width: ${AFISHA_THEME.breakpointTablet})`;
const MOBILE_MEDIA = `@media (max-width: ${AFISHA_THEME.breakpointMobile})`;

const SKELETON_LOADING_OVERLAY = `
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: skeleton-loading 2s infinite;
  }
`;

const ERROR_OVERLAY_STYLES = `
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${AFISHA_THEME.overlayOpacity};
    border-radius: ${AFISHA_THEME.borderRadius};
    z-index: 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  > * {
    position: relative;
    z-index: 2;
  }
`;

// Извлеченные переменные для повторяющихся стилей
const SKELETON_BASE_STYLES = `
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: transparent;
  filter: blur(1px);
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
`;

// Извлеченные переменные для анимаций
const SKELETON_LOADING_ANIMATION = `
  @keyframes skeleton-loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const SKELETON_PULSE_ANIMATION = `
  @keyframes skeleton-pulse {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

const AuthorCardStyled = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  width: 100%;

  ${DESKTOP_TABLET_MEDIA} {
    column-gap: 20px;

    div {
      &:nth-child(1) {
        img {
          width: 74px;
          height: 74px;
        }
      }

      &:nth-child(2) {
        font-size: 18px;
      }
    }
  }

  ${MOBILE_MEDIA} {
    column-gap: 10px;

    div {
      &:nth-child(1) {
        img {
          width: 40px;
          height: 40px;
        }
      }

      &:nth-child(2) {
        font-size: 12px;
      }
    }
  }

  ${({ $loading }) => $loading && SKELETON_BASE_STYLES};
  ${SKELETON_PULSE_ANIMATION};
`;

const TeamPersonStyled = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  color: ${AFISHA_THEME.primaryColor};

  ${({ $isError }) => $isError && ERROR_OVERLAY_STYLES};
  ${({ $loading }) => $loading && SKELETON_LOADING_OVERLAY};

  ${SKELETON_LOADING_ANIMATION}
  ${SKELETON_PULSE_ANIMATION}


  ${MOBILE_MEDIA} {
    padding-right: 15px;
    padding-left: 15px;
  }
`;

const TeamPersonComponent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

export { AuthorCardStyled, TeamPersonStyled, TeamPersonComponent };
