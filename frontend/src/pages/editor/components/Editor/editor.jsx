import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOOLBAR_OPTIONS } from "./editor.constants";
import { EditorComponent, EditorContainer } from "./editor.styles";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { resetBlock, setBlock } from "../../../../features/block/blockSlice";

const Editor = ({
  text,
  type,
  blockId,
  backgroundColor,
  tracks,
  updateText,
  gap,
  maxWidth,
}) => {
  const dispatch = useDispatch();
  const block = useSelector(({ block }) => block);
  const fonts = useSelector(({ fonts }) => fonts);
  const project = useSelector(({ project }) => project);
  const { isDecorationVisible, isContentVisible, isMenusVisible } = useSelector(
    ({ visibility }) => visibility,
  );
  const [content, setContent] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [blockFocused, setBlockFocused] = useState(null);
  const textArray = Array.isArray(text) ? text : [text];
  const isModal = isMenusVisible || isDecorationVisible || isContentVisible;
  const options = {
    defaultStyle: `height: 100%; font-size: 16px; color: ${project.items.styles?.color}; font-family: ${project.items.styles?.fontFamily}, sans-serif;`,
    font: fonts.items.map((font) => font.name),
    resizingBar: false,
    buttonList: TOOLBAR_OPTIONS,
  };

  const handleContentChange = (newContent) => {
    if (textArray[blockFocused] !== newContent) {
      setContent(newContent);
      setIsContentChanged(true);
    }
  };

  const handleEditorFocused = (index) => {
    dispatch(setBlock({ id: `${blockId}_${type}_${index}` }));
    setBlockFocused(index);
  };

  const handleEditorBlur = () => {
    dispatch(resetBlock());
    setBlockFocused(null);
  };

  const updateTextByTracks = () => {
    const newTextArray = [...textArray];

    if (tracks > newTextArray.length) {
      const count = tracks - newTextArray.length;
      for (let i = 0; i < count; i++) {
        newTextArray.push(newTextArray[0]);
      }
    } else {
      const count = newTextArray.length - tracks;
      for (let i = 0; i < count; i++) {
        newTextArray.pop();
      }
    }

    updateText(newTextArray);
  };

  useEffect(() => {
    if (isContentChanged && blockFocused !== null) {
      setIsContentChanged(false);

      if (Array.isArray(text)) {
        const newContents = [...textArray];
        newContents[blockFocused] = content;

        updateText(newContents);
      } else {
        updateText(content);
      }
    }
  }, [isContentChanged, blockFocused]);

  useEffect(() => {
    if (tracks !== undefined && tracks !== textArray.length) {
      updateTextByTracks();
    }
  }, [tracks]);

  return (
    <EditorContainer $gap={gap} $tracks={tracks} $maxWidth={maxWidth}>
      {textArray.map((item, index) => {
        const isEditorFocused =
          block.items.id === `${blockId}_${type}_${index}` &&
          blockFocused === index;

        return (
          <EditorComponent
            key={index}
            $isModal={isModal}
            $isEditorFocused={isEditorFocused}
            $backgroundColor={backgroundColor}
          >
            <SunEditor
              lang="ru"
              setContents={item}
              onClick={() => handleEditorFocused(index)}
              onChange={handleContentChange}
              onBlur={handleEditorBlur}
              setOptions={options}
            />
          </EditorComponent>
        );
      })}
    </EditorContainer>
  );
};

export default Editor;
