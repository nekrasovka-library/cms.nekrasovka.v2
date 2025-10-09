import React, { useState } from "react";
import {
  BlankBlockActionButtons,
  BlankBlockAddButton,
  BlankBlockDots,
  BlockConstructorContainer,
} from "./block.styles";
import Tooltip from "../../../../nekrasovka-ui/Tooltip/tooltip";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlockRequest,
  deleteBlockRequest,
  setBlock,
  updateBlockRequest,
} from "../../../../features/block/blockSlice";
import {
  setContentVisibility,
  setDecorationVisibility,
  setMenusVisibility,
} from "../../../../features/visibility/visibilitySlice";
import { useParams } from "react-router-dom";

const Block = ({
  styles = {},
  settings = {},
  content = {},
  type = "",
  position = 0,
  pageId,
  blockId,
  totalBlocks,
  COMPONENT,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { isDecorationVisible, isContentVisible, isMenusVisible } = useSelector(
    ({ visibility }) => visibility,
  );
  const [isBlankBlockFocused, setIsBlankBlockFocused] = useState(!blockId);

  const canMoveUp = () => position !== 1;
  const canMoveDown = () => position !== totalBlocks;

  const isBlankBlockActive =
    (isBlankBlockFocused &&
      !isContentVisible &&
      !isDecorationVisible &&
      !isMenusVisible) ||
    totalBlocks === 0;

  const handleDeleteBlock = () => {
    dispatch(deleteBlockRequest({ id: blockId, blockId: params.blockId }));
  };

  const handleCopyBlock = () => {
    dispatch(
      createBlockRequest({
        pageId,
        styles,
        settings,
        content,
        type,
        position: position + 1,
        ...(params.blockId && { blockId: params.blockId }),
      }),
    );
  };

  const handleMenus = () => {
    dispatch(setMenusVisibility());
    dispatch(
      setBlock({
        id: blockId,
        styles,
        settings,
        content,
        type,
        position,
        pageId,
      }),
    );
  };

  const handleBlockDecoration = () => {
    dispatch(setDecorationVisibility());
    dispatch(
      setBlock({ id: blockId, styles, settings, content, type, position }),
    );
  };

  const handleBlockContent = () => {
    dispatch(setContentVisibility());
    dispatch(
      setBlock({ id: blockId, styles, settings, content, type, position }),
    );
  };

  const handleBlockMove = (direction) => {
    const actionType = direction === "up" ? position - 1 : position + 1;

    dispatch(
      updateBlockRequest({
        id: blockId,
        position: actionType,
        ...(params.blockId && { blockId: params.blockId }),
      }),
    );
  };

  const handleMouseOut = () => setIsBlankBlockFocused(false);
  const handleMouseOver = () => setIsBlankBlockFocused(true);

  const renderContent = () => {
    const ContentComponent = COMPONENT;

    const params = {
      type,
      blockId,
      styles,
      content,
      settings,
      ...styles,
      ...content,
      ...settings,
    };

    return <ContentComponent {...params} />;
  };

  return (
    <BlockConstructorContainer
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      {blockId && renderContent()}

      {blockId && (
        <BlankBlockActionButtons $isBlankBlockFocused={isBlankBlockActive}>
          <Tooltip text="Контент">
            <Icon icon="edit" type="button" onClick={handleBlockContent} />
          </Tooltip>

          <Tooltip text="Оформление">
            <Icon
              icon="settings"
              type="button"
              onClick={handleBlockDecoration}
            />
          </Tooltip>

          <Tooltip text="Дублировать блок">
            <Icon icon="copy" type="button" onClick={handleCopyBlock} />
          </Tooltip>

          <Tooltip text="Удалить блок">
            <Icon icon="trash" type="button" onClick={handleDeleteBlock} />
          </Tooltip>

          {canMoveUp() && (
            <Tooltip text="Переместить вверх">
              <Icon
                icon="arrowUp"
                type="button"
                onClick={() => handleBlockMove("up")}
              />
            </Tooltip>
          )}

          {canMoveDown() && (
            <Tooltip text="Переместить вниз">
              <Icon
                icon="arrowDown"
                type="button"
                onClick={() => handleBlockMove("down")}
              />
            </Tooltip>
          )}
        </BlankBlockActionButtons>
      )}

      <BlankBlockAddButton $isBlankBlockFocused={isBlankBlockActive}>
        <Tooltip text="Добавить блок">
          <Icon icon="add" type="button" onClick={handleMenus} />
        </Tooltip>
      </BlankBlockAddButton>
      <BlankBlockDots $isBlankBlockFocused={isBlankBlockActive} />
    </BlockConstructorContainer>
  );
};

export default Block;
