import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENT_DEFAULT } from "./event.page.constants";
import {
  AfishaContainerStyled,
  ErrorMessageStyled,
  EventPageContainerStyled,
  EventPageStyled,
} from "./event.page.styles";
import EventPagePreview from "./event.page.preview";
import EventPageConstructor from "./event.page.constructor";
import { useParams } from "react-router-dom";
import { calculateBlockWidth } from "../../../../helpers";
import { fetchEvents } from "./event.page.utils";

const EventPage = ({
  backgroundColor,
  paddingTop,
  paddingBottom,
  maxWidth,
  content,
}) => {
  maxWidth = calculateBlockWidth(maxWidth);
  const params = useParams();
  const dispatch = useDispatch();
  const [event, setEvent] = useState(EVENT_DEFAULT);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const page = useSelector(({ page }) => page);

  const { isPreviewVisible } = useSelector(({ visibility }) => visibility);
  // TODO: следить за изменениями в event и добавлять их в page.settings панель для сохранения или отмены изменений

  const getEvents = (id) => {
    fetchEvents(id).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setEvent(response);

        if (isPreviewVisible) {
          setLoading(false);
        } else {
          dispatch({});
        }
      }
    });
  };

  // Загрузка событий
  useEffect(() => {
    if (!!params[page.items.url]) getEvents(params[page.items.url]);
    else setLoading(false);

    return () => {
      setEvent(EVENT_DEFAULT);

      if (isPreviewVisible) {
        setLoading(true);
      } else {
        dispatch({ type: "RESET_CONTENT" });
      }
    };
  }, [params[page.items.url]]);

  if (error) {
    return (
      <AfishaContainerStyled>
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
      </AfishaContainerStyled>
    );
  }

  return (
    <EventPageStyled
      $backgroundColor={backgroundColor}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
    >
      <EventPageContainerStyled $maxWidth={maxWidth}>
        {isPreviewVisible ? (
          <EventPagePreview loading={loading} event={event} />
        ) : (
          <EventPageConstructor
            event={content}
            setEvent={setEvent}
            backgroundColor={backgroundColor}
          />
        )}
      </EventPageContainerStyled>
    </EventPageStyled>
  );
};

export default EventPage;
