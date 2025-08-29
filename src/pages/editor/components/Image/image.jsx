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
  const dispatch = useDispatch();
  maxWidth = calculateBlockWidth(maxWidth);

  const updateImage = (newText) => {
    dispatch({
      type: "UPDATE_BLOCK",
      payload: {
        blockId,
        text: newText,
      },
    });
  };

  return (
    <ImageContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      {isPreviewVisible ? (
        <ImagePreview
          text={text}
          height={height}
          borderRadius={borderRadius}
          imgIndex={imgIndex}
          maxWidth={maxWidth}
        />
      ) : (
        <ImageConstructor
          blockId={blockId}
          tracks={tracks}
          text={text}
          imgIndex={imgIndex}
          height={height}
          borderRadius={borderRadius}
          maxWidth={maxWidth}
          updateImage={updateImage}
        />
      )}
    </ImageContainer>
  );
};

export default Image;
