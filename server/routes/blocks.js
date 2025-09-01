const express = require("express");
const router = express.Router();
const { models } = require("../models");
const { Op, where, literal } = require("sequelize");

// GET /api/blocks - получить список блоков с фильтрами и пагинацией
router.get("/", async (req, res) => {
  try {
    const {
      type,
      from,
      to,
      limit,
      offset,
      orderBy = "content.dateOnly",
      order = "DESC",
    } = req.query;

    const whereClause = {};
    if (type) whereClause.type = type;

    // выражение: только дата из content.date (YYYY-MM-DD), без времени
    const dateOnlyExpr = literal(
      "substr(json_extract(`content`,'$.date'),1,10)",
    );

    // фильтрация по дате (без времени)
    if (from || to) {
      const andConds = [];
      if (from) andConds.push(where(dateOnlyExpr, { [Op.gte]: from }));
      if (to) andConds.push(where(dateOnlyExpr, { [Op.lte]: to }));
      if (andConds.length) {
        whereClause[Op.and] = [...(whereClause[Op.and] || []), ...andConds];
      }
    }

    const parsedLimit = Math.min(Number.parseInt(limit || "50", 10), 100);
    const parsedOffset = Number.parseInt(offset || "0", 10);

    const orderUpper = String(order).toUpperCase() === "ASC" ? "ASC" : "DESC";
    const orderClause =
      orderBy === "content.dateOnly" || orderBy === "content.date"
        ? [[dateOnlyExpr, orderUpper]]
        : [[orderBy, orderUpper]];

    const { rows, count } = await models.Block.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset: parsedOffset,
      order: orderClause,
    });

    res.json({
      data: rows,
      total: count,
      limit: parsedLimit,
      offset: parsedOffset,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch blocks" });
  }
});

// POST /api/blocks - создать блок
router.post("/", async (req, res) => {
  try {
    const { pageId, type, settings, styles, content, position } = req.body;

    const blocks = await models.Block.findAll({ where: { pageId } });

    for (const blockKey of blocks) {
      if (blockKey.position >= position) {
        blockKey.position += 1;
        await blockKey.save();
      }
    }

    await models.Block.create({
      type,
      settings,
      styles,
      content,
      position,
      pageId,
    });

    const page = await models.Page.findByPk(pageId, {
      include: [{ model: models.Block, as: "blocks" }],
      order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
    });

    res.status(201).json(page);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create block" });
  }
});

// PUT /api/blocks/:id - обновить блок
router.put("/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const { type, settings, styles, content, position } = req.body || {};
    const block = await models.Block.findByPk(id);
    if (!block) return res.status(404).json({ error: "Block not found" });

    if (typeof type !== "undefined") {
      block.type = type;
    }
    if (typeof settings !== "undefined") {
      block.settings = { ...block.settings, ...settings };
    }
    if (typeof styles !== "undefined") {
      block.styles = { ...block.styles, ...styles };
    }
    if (typeof content !== "undefined") {
      block.content = { ...block.content, ...content };
    }
    if (typeof position !== "undefined") {
      const blocks = await models.Block.findAll({
        where: { pageId: block.pageId },
      });

      for (const blockKey of blocks) {
        if (position < block.position && blockKey.position === position) {
          blockKey.position += 1;
          await blockKey.save();
        }
        if (position > block.position && blockKey.position === position) {
          blockKey.position -= 1;
          await blockKey.save();
        }
      }

      block.position = position;
    }

    await block.save();

    const page = await models.Page.findByPk(block.pageId, {
      include: [{ model: models.Block, as: "blocks" }],
      order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
    });

    res.status(201).json(page);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update block" });
  }
});

// DELETE /api/blocks/:id - удалить блок
router.delete("/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const block = await models.Block.findByPk(id);
    if (!block) return res.status(404).json({ error: "Block not found" });

    await block.destroy();

    const blocks = await models.Block.findAll({
      where: { pageId: block.pageId },
    });

    for (const blockKey of blocks) {
      if (blockKey.position > block.position) {
        blockKey.position -= 1;
        await blockKey.save();
      }
    }

    const page = await models.Page.findByPk(block.pageId, {
      include: [{ model: models.Block, as: "blocks" }],
      order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
    });

    res.status(201).json(page);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete block" });
  }
});

// GET /api/blocks/:id - получить один блок по идентификатору
router.get("/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const block = await models.Block.findByPk(id);
    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }

    res.json(block);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch block" });
  }
});

module.exports = router;
