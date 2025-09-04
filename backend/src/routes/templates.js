const express = require("express");
const router = express.Router();
const { models } = require("../models");

// GET /api/templates - список шаблонов с вариантами
router.get("/", async (req, res) => {
  try {
    const templates = await models.Template.findAll();

    res.json(templates);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

module.exports = router;
