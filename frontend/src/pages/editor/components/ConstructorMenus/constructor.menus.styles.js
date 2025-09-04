import styled from "styled-components";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  color: #333;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  border-right: 1px solid #eee;
`;

const Container1 = styled(Container)`
  width: 240px;
  z-index: 1120;
  left: 0;
  background-color: ${({ $isVariantOpen }) =>
    $isVariantOpen ? "rgb(242, 242, 242)" : "#fff"};
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")});
`;

const Container2 = styled(Container)`
  width: 360px;
  left: 240px;
  z-index: 1119;
  padding: 0 10px;
  background-color: #fff;
  transform: translateX(${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-200%")});
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
`;

const MainItem2 = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  border-bottom: 1px solid;
  border-bottom-color: #eee;
  cursor: pointer;
  transition-duration: 0.3s;
  transition-property: border, scale;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);

  img {
    width: 320px;
  }

  @media (hover: hover) {
    &:hover {
      border-bottom-color: #ff855d !important;
      scale: 0.95;
    }
  }
`;

const MainItem1 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  height: 45px;
  padding-left: 20px;
  transition-duration: 0.3s;
  transition-property: border, margin;
  transition-timing-function: cubic-bezier(0, 0, 0.8, 1);
  border-bottom: 1px solid #eee;
  border-right: ${({ $isMenuItemActive }) => ($isMenuItemActive ? "7px" : "0")}
    solid #ff855d;
  margin-left: ${({ $isMenuItemActive }) => ($isMenuItemActive ? "5px" : "0")};

  @media (hover: hover) {
    cursor: pointer;

    &:hover {
      margin-left: 5px;
    }
  }
`;

const CloseMenuButton = styled.div`
  @media (hover: hover) {
    :hover {
      svg {
        scale: 0.9;
      }
    }
  }
`;

export {
  Header,
  Main,
  MainItem1,
  CloseMenuButton,
  Container1,
  Container2,
  MainItem2,
};
