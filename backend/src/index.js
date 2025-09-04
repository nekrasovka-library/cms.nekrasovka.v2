const express = require("express");
const cors = require("cors");
const { sequelize, models } = require("./models");
const CONFIG = require("./config.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/pages", require("./routes/pages"));
app.use("/api/blocks", require("./routes/blocks"));
app.use("/api/menus", require("./routes/menus"));
app.use("/api/templates", require("./routes/templates"));
app.use("/api/events", require("./routes/events"));

// Раздача статики фронтенда в продакшене
if (process.env.NODE_ENV === "production") {
  app.use(express.static(CONFIG.PATHS.BUILD_DIR));

  // SPA fallback: все не-API маршруты отдаем на index.html
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(CONFIG.PATHS.INDEX_HTML);
  });
}

// Start server after DB is ready
async function start() {
  try {
    await sequelize.sync(); // For dev convenience; replace with migrations in prod
    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
