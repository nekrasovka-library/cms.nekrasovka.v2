import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  EventCardStyled,
  DateTimeSectionStyled,
  DateTimeHeaderStyled,
  DateTextStyled,
  LocationTextStyled,
  TitleSectionStyled,
  EventTitleStyled,
  EventSubtitleStyled,
  FooterSectionStyled,
  PriceTagStyled,
  TagsSectionStyled,
  WeekdayStyled,
  TimeStyled,
} from "./event.card.styles";
import { CONFIG } from "./event.card.constants";

const EventCard = ({
  event,
  formatDate,
  formatTime,
  loading,
  projectId,
  eventId,
  pageId,
}) => {
  const { dateText, weekday } = formatDate(event.date);
  const time = formatTime(event.date);
  const backgroundImageUrl =
    process.env.REACT_APP_IMAGES_URL + event.picture_id + "/medium";
  const eventText = event.text.replace(/<[^>]*>/g, "");

  useEffect(() => {
    if (event.canceled) {
      // Добавляем стили для отмененного события
      const style = document.createElement("style");
      style.textContent = `.event-card-${eventId}.error::before { background-image: url('${backgroundImageUrl}'); }`;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [event.canceled, backgroundImageUrl, eventId]);

  return (
    <EventCardStyled
      $loading={loading}
      $backgroundImage={event.canceled ? "none" : backgroundImageUrl}
      $isError={event.canceled}
      className={
        event.canceled ? `event-card-${eventId} error` : `event-card-${eventId}`
      }
    >
      <DateTimeSectionStyled>
        <DateTimeHeaderStyled>
          <div>
            <DateTextStyled $loading={loading}>{dateText}</DateTextStyled>
            <WeekdayStyled $loading={loading}>{weekday}</WeekdayStyled>
          </div>
          <TimeStyled $loading={loading}>{time}</TimeStyled>
        </DateTimeHeaderStyled>
        {loading ? (
          <LocationTextStyled $loading={loading}>
            {event.geo}
          </LocationTextStyled>
        ) : event.canceled ? (
          <LocationTextStyled $isError={event.canceled}>
            {CONFIG.CANCELLED_EVENT_MESSAGE}
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
      </DateTimeSectionStyled>
      <TitleSectionStyled as={Link} to={`/projects/${projectId}/${pageId}`}>
        <EventTitleStyled $loading={loading}>{event.title}</EventTitleStyled>
        {!event.canceled && (
          <EventSubtitleStyled $loading={loading}>
            {eventText}
          </EventSubtitleStyled>
        )}
      </TitleSectionStyled>
      <FooterSectionStyled $loading={loading}>
        {!!event.price && <PriceTagStyled>Платное</PriceTagStyled>}
        <TagsSectionStyled>
          <div></div>
          <span>{event.restriction}</span>
        </TagsSectionStyled>
      </FooterSectionStyled>
    </EventCardStyled>
  );
};

export default EventCard;
