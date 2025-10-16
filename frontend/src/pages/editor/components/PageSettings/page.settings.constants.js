import Select from "../BlockContent/components/content.select";
import Switch from "../BlockContent/components/content.switch";

export const getBlockSettingsTypes = (props, type, pageId, pageUrl) => {
  const BLOCK_SETTINGS_TYPES = {
    is_archive: {
      element: Switch,
      params: {
        label: "В архиве",
      },
    },
    is_public: {
      element: Switch,
      params: {
        label: "Опубликовано",
      },
    },
    is_private: {
      element: Switch,
      params: {
        label: "Скрыто",
      },
    },
    parent: {
      element: Select,
      params: {
        label: "Родительская страница",
        options: [
          { value: "", label: "Страница не выбрана" },
          ...props.items?.pages
            .filter((page) => page.id !== pageId)
            .filter((page) => page.url !== pageUrl)
            .filter((page) => page.settings.parent.pageId !== pageId)
            .map((p) => ({
              value: p.id,
              label: p.name,
            })),
        ],
        disabled: props.items.settings.main_page_id === pageId,
      },
    },
  };

  return BLOCK_SETTINGS_TYPES[type];
};
