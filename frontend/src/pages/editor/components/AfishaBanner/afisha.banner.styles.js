import styled from "styled-components";

const calculateTotalWidth = ({ $gap, $overhang }) => $gap * 2 + $overhang * 2;
const calculateTotalMargin = ({ $gap, $overhang }) => $gap + $overhang;

const CarouselContainer = styled.div`
  width: 100%;
  padding-top: ${({ $paddingTop }) => ($paddingTop ? `${$paddingTop}` : "0")};
  padding-bottom: ${({ $paddingBottom }) =>
    $paddingBottom ? `${$paddingBottom}` : "0"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const CarouselComponent = styled.div`
  position: relative;
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : "100%")};
  margin: 0 auto;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;

  @media (min-width: 769px) {
    column-gap: ${({ $gap }) => $gap}px;
    transition: transform 0.4s ease-in-out;
    transform: ${({ $offset }) => `translateX(-${$offset}px)`};
  }

  @media (max-width: 768px) {
    column-gap: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const CarouselItemTextTextarea = styled.textarea`
  background-color: inherit;
  border: none;
  padding: 0;
  outline: none;
  font-family: "Roboto", sans-serif;
  resize: none;
  overflow: hidden;
  height: auto;
`;

const CarouselItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  border: 1px solid ${({ $backgroundColor }) => $backgroundColor};
  background: ${({ $backgroundColor }) => $backgroundColor};
  text-align: left;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  ::placeholder {
    opacity: 0.6;
  }

  > div > :nth-child(1),
  > div > :nth-child(1)::placeholder {
    font-weight: 500;
    color: ${({ $color }) => $color};
  }

  > div > :nth-child(2),
  > div > :nth-child(2)::placeholder,
  > span {
    font-weight: 400;
    color: ${({ $color }) => $color};
  }

  > span {
    svg {
      margin-left: 8px;
    }
  }

  @media (min-width: 769px) {
    width: 564px;
    height: 204px;
    border-radius: 5px;
    left: 30px;
    bottom: 30px;
    padding: 30px;

    > div > :nth-child(1),
    > div > :nth-child(1)::placeholder {
      font-size: 24px;
    }

    > div > :nth-child(2),
    > div > :nth-child(2)::placeholder,
    > span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    width: 235px;
    height: 98px;
    left: 0;
    bottom: 0;
    padding: 15px;

    > div > :nth-child(1) {
      font-size: 14px;
    }

    > div > :nth-child(2) {
      font-size: 12px;
    }

    > span {
      display: none;
    }
  }
`;

const CarouselItem = styled.div`
  position: relative;

  @media (min-width: 769px) {
    flex: 0 0 calc(100% - ${calculateTotalWidth}px);

    &:first-child {
      margin-left: ${calculateTotalMargin}px;
    }

    &:last-child {
      margin-right: ${calculateTotalMargin}px;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 248px;
      height: 248px;
    }
  }
`;

const DotContainer = styled.div`
  @media (min-width: 769px) {
    display: flex;
    justify-content: center;
    column-gap: 5px;
    position: absolute;
    right: 30px;
    bottom: 30px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#346178" : "#EDEEE9")};
  ${({ $isActive }) => !$isActive && "border: 2px solid #346178;"};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: #346178;
      border: none;
    }
  }
`;

const CarouselButton = styled.div`
  @media (min-width: 769px) {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 100;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CarouselButtonLeft = styled(CarouselButton)`
  left: -20px;

  svg {
    transform: rotate(180deg);
  }
`;

const CarouselButtonRight = styled(CarouselButton)`
  right: -20px;
`;

export {
  CarouselWrapper,
  CarouselTrack,
  CarouselItem,
  DotContainer,
  Dot,
  CarouselButtonLeft,
  CarouselButtonRight,
  CarouselContainer,
  CarouselComponent,
  CarouselItemText,
  CarouselItemTextTextarea,
};
