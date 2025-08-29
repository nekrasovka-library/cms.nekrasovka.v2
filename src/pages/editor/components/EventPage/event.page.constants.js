export const CONFIG = {
  DEFAULT_TRACKS: 7,
  DEFAULT_GAP: 30,
  DESKTOP_BREAKPOINT: 1240,
  ITEMS_PER_PAGE: 3,
  CANCELLED_EVENT_TEXT: "Отменено",
  ERROR_MESSAGE: "Ошибка загрузки событий",
  SKELETON_CARDS_COUNT: 3,
};

export const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export const AFISHA_THEME = {
  // Color palette
  primaryColor: "#346178",
  errorColor: "#922d15",
  errorTextColor: "#77777785",
  overlayOpacity: "0.4",

  // Spacing
  containerMaxWidth: "1200px",
  borderRadius: "5px",
  spacingXs: "5px",
  spacingSm: "10px",
  spacingMd: "15px",
  spacingLg: "20px",
  spacingXl: "25px",
  spacingXxl: "30px",
  spacingXxxl: "40px",

  // Typography
  fontWeightNormal: "400",
  fontWeightMedium: "500",

  // Breakpoints
  breakpointMobile: "767px",
  breakpointTablet: "768px",
  breakpointDesktop: "1239px",
  breakpointLarge: "1240px",
};

export const EVENT_DEFAULT = {
  id: 1,
  title: "",
  text: "",
  geo: "",
  price: 0,
  restriction: "",
  og_image: null,
  picture_id: null,
  date: "",
  dateText: "",
  weekday: "",
  time: "",
  canceled: false,
  author: null,
};

export const EVENT_GEO_OPTIONS = [
  {
    value: "",
    label: "Местоположение не выбрано",
    geoUrl: null,
  },
  {
    value: "Мастер-класс по вязанию",
    label: "Мастер-класс по вязанию",
    geoUrl: "https://yandex.ru/maps/-/C6upr42e",
  },
  {
    value: "Философская лекция",
    label: "Философская лекция",
    geoUrl: "https://yandex.ru/maps/-/C6upr42e",
  },
];
