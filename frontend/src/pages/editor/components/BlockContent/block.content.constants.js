import Select from "./components/content.select";
import Text from "./components/content.text";
import Image from "./components/content.image";
import Calendar from "./components/content.calendar";
import Switch from "./components/content.switch";

export const getBlockSettingsTypes = (props, type) => {
  const BLOCK_SETTINGS_TYPES = {
    child_page_id: {
      element: Select,
      params: {
        label: "Страница контента",
        options: [
          { value: "", label: "Страница не указана" },
          ...(props.items?.pages ?? []).map((p) => ({
            value: p.id,
            label: p.name,
          })),
        ],
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

  return BLOCK_SETTINGS_TYPES[type];
};

export const BLOCK_CONTENT_TYPES = {
  geo: {
    element: Select,
    params: {
      label: "Местоположение",
      options: [
        {
          value: "",
          label: "Не выбрано",
        },
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
    element: Image,
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
  date: {
    element: Calendar,
    params: {
      label: "Дата и время мероприятия",
    },
  },
};

export const BLOCK_CONTENT_SWITCH_OPTIONS = {
  0: "не",
  1: "",
};
