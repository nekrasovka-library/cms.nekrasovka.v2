import React from "react";
import {
  ButtonsCalendarContainerMobileStyled,
  DateTextStyled,
  DateTimeStyled,
  EventCanceled,
  EventImageMobileStyled,
  EventTextStyled,
  EventTitleStyled,
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

const AfishaEventConstructor = ({ blockId, event, backgroundColor }) => {
  const dispatch = useDispatch();
  const today = event.date || new Date();
  const { dateText, weekday } = formatDate(today);
  const time = formatTime(today);

  const updateText = (newText) => {
    dispatch(
      updateBlockRequest({
        id: blockId,
        content: { text: newText },
      }),
    );
  };

  return (
    <>
      <LeftSectionStyled $isEventCancelled={!!event.canceled}>
        {!!event.canceled && (
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
          <RestrictionStyled>{event.restriction}</RestrictionStyled>
        </DateTimeStyled>
        <LocationTextStyled
          as="a"
          href={event.geo_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {event.geo}
        </LocationTextStyled>
        <EventImageMobileStyled $isEventCancelled={!!event.canceled}>
          <ImagePreview text={event.picture_id} borderRadius="5" />
        </EventImageMobileStyled>
        <TextStyled>
          <EventTitleStyled>{event.title}</EventTitleStyled>
        </TextStyled>
        <TextStyled>
          <EventTextStyled>
            <Editor
              text={event.text}
              type="text"
              backgroundColor={backgroundColor}
              blockId={blockId}
              updateText={updateText}
            />
          </EventTextStyled>
        </TextStyled>
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={!!event.canceled}>
        <ImagePreview text={event.picture_id} borderRadius="5" />
        {!event.canceled && (
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
      {!event.canceled && (
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
