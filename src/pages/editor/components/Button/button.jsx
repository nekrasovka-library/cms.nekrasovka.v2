import React from "react";
import { ButtonContainer } from "./button.styles.js";
import { useSelector } from "react-redux";
import ButtonPreview from "./button.preview";
import ButtonConstructor from "./button.constructor";
import { calculateBlockWidth } from "../../../../helpers";

const Button = ({
  text,
  border,
  color,
  borderRadius,
  height,
  textAlign,
  blockId,
  backgroundColor,
  elementBackgroundColor,
  elementFontSize,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);
  maxWidth = calculateBlockWidth(maxWidth);

  return (
    <ButtonContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      {isPreviewVisible ? (
        <ButtonPreview
          maxWidth={maxWidth}
          elementBackgroundColor={elementBackgroundColor}
          text={text}
          border={border}
          color={color}
          borderRadius={borderRadius}
          height={height}
          textAlign={textAlign}
          elementFontSize={elementFontSize}
        />
      ) : (
        <ButtonConstructor
          maxWidth={maxWidth}
          elementBackgroundColor={elementBackgroundColor}
          text={text}
          border={border}
          color={color}
          borderRadius={borderRadius}
          height={height}
          textAlign={textAlign}
          blockId={blockId}
          elementFontSize={elementFontSize}
        />
      )}
    </ButtonContainer>
  );
};

export default Button;
