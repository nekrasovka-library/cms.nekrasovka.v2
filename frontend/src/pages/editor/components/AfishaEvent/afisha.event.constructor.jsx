import React from "react";
import {
  ButtonsCalendarContainerMobileStyled,
  DateTextStyled,
  DateTimeStyled,
  EventCanceled,
  EventImageMobileStyled,
  EventTextStyled,
  LeftSectionStyled,
  LocationTextStyled,
  RestrictionStyled,
  RightSectionButtonCalendarStyled,
  RightSectionButtonRegistrationStyled,
  RightSectionStyled,
  TextStyled,
  TimeStyled,
  WeekdayStyled,
} from "./afisha.event.styles";
import Editor from "../Editor/editor";
import { formatDate, formatTime } from "../../../../helpers";
import { updateBlockRequest } from "../../../../features/block/blockSlice";
import { useDispatch } from "react-redux";
import ImagePreview from "../Image/image.preview";

const AfishaEventConstructor = ({
  blockId,
  content,
  settings,
  backgroundColor,
}) => {
  const dispatch = useDispatch();
  const today = content.date || new Date();
  const { dateText, weekday } = formatDate(today);
  const time = formatTime(today);

  const updateText = (newText) => {
    dispatch(
      updateBlockRequest({
        id: blockId,
        content: newText,
      }),
    );
  };

  return (
    <>
      <LeftSectionStyled $isEventCancelled={!!settings.is_canceled}>
        {!!settings.is_canceled && (
          <EventCanceled>
            Мероприятие отменено. Приносим извинения за возможные неудобства
          </EventCanceled>
        )}
        <DateTimeStyled>
          <div>
            <DateTextStyled>{dateText}</DateTextStyled>
            <WeekdayStyled>{weekday}</WeekdayStyled>
            <TimeStyled>{time}</TimeStyled>
          </div>
          <RestrictionStyled>{content.restriction}</RestrictionStyled>
        </DateTimeStyled>
        <LocationTextStyled
          as="a"
          href={content.geo_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.geo}
        </LocationTextStyled>
        <EventImageMobileStyled $isEventCancelled={!!settings.is_canceled}>
          <ImagePreview text={content.picture_id} borderRadius="5" />
        </EventImageMobileStyled>
        <TextStyled>
          <EventTextStyled>
            <Editor
              text={content.title}
              type="title"
              backgroundColor={backgroundColor}
              blockId={blockId}
              updateText={updateText}
            />
          </EventTextStyled>
        </TextStyled>
        <TextStyled>
          <EventTextStyled>
            <Editor
              text={content.text}
              type="text"
              backgroundColor={backgroundColor}
              blockId={blockId}
              updateText={updateText}
            />
          </EventTextStyled>
        </TextStyled>
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={!!settings.is_canceled}>
        <ImagePreview text={content.picture_id} borderRadius="5" />
        {!content.is_canceled && !!settings.is_registration && (
          <div>
            <div>
              <RightSectionButtonRegistrationStyled>
                Регистрация
              </RightSectionButtonRegistrationStyled>
            </div>
            <div>
              <RightSectionButtonCalendarStyled>
                Добавить в Google.Календарь
              </RightSectionButtonCalendarStyled>
              <RightSectionButtonCalendarStyled>
                Добавить в Яндекс.Календарь
              </RightSectionButtonCalendarStyled>
            </div>
          </div>
        )}
      </RightSectionStyled>
      {!content.is_canceled && !!settings.is_registration && (
        <ButtonsCalendarContainerMobileStyled>
          <RightSectionButtonRegistrationStyled>
            Регистрация
          </RightSectionButtonRegistrationStyled>
          <div>
            <RightSectionButtonCalendarStyled>
              Добавить в Google.Календарь
            </RightSectionButtonCalendarStyled>
            <RightSectionButtonCalendarStyled>
              Добавить в Яндекс.Календарь
            </RightSectionButtonCalendarStyled>
          </div>
        </ButtonsCalendarContainerMobileStyled>
      )}
    </>
  );
};

export default AfishaEventConstructor;
