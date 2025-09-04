const express = require("express");
const router = express.Router();
const { models } = require("../models");

// GET /api/events - список событий
router.get("/", async (req, res) => {
  try {
    const events = await models.Event.findAll({
      order: [
        ["date", "ASC"],
        ["time_start", "ASC"],
      ],
    });
    res.json(events);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST /api/events - создать событие
router.post("/", async (req, res) => {
  try {
    const params = req.body || {};
    const today = new Date();
    const dateOnly = (d) => d.toISOString().slice(0, 10);

    const event = await models.Event.create({
      date: params.date || dateOnly(today),
      title: typeof params.title !== "undefined" ? params.title : "",
      time_start: params.time_start ? new Date(params.time_start) : today,
      text: typeof params.text !== "undefined" ? params.text : "",
      geo: typeof params.geo !== "undefined" ? params.geo : "",
      geo_link: typeof params.geo_link !== "undefined" ? params.geo_link : "",
      picture_id:
        typeof params.picture_id === "number" ? params.picture_id : 0,
      og_image:
        typeof params.og_image !== "undefined" ? params.og_image : null,
      price: typeof params.price === "number" ? params.price : 0,
      restriction:
        typeof params.restriction !== "undefined" ? params.restriction : "",
      is_public:
        typeof params.is_public === "number" ? params.is_public : 0,
    });

    res.status(201).json(event);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// GET /api/events/:id - получить событие
router.get("/:id", async (req, res) => {
  try {
    const event = await models.Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// PUT /api/events/:id - изменить событие
router.put("/:id", async (req, res) => {
  try {
    const {
      date,
      title,
      time_start,
      text,
      geo,
      geo_link,
      picture_id,
      og_image,
      price,
      restriction,
      is_public,
    } = req.body || {};

    const event = await models.Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (typeof date !== "undefined") event.date = date;
    if (typeof title !== "undefined") event.title = title;
    if (typeof time_start !== "undefined")
      event.time_start = new Date(time_start);
    if (typeof text !== "undefined") event.text = text;
    if (typeof geo !== "undefined") event.geo = geo;
    if (typeof geo_link !== "undefined") event.geo_link = geo_link;
    if (typeof picture_id !== "undefined") event.picture_id = picture_id;
    if (typeof og_image !== "undefined") event.og_image = og_image;
    if (typeof price !== "undefined") event.price = price;
    if (typeof restriction !== "undefined") event.restriction = restriction;
    if (typeof is_public !== "undefined") event.is_public = is_public;

    await event.save();
    res.json(event);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE /api/events/:id - удалить событие
router.delete("/:id", async (req, res) => {
  try {
    const event = await models.Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.destroy();
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
