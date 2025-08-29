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
  index,
  formatDate,
  formatTime,
  createBackgroundImageUrl,
  isEventCancelled,
  loading,
  projectId,
}) => {
  const { dateText, weekday } = formatDate(event.date);
  const time = formatTime(event.time_start);
  const backgroundImageUrl = createBackgroundImageUrl(event.picture_id);
  const eventCancelled = isEventCancelled(event);
  const eventText = event.text.replace(/<[^>]*>/g, "");

  useEffect(() => {
    if (eventCancelled) {
      // Добавляем стили для отмененного события
      const style = document.createElement("style");
      style.textContent = `.event-card-${index}.error::before { background-image: url('${backgroundImageUrl}'); }`;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [eventCancelled, backgroundImageUrl, index]);

  return (
    <EventCardStyled
      $loading={loading}
      $backgroundImage={eventCancelled ? "none" : backgroundImageUrl}
      $isError={eventCancelled}
      className={
        eventCancelled ? `event-card-${index} error` : `event-card-${index}`
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
        ) : eventCancelled ? (
          <LocationTextStyled $isError={eventCancelled}>
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
      <TitleSectionStyled
        as={Link}
        to={`${projectId ? "/projects/" + projectId : ""}/3/${event.id}`}
      >
        <EventTitleStyled $loading={loading}>{event.title}</EventTitleStyled>
        {!eventCancelled && (
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
