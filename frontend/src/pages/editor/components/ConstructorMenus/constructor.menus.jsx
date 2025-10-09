import React from "react";
import {
  CloseMenuButton,
  Container1,
  Container2,
  Header,
  Main,
  MainItem1,
  MainItem2,
} from "./constructor.menus.styles";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../../../nekrasovka-ui/Icon/icon.jsx";
import { setMenusVariants } from "../../../../features/menus/menusSlice";
import {
  createBlockRequest,
  resetBlock,
} from "../../../../features/block/blockSlice";
import { setMenusVisibility } from "../../../../features/visibility/visibilitySlice";

const ConstructorMenus = () => {
  const dispatch = useDispatch();
  const { isMenusVisible } = useSelector(({ visibility }) => visibility);
  const menus = useSelector(({ menus }) => menus);
  const page = useSelector(({ page }) => page);
  const block = useSelector(({ block }) => block);
  const route = useSelector(({ route }) => route);

  const handleClose = () => {
    dispatch(setMenusVisibility());
    dispatch(resetBlock());
  };

  const handleActive = (id) => {
    dispatch(setMenusVariants({ id }));
  };

  const handleVariant = (id) => {
    const variant = menus.variants.find((item) => item.id === id);
    dispatch(
      createBlockRequest({
        ...variant,
        pageId: page.items.id,
        position: block.items.position + 1,
        ...(route.params.blockId && { blockId: route.params.blockId }),
      }),
    );

    handleClose();
  };

  return (
    <>
      <Container1
        $isMenuOpen={isMenusVisible}
        $isVariantOpen={menus.isVariantsLoaded}
      >
        <Header>
          <CloseMenuButton>
            <Icon icon="closeMenu" type="button" onClick={handleClose} />
          </CloseMenuButton>
        </Header>
        <Main>
          {menus.items.map(({ id, name }, index) => {
            const isMenuItemActive = id === menus.id;

            return (
              <MainItem1
                $isMenuItemActive={isMenuItemActive}
                key={index}
                onClick={() => handleActive(id)}
              >
                {name}
              </MainItem1>
            );
          })}
        </Main>
      </Container1>
      <Container2 $isMenuOpen={menus.isVariantsLoaded && isMenusVisible}>
        <Main>
          {menus.variants.map(({ id, image }, index) => {
            return (
              <MainItem2 key={index} onClick={() => handleVariant(id)}>
                <img
                  src={`${process.env.REACT_APP_URL}/images/${image}`}
                  alt="preview"
                />
              </MainItem2>
            );
          })}
        </Main>
      </Container2>
    </>
  );
};

export default ConstructorMenus;
