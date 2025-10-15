import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ImagePreview from "./image.preview";
import ImageConstructor from "./image.constructor";
import { ImageContainer } from "./image.styles";
import { calculateBlockWidth } from "../../../../helpers";

const Image = ({
  text,
  blockId,
  tracks,
  imgIndex,
  height,
  borderRadius,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);
  maxWidth = calculateBlockWidth(maxWidth);

  return (
    <ImageContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <ImagePreview
        text={text}
        height={height}
        borderRadius={borderRadius}
        imgIndex={imgIndex}
        maxWidth={maxWidth}
      />
    </ImageContainer>
  );
};

export default Image;
