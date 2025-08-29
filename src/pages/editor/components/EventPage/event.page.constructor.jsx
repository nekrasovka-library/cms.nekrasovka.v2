import React, { useState } from "react";
import {
  AuthorStyled,
  ButtonsCalendarContainerMobileStyled,
  DateTextStyled,
  DateTimeStyled,
  EditInputComponentStyled,
  EditInputDateStyled,
  EditInputRestrictionStyled,
  EditSelectStyled,
  EventCanceled,
  EventImageMobileStyled,
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
import {
  formatDate,
  formatDateForInput,
  formatTime,
  formatUrl,
} from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { EVENT_GEO_OPTIONS } from "./event.page.constants";

const EventPageConstructor = ({
  setEvent,
  event,
  blockId,
  backgroundColor,
}) => {
  const dispatch = useDispatch();
  const contentData = useSelector((state) => state.content);
  const today = new Date();
  const [elementFocused, setElementFocused] = useState(null);
  const date = event.date
    ? event.date
    : `${formatDateForInput(today)}T${formatTime(today)}`;

  const updateCalendar = (newDate) => {
    const { dateText, weekday } = formatDate(newDate);
    const time = formatTime(newDate);
    const url = formatUrl(newDate, event.id);
    const date = `${formatDateForInput(today)}T${time}`;

    setEvent({ ...event, date, dateText, weekday, time, url });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          date,
          dateText,
          weekday,
          time,
          url,
        },
      },
    });
  };

  const updateAuthor = (newText) => {
    setEvent({
      ...event,
      author: { ...event.author, text: newText },
    });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          author: { ...contentData.data.next.author, text: newText },
        },
      },
    });
  };

  const updateAuthorName = (newText) => {
    setEvent({
      ...event,
      author: { ...event.author, name: newText },
    });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          author: { ...contentData.data.next?.author, name: newText },
        },
      },
    });
  };

  const updateText = (newText) => {
    console.log("❗", contentData.data);

    setEvent({ ...event, text: newText });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          text: newText,
        },
      },
    });
  };

  const updateTitle = (newText) => {
    setEvent({ ...event, title: newText });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          title: newText,
        },
      },
    });
  };

  const handleGeoChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = EVENT_GEO_OPTIONS.find(
      (option) => option.value === selectedValue,
    );

    setEvent({
      ...event,
      geo: selectedValue ? selectedValue : event.geo,
      geo_link: selectedOption ? selectedOption.geoUrl : event.geo_link,
    });
    dispatch({
      type: "UPDATE_CONTENT",
      payload: {
        next: {
          ...contentData.data.next,
          geo: selectedValue,
          geo_link: selectedOption.geoUrl,
        },
      },
    });
  };

  return (
    <>
      <LeftSectionStyled $isEventCancelled={event.canceled}>
        {event.canceled && (
          <EventCanceled>
            Мероприятие отменено. Приносим извинения за возможные неудобства
          </EventCanceled>
        )}
        <DateTimeStyled>
          {elementFocused === "date" ? (
            <EditInputComponentStyled>
              <EditInputDateStyled
                type="datetime-local"
                name="date"
                value={date}
                min={date}
                onBlur={() => setElementFocused(null)}
                onChange={(e) => updateCalendar(e.target.value)}
              />
            </EditInputComponentStyled>
          ) : (
            <div onClick={() => setElementFocused("date")}>
              <DateTextStyled>
                {event.dateText ? event.dateText : formatDate(today).dateText}
              </DateTextStyled>
              <WeekdayStyled>
                {event.weekday ? event.weekday : formatDate(today).weekday}
              </WeekdayStyled>
              <TimeStyled>
                {event.time ? event.time : formatTime(today)}
              </TimeStyled>
            </div>
          )}
          {elementFocused === "restriction" ? (
            <EditInputComponentStyled>
              <EditInputRestrictionStyled
                type="text"
                name="restriction"
                value={event.restriction || "0+"}
                onBlur={() => setElementFocused(null)}
                onChange={(e) =>
                  setEvent({ ...event, restriction: e.target.value })
                }
              />
            </EditInputComponentStyled>
          ) : (
            <RestrictionStyled onClick={() => setElementFocused("restriction")}>
              {event.restriction || "0+"}
            </RestrictionStyled>
          )}
        </DateTimeStyled>
        {elementFocused === "geo" ? (
          <EditSelectStyled
            as="select"
            name="geo"
            value={event.geo || EVENT_GEO_OPTIONS[0].label}
            onBlur={() => setElementFocused(null)}
            onChange={handleGeoChange}
          >
            {EVENT_GEO_OPTIONS.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </EditSelectStyled>
        ) : (
          <LocationTextStyled onClick={() => setElementFocused("geo")}>
            {event.geo || EVENT_GEO_OPTIONS[0].label}
          </LocationTextStyled>
        )}
        <EventImageMobileStyled $isEventCancelled={event.canceled}>
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
          <Editor
            text={contentData.data.prev?.title || "<div>Заголовок</div>"}
            type="title"
            backgroundColor={backgroundColor}
            blockId={blockId}
            updateText={updateTitle}
          />
        </TextStyled>
        <TextStyled>
          <Editor
            text={
              contentData.data.prev?.author?.name || "<div>Имя автора</div>"
            }
            type="author_name"
            backgroundColor={backgroundColor}
            blockId={blockId}
            updateText={updateAuthorName}
          />
        </TextStyled>
        <TextStyled>
          <Editor
            text={contentData.data.prev?.text || "<div>Текст</div>"}
            type="text"
            backgroundColor={backgroundColor}
            blockId={blockId}
            updateText={updateText}
          />
        </TextStyled>
        <AuthorStyled>
          <ImageConstructor
            blockId={blockId}
            text={event.author?.image}
            borderRadius="50"
            updateImage={(newImage) =>
              setEvent({
                ...event,
                author: { ...event.author, image: newImage },
              })
            }
          />
          <Editor
            text={contentData.data.prev?.author?.text || "<div>Об авторе</div>"}
            type="author"
            backgroundColor={"#ffff"}
            blockId={blockId}
            updateText={updateAuthor}
          />
        </AuthorStyled>
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={event.canceled}>
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
