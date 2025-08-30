import React from "react";
import {
  AuthorStyled,
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
} from "./event.page.styles";
import ImageConstructor from "../Image/image.constructor";
import Editor from "../Editor/editor";
import { formatDate, formatTime } from "../../../../helpers";
import { updateBlockRequest } from "../../../../features/block/blockSlice";
import { useDispatch } from "react-redux";

const EventPageConstructor = ({
  setEvent,
  event,
  blockId,
  backgroundColor,
}) => {
  const dispatch = useDispatch();
  const today = event.date || new Date();
  const { dateText, weekday } = formatDate(today);
  const time = formatTime(today);

  const updateText = (newText) => {
    dispatch(
      updateBlockRequest({
        id: blockId,
        content: {
          text: newText,
        },
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
          <ImageConstructor
            blockId={blockId}
            text={event.picture_id}
            borderRadius="5"
            updateImage={(newImage) =>
              setEvent({ ...event, picture_id: newImage })
            }
          />
        </EventImageMobileStyled>
        <TextStyled>
          <EventTextStyled>{event.title}</EventTextStyled>
        </TextStyled>
        {/*<TextStyled>*/}
        {/*  <EventTextStyled>*/}
        {/*    {event.author?.name || "Имя Автора"}*/}
        {/*  </EventTextStyled>*/}
        {/*</TextStyled>*/}
        <TextStyled>
          <Editor
            text={event.text}
            type="text"
            backgroundColor={backgroundColor}
            blockId={blockId}
            updateText={updateText}
          />
        </TextStyled>
        {/*<AuthorStyled>*/}
        {/*  <ImageConstructor*/}
        {/*    blockId={blockId}*/}
        {/*    text={event.author?.image}*/}
        {/*    borderRadius="50"*/}
        {/*    updateImage={(newImage) =>*/}
        {/*      setEvent({*/}
        {/*        ...event,*/}
        {/*        author: { ...event.author, image: newImage },*/}
        {/*      })*/}
        {/*    }*/}
        {/*  />*/}
        {/*  <Editor*/}
        {/*    text={"<div>Об авторе</div>"}*/}
        {/*    type="author"*/}
        {/*    backgroundColor={"#ffff"}*/}
        {/*    blockId={blockId}*/}
        {/*    updateText={updateAuthor}*/}
        {/*  />*/}
        {/*</AuthorStyled>*/}
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={!!event.canceled}>
        <ImageConstructor
          blockId={blockId}
          text={event.picture_id}
          borderRadius="5"
          updateImage={(newImage) =>
            setEvent({ ...event, picture_id: newImage })
          }
        />
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

export default EventPageConstructor;
