# CMS — Frontend + Backend

Моно‑репозиторий с веб‑приложением для управления контентом (CMS):
- Фронтенд: React (Create React App), React Router, Redux Toolkit, Redux‑Saga, styled‑components, SunEditor.
- Бэкенд: Node.js (Express), Sequelize, SQLite, CORS. В продакшене может раздавать собранный фронтенд.

API базируется на префиксе /api (например, /api/projects, /api/pages, /api/blocks, /api/menus, /api/templates, /api/events).

## Требования
- Node.js (LTS). Точная версия не зафиксирована в репозитории. TODO: уточнить и зафиксировать версию Node.js (например, через .nvmrc/engines).
- npm (используется в скриптах). TODO: при необходимости добавить инструкции для yarn/pnpm.

## Установка
1. Клонируйте репозиторий и перейдите в корень проекта.
2. Установите зависимости для бэкенда:
   - cd backend
   - npm install
3. Установите зависимости для фронтенда:
   - cd ../frontend
   - npm install

## Запуск в режиме разработки
Есть два варианта:

- Запуск каждой части отдельно:
  - Бэкенд: в папке backend выполнить npm run start (порт по умолчанию: 3001).
  - Фронтенд: в папке frontend выполнить npm start (порт по умолчанию: 3000). Для корректной работы нужно указать REACT_APP_API (см. переменные окружения ниже).

- Совместный запуск (concurrently):
  - В папке backend выполнить npm run dev — запустит бэкенд и фронтенд параллельно.

## Сборка и запуск в продакшене
1. Собрать фронтенд:
   - cd frontend
   - npm run build
2. Настроить переменные окружения для бэкенда (файл backend/.env):
   - FRONTEND=../../frontend/build
   - NODE_ENV=production
   - PORT=3001  # при необходимости переопределите порт
3. Запустить бэкенд в продакшен‑режиме:
   - cd backend
   - npm run start:prod

Примечание: в production бэкенд раздает статические файлы из директории, указанной в переменной FRONTEND, и отдает index.html для SPA‑маршрутов.

## Переменные окружения
- Бэкенд (файл backend/.env):
  - PORT — порт API. По умолчанию индексный файл использует 3001, а config.js объявляет 3013. Фактически активен 3001 (из src/index.js). TODO: синхронизировать значения и использовать единое место.
  - FRONTEND — путь до собранного фронтенда относительно backend/src (примеры: ../../frontend/build).
  - NODE_ENV — production для раздачи статики фронтенда.

- Фронтенд (файл frontend/.env):
  - REACT_APP_API — базовый URL API, например http://localhost:3001/api/
  - REACT_APP_URL — базовый URL для статики сайта/изображений, используется в некоторых компонентах (например, для заглушек). Пример: http://localhost:3000/
  - REACT_APP_IMAGES_URL — базовый URL до сервиса/папки изображений, например http://localhost:3001/images/

TODO: Уточнить фактические значения для продакшена и описать источники изображений.

## Скрипты
- backend/package.json:
  - npm run start — запуск бэкенда с nodemon (src/index.js).
  - npm run start:prod — запуск бэкенда в production: NODE_ENV=production node src/index.js.
  - npm run dev — параллельный запуск бэкенда и фронтенда (через concurrently).
  - npm run deploy — pm2 deploy test deploy. TODO: в репозитории нет конфигурации pm2 (ecosystem.config.js); требуется уточнить и добавить.

- frontend/package.json:
  - npm start — запуск CRA dev server.
  - npm run build — сборка фронтенда в папку build.
  - npm run clear — очистка папки build.

## Структура проекта
- backend/
  - src/
    - index.js — точка входа API‑сервера (Express), регистрирует роуты /api/*, включает CORS, JSON middleware, раздачу статики в production.
    - config.js — загрузка .env и конфигурация путей к фронтенду (FRONTEND), порт.
    - models/ — Sequelize‑модели (Project, Page, Block, Menu, Variant, Template, Event) и их связи; база SQLite хранится в backend/src/data/database.sqlite.
    - routes/ — REST‑роуты: projects, pages, blocks, menus, templates, events.
    - helpers/, constants/ — вспомогательные функции и константы.
  - package.json — скрипты запуска.

- frontend/
  - src/ — React‑приложение (страницы редактора, компоненты, Redux‑слайсы и API‑обертки).
  - package.json — скрипты запуска/сборки.

- README.md — текущий файл.

## База данных
- Используется SQLite, файл по умолчанию: backend/src/data/database.sqlite.
- Инициализация схемы выполняется через sequelize.sync() при старте сервера (для разработки). TODO: для продакшена внедрить миграции.

## Порты и CORS
- Бэкенд по умолчанию слушает 3001 (см. src/index.js). Фронтенд CRA — 3000.
- CORS включен (пакет cors). При необходимости настройку доменов можно добавить в middleware.

## Известные ограничения и TODO
- Зафиксировать и задокументировать версию Node.js.
- Добавить pm2 конфигурацию для npm run deploy или скорректировать README.
- Уточнить схему работы с изображениями (REACT_APP_URL/REACT_APP_IMAGES_URL) и пути раздачи.
- Синхронизировать значения PORT между config.js и index.js.
- Добавить инструкции по деплою (сервер, Docker, Nginx и т. п.), если применимо.
