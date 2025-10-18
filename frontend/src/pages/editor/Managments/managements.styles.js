import styled from "styled-components";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #333;
  border-right: 1px solid #eee;
  width: 240px;
  background-color: #fff;
`;

const MainItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
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

export { Container, MainItem };
