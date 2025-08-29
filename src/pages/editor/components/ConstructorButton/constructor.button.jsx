import React from "react";
import { ConstructorButtonStyles } from "./constructor.button.styles";
import { setPreviewVisibility } from "../../../../features/visibility/visibilitySlice";
import { useDispatch } from "react-redux";

const ConstructorButton = () => {
  const dispatch = useDispatch();

  return (
    <ConstructorButtonStyles
      type="button"
      onClick={() => dispatch(setPreviewVisibility())}
    >
      <span>Вернуться к редактированию</span>
    </ConstructorButtonStyles>
  );
};

export default ConstructorButton;
