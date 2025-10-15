import React from "react";
import {
  AuthorCardStyled,
  TeamPersonComponent,
  TeamPersonStyled,
} from "./team.person.styles";
import Editor from "../Editor/editor";
import { updateBlockRequest } from "../../../../features/block/blockSlice";
import { useDispatch } from "react-redux";
import { calculateBlockWidth } from "../../../../helpers";
import ImageConstructor from "../Image/image.constructor";

const TeamPerson = ({
  content,
  backgroundColor,
  paddingTop,
  paddingBottom,
  blockId,
  maxWidth,
}) => {
  const dispatch = useDispatch();
  maxWidth = calculateBlockWidth(maxWidth);

  const updateText = (newText) => {
    dispatch(
      updateBlockRequest({
        id: blockId,
        content: { text: newText },
      }),
    );
  };

  const updateImage = (newText) => {
    dispatch(
      updateBlockRequest({
        id: blockId,
        content: { picture_id: newText[0] },
      }),
    );
  };

  return (
    <TeamPersonStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <TeamPersonComponent $maxWidth={maxWidth}>
        <AuthorCardStyled>
          <ImageConstructor
            text={content.picture_id}
            borderRadius="50"
            updateImage={updateImage}
            blockId={blockId}
          />
          <div>
            <Editor
              text={content.text}
              type="text"
              blockId={blockId}
              updateText={updateText}
            />
          </div>
        </AuthorCardStyled>
      </TeamPersonComponent>
    </TeamPersonStyled>
  );
};

export default TeamPerson;
