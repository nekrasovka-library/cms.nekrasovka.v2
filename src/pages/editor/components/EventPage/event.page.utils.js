import {
  formatDate,
  formatDateForInput,
  formatTime,
  formatUrl,
} from "../../../../helpers";
import axios from "axios";
import { CONFIG } from "./event.page.constants";

export const fetchEvents = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}events/${id}`,
    );

    if (response.data.success) {
      const { data } = response.data;

      const { dateText, weekday } = formatDate(data.date); // Используем eventData.date
      const time = formatTime(data.time_start);
      const date = formatDateForInput(data.date) + "T" + time;
      const url = formatUrl(data.date, data.id);

      return {
        ...data,
        dateText,
        weekday,
        url,
        time,
        date,
        title: data.title,
        text: data.text,
        canceled: data.geo === CONFIG.CANCELLED_EVENT_TEXT,
        author: data.author
          ? {
              image: data.author?.image,
              name: data.author?.name,
              text: data.author?.text,
            }
          : null,
      };
    }
  } catch (error) {
    return { error: CONFIG.ERROR_MESSAGE };
  }
};
