import Select from "./components/content.select";
import Text from "./components/content.text";
import Calendar from "./components/content.calendar";
import Switch from "./components/content.switch";

export const BLOCK_CONTENT_TYPES = {
  geo: {
    element: Select,
    position: 0,
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
    position: 0,
    params: {
      label: "ID изображения",
    },
  },
  price: {
    element: Text,
    position: 0,
    params: {
      label: "Стоимость",
    },
  },
  restriction: {
    element: Text,
    position: 0,
    params: {
      label: "Ограничения",
    },
  },
  title: {
    element: Text,
    position: 0,
    params: {
      label: "Заголовок",
    },
  },
  date: {
    element: Calendar,
    position: 0,
    params: {
      label: "Дата и время мероприятия",
    },
  },
  canceled: {
    element: Switch,
    position: 1,
    params: {
      label: "Отменено",
    },
  },
  is_public: {
    element: Switch,
    position: 1,
    params: {
      label: "Опубликовано",
    },
  },
};

export const BLOCK_CONTENT_SWITCH_OPTIONS = {
  0: "не",
  1: "",
};
