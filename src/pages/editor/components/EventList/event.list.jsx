import React, { useEffect } from "react";
import {
  DateTimeSectionStyled,
  EventListStyled,
  EventSubtitleStyled,
  EventTitleStyled,
  LocationTextStyled,
  RestrictionStyled,
  TitleSectionStyled,
} from "./event.list.styles";
import { Link } from "react-router-dom";
import { DateTextStyled, WeekdayStyled } from "../EventCard/event.card.styles";

const EventList = ({
  event,
  index,
  formatDate,
  formatTime,
  createBackgroundImageUrl,
  isEventCancelled,
  loading,
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
    <EventListStyled>
      <DateTimeSectionStyled>
        <div>
          <DateTextStyled $loading={loading}>{dateText}</DateTextStyled>
          <WeekdayStyled $loading={loading}>{weekday}</WeekdayStyled>
        </div>
        <time>{time}</time>
        <LocationTextStyled
          as="a"
          href={event.geo_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {event.geo}
        </LocationTextStyled>
      </DateTimeSectionStyled>
      <TitleSectionStyled as={Link} to={`${event.id}`}>
        <EventTitleStyled>{event.title}</EventTitleStyled>
        {!eventCancelled && (
          <EventSubtitleStyled>{eventText}</EventSubtitleStyled>
        )}
      </TitleSectionStyled>
      <RestrictionStyled>{event.restriction}</RestrictionStyled>
    </EventListStyled>
  );
};

export default EventList;
