import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  AfishaContainerStyled,
  AfishaWrapperStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaHeaderLinkStyled,
  AfishaMainStyled,
  AfishaButtonLeftStyled,
  AfishaButtonRightStyled,
  EventsContainerStyled,
  ErrorMessageStyled,
} from "./afisha.main.styles";
import EventCard from "../EventCard/event.card";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import { Link, useParams } from "react-router-dom";
import { CONFIG, MONTHS, WEEKDAYS } from "./afisha.main.constants";
import { calculateBlockWidth } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest } from "../../../../features/events/eventsSlice";

const AfishaMain = ({
  gap = CONFIG.DEFAULT_GAP,
  tracks = CONFIG.DEFAULT_TRACKS,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
  settings,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);
  const dispatch = useDispatch();
  const events = useSelector(({ events }) => events);
  const [scrollIndex, setScrollIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const params = useParams();

  const eventsContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const scrollAmountRef = useRef(0);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Утилиты для форматирования
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const weekday = WEEKDAYS[date.getDay()];
    return { dateText: `${day} ${month}`, weekday };
  }, []);

  const formatTime = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const formatUrl = useCallback((dateString, id) => {
    return `afisha/${id}`;
  }, []);

  const createBackgroundImageUrl = useCallback((pictureId) => {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : "none";
  }, []);

  // Навигация
  const updateNavigationButtons = useCallback(() => {
    if (windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      const showPrev = scrollIndex > 1;
      const showNext =
        events.items.length > CONFIG.ITEMS_PER_PAGE &&
        scrollIndex < Math.ceil(events.items.length / CONFIG.ITEMS_PER_PAGE);

      if (prevButtonRef.current) {
        prevButtonRef.current.style.display = showPrev ? "flex" : "none";
      }
      if (nextButtonRef.current) {
        nextButtonRef.current.style.display = showNext ? "flex" : "none";
      }
    }
  }, [scrollIndex, events.items.length, windowWidth]);

  const handleScroll = useCallback((scrollAmount) => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const navigateToNext = useCallback(() => {
    handleScroll(scrollAmountRef.current);
    setScrollIndex((prev) => prev + 1);
  }, [handleScroll]);

  const navigateToPrev = useCallback(() => {
    handleScroll(-scrollAmountRef.current);
    setScrollIndex((prev) => prev - 1);
  }, [handleScroll]);

  const fetchEvents = async (limit) => {
    dispatch(
      fetchEventsRequest({
        type: "afishaEvent",
        limit,
      }),
    );
  };

  // Предотвращение прокрутки на десктопе
  useEffect(() => {
    const container = eventsContainerRef.current;
    if (container && windowWidth > CONFIG.DESKTOP_BREAKPOINT) {
      const preventScrollEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const preventMouseDrag = (e) => {
        e.preventDefault();
      };

      container.addEventListener("wheel", preventScrollEvent, {
        passive: false,
      });
      container.addEventListener("mousedown", preventMouseDrag);
      container.addEventListener("touchmove", preventScrollEvent, {
        passive: false,
      });

      return () => {
        container.removeEventListener("wheel", preventScrollEvent);
        container.removeEventListener("mousedown", preventMouseDrag);
        container.removeEventListener("touchmove", preventScrollEvent);
      };
    }
  }, [windowWidth]);

  // Обновление количества прокрутки
  useEffect(() => {
    if (eventsContainerRef.current) {
      scrollAmountRef.current = eventsContainerRef.current.clientWidth + +gap;
    }
  }, [gap, windowWidth]);

  // Загрузка событий
  useEffect(() => {
    fetchEvents(tracks);
  }, [tracks]);

  // Обновление навигации
  useEffect(() => {
    updateNavigationButtons();
  }, [updateNavigationButtons]);

  if (events.status === "failed") {
    return (
      <AfishaContainerStyled>
        <AfishaWrapperStyled>
          <ErrorMessageStyled>{events.error}</ErrorMessageStyled>
        </AfishaWrapperStyled>
      </AfishaContainerStyled>
    );
  }

  console.log("❗", settings.child_page_id);

  return (
    <AfishaContainerStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <AfishaWrapperStyled $maxWidth={maxWidth}>
        <AfishaHeaderStyled>
          <AfishaHeaderTitleStyled>Афиша</AfishaHeaderTitleStyled>
          <AfishaHeaderLinkStyled
            as={Link}
            to={`/projects/${params.projectId}/${settings.child_page_id}`}
          >
            <span>Все события</span>
            <Icon icon="arrowRightLong" />
          </AfishaHeaderLinkStyled>
        </AfishaHeaderStyled>
        <AfishaMainStyled>
          <AfishaButtonLeftStyled
            ref={prevButtonRef}
            onClick={navigateToPrev}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonLeftStyled>
          <AfishaButtonRightStyled
            ref={nextButtonRef}
            onClick={navigateToNext}
            style={{ display: "none" }}
          >
            <Icon icon="arrowCarousel" />
          </AfishaButtonRightStyled>
          <EventsContainerStyled ref={eventsContainerRef} $gap={gap}>
            {events.items.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id}
                pageId={event.pageId}
                event={event.content}
                loading={events.status === "loading"}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                createBackgroundImageUrl={createBackgroundImageUrl}
                projectId={params.projectId}
              />
            ))}
          </EventsContainerStyled>
        </AfishaMainStyled>
      </AfishaWrapperStyled>
    </AfishaContainerStyled>
  );
};

export default AfishaMain;
