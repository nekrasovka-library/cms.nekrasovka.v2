import React from "react";
import {
  EventPageContainerStyled,
  EventPageStyled,
  PageTitleStyled,
} from "./afisha.event.styles";
import AfishaEventPreview from "./afisha.event.preview";
import AfishaEventConstructor from "./afisha.event.constructor";
import { calculateBlockWidth } from "../../../../helpers";
import { useSelector } from "react-redux";

const AfishaEvent = ({
  backgroundColor,
  paddingTop,
  paddingBottom,
  maxWidth,
  content,
  blockId,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);
  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);

  return (
    <EventPageStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <PageTitleStyled>
        <span>События</span>
        <span>Афиша</span>
      </PageTitleStyled>
      <EventPageContainerStyled $maxWidth={maxWidth}>
        {isPreviewVisible ? (
          <AfishaEventPreview event={content} />
        ) : (
          <AfishaEventConstructor
            event={content}
            backgroundColor={backgroundColor}
            blockId={blockId}
          />
        )}
      </EventPageContainerStyled>
    </EventPageStyled>
  );
};

export default AfishaEvent;
