import React from "react";
import { DividerComponent, DividerContainer } from "./divider.styles.js";
import { calculateBlockWidth } from "../../../../helpers";

const Divider = ({
  color,
  opacity,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);

  return (
    <DividerContainer
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <DividerComponent
        $color={color}
        $opacity={opacity}
        $maxWidth={maxWidth}
      />
    </DividerContainer>
  );
};

export default Divider;
