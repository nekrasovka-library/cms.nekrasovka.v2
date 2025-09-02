import Select from "./components/content.select";
import Text from "./components/content.text";
import Calendar from "./components/content.calendar";
import Switch from "./components/content.switch";

export const BLOCK_SETTINGS_TYPES = {
  child_page_id: {
    element: Select,
    params: {
      label: "Страница контента",
      options: [
        {
          value: "Конференц-зал / 5 этаж",
          label: "Конференц-зал / 5 этаж",
        },
        {
          value: "Арт-пространство / 2 этаж",
          label: "Арт-пространство / 2 этаж",
        },
      ],
    },
  },
};

export const BLOCK_CONTENT_TYPES = {
  geo: {
    element: Select,
    params: {
      label: "Местоположение",
      options: [
        {
          value: "Конференц-зал / 5 этаж",
          label: "Конференц-зал / 5 этаж",
        },
        {
          value: "Арт-пространство / 2 этаж",
          label: "Арт-пространство / 2 этаж",
        },
      ],
    },
  },
  picture_id: {
    element: Text,
    params: {
      label: "ID изображения",
    },
  },
  price: {
    element: Text,
    params: {
      label: "Стоимость",
    },
  },
  restriction: {
    element: Text,
    params: {
      label: "Ограничения",
    },
  },
  title: {
    element: Text,
    params: {
      label: "Заголовок",
    },
  },
  author_name: {
    element: Text,
    params: {
      label: "Имя автора",
    },
  },
  author_text: {
    element: Text,
    params: {
      label: "Об авторе",
    },
  },
  author_picture_id: {
    element: Text,
    params: {
      label: "ID изображения автора",
    },
  },
  date: {
    element: Calendar,
    params: {
      label: "Дата и время мероприятия",
    },
  },
  canceled: {
    element: Switch,
    params: {
      label: "Отменено",
    },
  },
  is_public: {
    element: Switch,
    params: {
      label: "Опубликовано",
    },
  },
};

export const BLOCK_CONTENT_SWITCH_OPTIONS = {
  0: "не",
  1: "",
};
