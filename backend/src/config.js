const { resolve, join } = require("node:path");
const dotenv = require("dotenv");

// Инициализация dotenv
dotenv.config();

// Конфигурация приложения
const CONFIG = {
  PORT: process.env.PORT || 3013,
  PATHS: {
    BUILD_DIR: resolve(__dirname, process.env.FRONTEND),
    IMAGES_DIR: resolve(__dirname, process.env.IMAGES),
    INDEX_HTML: join(resolve(__dirname, process.env.FRONTEND), "index.html"),
  },
};

module.exports = CONFIG;
