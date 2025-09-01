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
  formatDate,
  formatTime,
  loading,
  projectId,
  eventId,
  childPageId,
}) => {
  const { dateText, weekday } = formatDate(event.date);
  const time = formatTime(event.time_start);
  const backgroundImageUrl =
    process.env.REACT_APP_IMAGES_URL + event.picture_id + "/medium";
  const eventText = event.text.replace(/<[^>]*>/g, "");

  const buildEventPath = ({ projectId, childPageId, eventId }) => {
    const parts = [];
    if (projectId) {
      parts.push("projects", String(projectId));
    }
    if (childPageId) {
      parts.push(String(childPageId));
    }
    if (eventId) {
      parts.push(String(eventId));
    }
    return parts.length ? `/${parts.join("/")}` : "";
  };

  const eventPath = buildEventPath({ projectId, childPageId, eventId });

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
      <TitleSectionStyled as={Link} to={eventPath}>
        <EventTitleStyled>{event.title}</EventTitleStyled>
        {!event.canceled && (
          <EventSubtitleStyled>{eventText}</EventSubtitleStyled>
        )}
      </TitleSectionStyled>
      <RestrictionStyled>{event.restriction}</RestrictionStyled>
    </EventListStyled>
  );
};

export default EventList;
