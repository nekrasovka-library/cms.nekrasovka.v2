import React, { useState } from "react";
import { Container, MainItem } from "./managements.styles";
import { Main } from "../components/ConstructorMenus/constructor.menus.styles";

const menuItems = [
  {
    name: "Баннеры",
    id: 14,
  },
];

const Managements = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <Container>
      <Main>
        {menuItems.map(({ id, name }, index) => {
          const isMenuItemActive = activeMenu === id;

          return (
            <MainItem
              $isMenuItemActive={isMenuItemActive}
              key={index}
              onClick={() => setActiveMenu(id)}
            >
              {name}
            </MainItem>
          );
        })}
      </Main>
    </Container>
  );
};

export default Managements;
