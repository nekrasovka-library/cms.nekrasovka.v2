import React from "react";
import {
  AuthorCardStyled,
  AuthorNameStyled,
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
import ImagePreview from "../Image/image.preview";

const AfishaEventPreview = ({ event, loading }) => {
  return (
    <>
      <LeftSectionStyled $isEventCancelled={event.canceled} $loading={loading}>
        {event.canceled && (
          <EventCanceled>
            Мероприятие отменено. Приносим извинения за возможные неудобства
          </EventCanceled>
        )}
        <DateTimeStyled>
          <div>
            <DateTextStyled $loading={loading}>{event.dateText}</DateTextStyled>
            <WeekdayStyled $loading={loading}>{event.weekday}</WeekdayStyled>
            <TimeStyled $loading={loading}>{event.time}</TimeStyled>
          </div>
          <RestrictionStyled $loading={loading}>
            {event.restriction}
          </RestrictionStyled>
        </DateTimeStyled>
        {loading ? (
          <LocationTextStyled $loading={loading}>
            {event.geo}
          </LocationTextStyled>
        ) : (
          <LocationTextStyled
            as="a"
            href={event.geo_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.geo}
          </LocationTextStyled>
        )}
        <EventImageMobileStyled $isEventCancelled={event.canceled}>
          <ImagePreview text={event.picture_id} borderRadius="5" />
        </EventImageMobileStyled>
        <TextStyled>
          <EventTitleStyled $loading={loading}>{event.title}</EventTitleStyled>
        </TextStyled>
        {event.author && (
          <TextStyled>
            <AuthorNameStyled $loading={loading}>
              {event.author_name}
            </AuthorNameStyled>
          </TextStyled>
        )}
        <TextStyled>
          <EventTextStyled
            $loading={loading}
            dangerouslySetInnerHTML={{ __html: event.text }}
          />
        </TextStyled>
        {event.author && (
          <AuthorCardStyled $loading={loading}>
            <ImagePreview text={event.author.image} borderRadius="50" />
            <div>
              <span>{event.author_name},</span>{" "}
              <span> {event.author_text}</span>
            </div>
          </AuthorCardStyled>
        )}
      </LeftSectionStyled>
      <RightSectionStyled $isEventCancelled={event.canceled}>
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

export default AfishaEventPreview;
