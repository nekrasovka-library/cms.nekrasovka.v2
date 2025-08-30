const express = require("express");
const cors = require("cors");
const { sequelize, models } = require("./models");
const { events } = require("./data/events");

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

// function createMenus() {
//   menus.data.forEach(async (menu) => {
//     const { id } = await models.Menu.create({ name: menu.name });
//     for (const variant of menu.variants) {
//       await models.Variant.create({
//         menuId: id,
//         image: variant.image,
//         type: variant.type,
//         content: !!variant.text ? { text: variant.text } : {},
//         styles: variant.styles,
//       });
//     }
//
//     console.log("❗", id, menu);
//   });
// }

// function createEvents() {
//   events.forEach(async (event) => {
//     const { id } = await models.Event.create({ ...event });
//
//     console.log("❗", id, event);
//   });
// }

// Start server after DB is ready
async function start() {
  // createMenus();
  // createEvents();
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
