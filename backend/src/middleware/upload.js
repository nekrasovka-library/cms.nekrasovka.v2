const multer = require("multer");
const CONFIG = require("../config.js");

/**
 * Создание хранилища для загрузки файлов
 * @returns {Object} конфигурация хранилища multer
 */
const createFileStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, CONFIG.PATHS.IMAGES_DIR),
    filename: (req, file, cb) => cb(null, `${file.originalname}`),
  });
};

/**
 * Middleware для загрузки файлов
 */
const upload = multer({ storage: createFileStorage() });

module.exports = { createFileStorage, upload };
