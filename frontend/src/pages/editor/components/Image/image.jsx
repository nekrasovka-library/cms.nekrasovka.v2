import React from "react";
import ImagePreview from "./image.preview";
import { ImageContainer } from "./image.styles";
import { calculateBlockWidth } from "../../../../helpers";

const Image = ({
  content,
  imgIndex,
  height,
  borderRadius,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);

  return (
    <ImageContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <ImagePreview
        text={content.picture_id}
        height={height}
        borderRadius={borderRadius}
        imgIndex={imgIndex}
        maxWidth={maxWidth}
      />
    </ImageContainer>
  );
};

export default Image;
