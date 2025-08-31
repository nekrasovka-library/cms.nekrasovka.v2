import React, { useEffect, useState } from "react";
import {
  AfishaPageStyled,
  AfishaContainerStyled,
  AfishaHeaderStyled,
  AfishaHeaderTitleStyled,
  AfishaMainStyled,
  LoadMoreButton,
  AfishaHeaderTagsAndSortStyled,
  AfishaHeaderViewStyled,
  AfishaHeaderTagsStyled,
  TagStyled,
  AfishaWrapperStyled,
  ErrorMessageStyled,
} from "./afisha.page.styles";
import EventCard from "../EventCard/event.card";
import Icon from "../../../../nekrasovka-ui/Icon/icon";
import EventList from "../EventList/event.list";
import { MONTHS, TAGS, WEEKDAYS } from "./afisha.page.constants";
import { calculateBlockWidth } from "../../../../helpers";
import { useParams } from "react-router-dom";
import DateRangeCalendar from "../Calendar/DateRangeCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest } from "../../../../features/events/eventsSlice";

const AfishaPage = ({
  tracks,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);
  const [view, setView] = useState("mozaic");
  const params = useParams();
  const [page, setPage] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const [changedTag, setChangedTag] = useState([]);
  const [initDate, setInitDate] = useState({
    from: null,
    to: null,
  });
  const dispatch = useDispatch();
  const events = useSelector(({ events }) => events);

  // Утилиты для форматирования
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const weekday = WEEKDAYS[date.getDay()];
    return { dateText: `${day} ${month}`, weekday };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatUrl = (dateString, id) => {
    return `afisha/${id}`;
  };

  const formatCalendarDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return {
      date: `${day}.${month}.${year}`,
      init: `${year}-${month}-${day}`,
    };
  };

  const fetchEvents = ({
    offset = page * tracks,
    limit = tracks,
    from = null,
    to = null,
  }) => {
    dispatch(
      fetchEventsRequest({
        type: "afishaEvent",
        limit,
        from,
        to,
        offset,
      }),
    );
  };

  // Загрузка событий
  useEffect(() => {
    fetchEvents({});
  }, [tracks]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchEvents({ offset: page + 1, limit: tracks });
  };

  const handleTag = (tagIndex) => {
    setSelectedTag(tagIndex === selectedTag ? null : tagIndex);
  };

  const handleCalendar = (from, to) => {
    const fromDate = formatCalendarDate(from).date;
    const toDate = formatCalendarDate(to).date;
    const fromInit = formatCalendarDate(from).init;
    const toInit = formatCalendarDate(to).init;

    setInitDate({ from, to });
    fetchEvents({
      from: fromInit,
      to: toInit,
    });

    const date = `${fromDate} - ${toDate}`;

    setChangedTag([{ key: "date", value: date }]);
    setSelectedTag(null);
  };

  const handleResetTag = (key = null) => {
    setSelectedTag(null);

    if (key === null) {
      setChangedTag([]);
      setInitDate({ from: null, to: null });
      fetchEvents({});
    } else {
      const newChangedTag = changedTag.filter((item) => item.key !== key);
      setChangedTag(newChangedTag);
    }
  };

  if (events.status === "failed") {
    return (
      <AfishaContainerStyled>
        <AfishaWrapperStyled>
          <ErrorMessageStyled>{events.error}</ErrorMessageStyled>
        </AfishaWrapperStyled>
      </AfishaContainerStyled>
    );
  }

  return (
    <AfishaPageStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <AfishaContainerStyled $maxWidth={maxWidth}>
        <AfishaHeaderStyled>
          <AfishaHeaderTitleStyled>
            <span>События</span>
            <span>Афиша</span>
          </AfishaHeaderTitleStyled>
          <AfishaHeaderTagsAndSortStyled>
            <AfishaHeaderTagsStyled>
              <div>
                {TAGS.map((tag) => (
                  <TagStyled
                    $isTagSelected={selectedTag === tag.key}
                    key={tag.key}
                    onClick={() => handleTag(tag.key)}
                  >
                    {tag.name}
                  </TagStyled>
                ))}
              </div>
              {changedTag.length > 0 && (
                <div>
                  {changedTag.map((tag) => (
                    <div key={tag.key}>
                      <span>{tag.value}</span>
                      <Icon
                        icon="closeMenu"
                        type="button"
                        height="10"
                        onClick={() => handleResetTag(tag.key)}
                      />
                    </div>
                  ))}
                  <div onClick={() => handleResetTag()}>Сбросить фильтры</div>
                </div>
              )}
            </AfishaHeaderTagsStyled>
            <AfishaHeaderViewStyled $view={view}>
              <Icon
                icon="mozaic"
                type="button"
                onClick={() => setView("mozaic")}
              />
              <Icon icon="list" type="button" onClick={() => setView("list")} />
            </AfishaHeaderViewStyled>
          </AfishaHeaderTagsAndSortStyled>
        </AfishaHeaderStyled>
        {selectedTag === "date" && (
          <DateRangeCalendar
            onApply={handleCalendar}
            initialStartDate={initDate.from}
            initialEndDate={initDate.to}
          />
        )}
        <AfishaMainStyled $view={view}>
          {view === "mozaic" &&
            events.items.map((event) => (
              <EventCard
                key={event.id}
                event={event.content}
                loading={events.status === "loading"}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                projectId={params.projectId}
                eventId={event.id}
              />
            ))}
          {view === "list" &&
            events.items.map((event) => (
              <EventList
                key={event.id}
                event={event.content}
                loading={events.status === "loading"}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                projectId={params.projectId}
                eventId={event.id}
              />
            ))}
        </AfishaMainStyled>
        {events.total > events.items.length && (
          <LoadMoreButton onClick={handleLoadMore}>
            + Показать ещё
          </LoadMoreButton>
        )}
      </AfishaContainerStyled>
    </AfishaPageStyled>
  );
};

export default AfishaPage;
