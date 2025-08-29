import React, { useCallback, useEffect, useState } from "react";
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
import { CONFIG, MONTHS, TAGS, WEEKDAYS } from "./afisha.page.constants";
import { calculateBlockWidth } from "../../../../helpers";
import { useParams } from "react-router-dom";
import axios from "axios";
import DateRangeCalendar from "../Calendar/DateRangeCalendar";

const AfishaPage = ({
  tracks,
  backgroundColor,
  maxWidth,
  paddingTop,
  paddingBottom,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);
  const [events, setEvents] = useState({
    data: [
      {
        id: 1,
        date: "2025-07-20 00:00:00",
        title: "«Бабушкины квадраты». Мастер-класс по вязанию",
        text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
        geo: "Аудитория 502 / 5 этаж",
        price: 0,
        restriction: "12+",
      },
      {
        id: 2,
        date: "2025-07-20 00:00:00",
        title: "«Бабушкины квадраты». Мастер-класс по вязанию",
        text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
        geo: "Аудитория 502 / 5 этаж",
        price: 0,
        restriction: "12+",
      },
      {
        id: 3,
        date: "2025-07-20 00:00:00",
        title: "«Бабушкины квадраты». Мастер-класс по вязанию",
        text: '<div><p>Многоцветные бабушкины квадраты — это эффективный способ использовать небольшое количество пряжи, оставшейся от других проектов, а базовые мотивы бабушкиных квадратов не требуют особых навыков для выполнения.</p><p>Название технологии отсылает к изделиям пожилых мастериц, но не всё так просто!</p><p>Модели одежды с использованием бабушкиных квадратов не раз представлялись на неделях высокой моды, печатались в глянцевых журналах и циркулировали в массмаркетах. А квадраты-модули соединяются в юбки, платья, гольфы, пледы и даже в чехлы для табуреток!</p><p>Приходите на мастер-класс, чтобы научиться премудростям техники и хорошо провести время. Чтобы вам было комфортно, желательно иметь хотя бы начальный уровень навыков вязания.</p><p>Если у вас есть крючки и вязаные вещи, которые не жалко распустить, — приносите!</p><p>Ведущая мастер-класса — Наталья Сенаторова, эксперт Санкт-Петербургского культурного форума, основательница бренда вязаных изделий «Блаж Борисовны».<br></p><p class="">Пожалуйста, не забудьте зарегистрироваться на встречу. В случае переноса или отмены мастер-класса мы отправим вам письмо на указанный электронный адрес.</p></div>',
        geo: "Аудитория 502 / 5 этаж",
        price: 0,
        restriction: "12+",
      },
    ],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("mozaic");
  const params = useParams();
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [changedTag, setChangedTag] = useState([]);
  const [initDate, setInitDate] = useState({
    startDate: null,
    endDate: null,
  });

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

  const createBackgroundImageUrl = useCallback((pictureId) => {
    return pictureId ? `//nekrasovka.ru/img/${pictureId}/medium` : "none";
  }, []);

  const isEventCancelled = useCallback((event) => {
    return event.geo === CONFIG.CANCELLED_EVENT_TEXT;
  }, []);

  const fetchEvents = async ({ page, count, startDate, endDate }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}events`,
        { page, count, startDate, endDate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        const { data, total } = response.data;

        const newEvents = page === 1 ? data : [...events.data, ...data];
        setEvents({ data: newEvents, total });
        setError(null);
      }
    } catch (error) {
      console.error(`${CONFIG.ERROR_MESSAGE}:`, error);
      setError(CONFIG.ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка событий
  useEffect(() => {
    fetchEvents({ page, count: tracks });
  }, [tracks]);

  useEffect(() => {
    fetchEvents({
      page,
      count: tracks,
      startDate: initDate.startDate,
      endDate: initDate.endDate,
    });
  }, [initDate]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchEvents({ page: page + 1, count: tracks });
  };

  const handleTag = (tagIndex) => {
    setSelectedTag(tagIndex === selectedTag ? null : tagIndex);
  };

  const handleCalendar = (startDate, endDate) => {
    startDate = formatCalendarDate(startDate);
    endDate = formatCalendarDate(endDate);
    const date = `${startDate.date} - ${endDate.date}`;

    setChangedTag([{ key: "date", value: date }]);
    setInitDate({ startDate: startDate.init, endDate: endDate.init });
    setSelectedTag(null);
  };

  const handleResetTag = (key = null) => {
    setSelectedTag(null);

    if (key === null) {
      setChangedTag([]);
      setInitDate({ startDate: null, endDate: null });
    } else {
      const newChangedTag = changedTag.filter((item) => item.key !== key);
      setChangedTag(newChangedTag);
    }
  };

  if (error) {
    return (
      <AfishaContainerStyled>
        <AfishaWrapperStyled>
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
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
            initialStartDate={initDate.startDate}
            initialEndDate={initDate.endDate}
          />
        )}
        <AfishaMainStyled $view={view}>
          {view === "mozaic" &&
            events.data.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                loading={loading}
                index={index}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                createBackgroundImageUrl={createBackgroundImageUrl}
                isEventCancelled={isEventCancelled}
                projectId={params.projectId}
              />
            ))}
          {view === "list" &&
            events.data.map((event, index) => (
              <EventList
                key={event.id}
                event={event}
                loading={loading}
                index={index}
                formatDate={formatDate}
                formatTime={formatTime}
                formatUrl={formatUrl}
                createBackgroundImageUrl={createBackgroundImageUrl}
                isEventCancelled={isEventCancelled}
                projectId={params.projectId}
              />
            ))}
        </AfishaMainStyled>
        {events.total > events.data.length && (
          <LoadMoreButton onClick={handleLoadMore}>
            + Показать ещё
          </LoadMoreButton>
        )}
      </AfishaContainerStyled>
    </AfishaPageStyled>
  );
};

export default AfishaPage;
