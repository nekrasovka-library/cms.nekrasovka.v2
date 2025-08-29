import React from "react";
import TextConstructor from "./text.constructor";
import TextPreview from "./text.preview";
import { TextContainer } from "./text.styles";
import { calculateBlockWidth } from "../../../../helpers";
import { useSelector } from "react-redux";

const Text = ({
  blockId,
  text,
  backgroundColor,
  textAlign,
  gap,
  tracks,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);
  maxWidth = calculateBlockWidth(maxWidth);

  return (
    <TextContainer
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
      $backgroundColor={backgroundColor}
    >
      {isPreviewVisible ? (
        <TextPreview
          backgroundColor={backgroundColor}
          textAlign={textAlign}
          gap={gap}
          tracks={tracks}
          text={text}
          maxWidth={maxWidth}
        />
      ) : (
        <TextConstructor
          text={text}
          blockId={blockId}
          backgroundColor={backgroundColor}
          textAlign={textAlign}
          gap={gap}
          tracks={tracks}
          maxWidth={maxWidth}
        />
      )}
    </TextContainer>
  );
};

export default Text;
