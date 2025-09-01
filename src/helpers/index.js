import { useState, useEffect } from "react";
import {
  MONTHS,
  WEEKDAYS,
} from "../pages/editor/components/AfishaEvent/afisha.event.constants";

const useIsMobile = (breakpoint = 700) => {
  // Если "window" недоступен (SSR), считается, что ширина неизвестна. Начальное значение false.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Для серверных условий `window` недоступен: пропускаем хук.
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= breakpoint;
      setIsMobile((prevIsMobile) =>
        prevIsMobile !== isCurrentlyMobile ? isCurrentlyMobile : prevIsMobile,
      );
    };

    // Вызов обработчика при монтировании компонента (для синхронизации)
    handleResize();

    // Добавление слушателя события
    window.addEventListener("resize", handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const calculateBlockWidth = (columns) => {
  const MIN_WIDTH = 60;
  const MAX_WIDTH = 1200;
  const COLUMN_BASE_WIDTH = (MAX_WIDTH - MIN_WIDTH) / 11;
  return MIN_WIDTH + COLUMN_BASE_WIDTH * (columns - 1);
};

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

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

const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function minStartOfTodayForDateTimeLocal() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  return `${y}-${m}-${day}T00:00`;
}

export {
  useIsMobile,
  calculateBlockWidth,
  generateUniqueId,
  formatDate,
  formatTime,
  formatUrl,
  formatDateForInput,
  minStartOfTodayForDateTimeLocal,
};
