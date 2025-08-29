import React from "react";
import { useDispatch } from "react-redux";
import Editor from "../Editor/editor";
import { updateBlockRequest } from "../../../../features/block/blockSlice";

const TextConstructor = ({
  text,
  blockId,
  backgroundColor,
  gap,
  tracks,
  maxWidth,
}) => {
  const dispatch = useDispatch();

  const updateText = (newText) => {
    dispatch(updateBlockRequest({ id: blockId, content: { text: newText } }));
  };

  return (
    <Editor
      type="text"
      text={text}
      blockId={blockId}
      updateText={updateText}
      backgroundColor={backgroundColor}
      gap={gap}
      tracks={tracks}
      maxWidth={maxWidth}
    />
  );
};

export default TextConstructor;
