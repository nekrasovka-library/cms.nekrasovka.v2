import React from "react";
import { Route } from "react-router-dom";
import Constructor from "./pages/editor/Constructor/constructor";

// Реестр компонентов
const componentRegistry = {
  // Добавьте другие компоненты по мере необходимости
  elementPage: Constructor,
};

export const generateDynamicRoutes = (config) => {
  return config
    .map((routeConfig, index) => {
      const Component = componentRegistry[routeConfig.element];

      // Определяем финальный путь на основе parentPath
      let finalPath = routeConfig.path;

      // Создаем компонент с дополнительными параметрами
      const ComponentWithParams = (props) => <Component {...props} />;

      return (
        <Route
          key={`dynamic-route-${index}`}
          path={finalPath}
          element={<ComponentWithParams />}
        />
      );
    })
    .filter(Boolean);
};
