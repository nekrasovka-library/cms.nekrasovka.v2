const express = require("express");
const router = express.Router();
const { models } = require("../models");

// GET /api/menus - список меню (с вариантами)
router.get("/", async (req, res) => {
  try {
    const menus = await models.Menu.findAll({
      include: [{ model: models.Variant, as: "variants" }],
    });
    res.json(menus);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});

module.exports = router;
