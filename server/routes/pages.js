const express = require("express");
const router = express.Router();
const { models } = require("../models");
const { Op } = require("sequelize");

const EMPTY_PARENT = { pageId: null, url: "", name: "" };
const PAGE_INCLUDE = {
  include: [{ model: models.Page, as: "pages" }],
};

async function detachChildrenFromDeleted(pageId) {
  const childPages = await models.Page.findAll({
    where: { "settings.parent.pageId": pageId },
  });
  for (const childPage of childPages) {
    childPage.settings = {
      ...childPage.settings,
      parent: EMPTY_PARENT,
    };
    await childPage.save();
  }
}

// GET /api/pages/:id - получить страницу
router.get("/:id/:blockId", async (req, res) => {
  try {
    // поддерживаем blockId как в params (/api/pages/:id/:blockId), так и в query (?blockId=...)
    const id = Number.parseInt(req.params.id, 10);
    const rawBlockId =
      typeof req.params.blockId !== "undefined"
        ? req.params.blockId
        : req.query.blockId;
    const blockId = Number.parseInt(rawBlockId, 10);

    // Получаем страницу с ВСЕМИ блоками, кроме типа afishaEvent
    const page = await models.Page.findByPk(id, {
      include: [
        {
          model: models.Block,
          as: "blocks",
          where: {
            type: { [Op.ne]: "afishaEvent" },
          },
          required: false, // чтобы страница вернулась даже если нет таких блоков
        },
      ],
      order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
    });

    if (!page) return res.status(404).json({ error: "Page not found" });

    // Находим ровно один нужный afishaEvent-блок этой страницы, если передан валидный blockId
    let eventBlock = null;
    if (!Number.isNaN(blockId)) {
      eventBlock = await models.Block.findOne({
        where: {
          id: blockId,
          pageId: id,
          type: "afishaEvent",
        },
      });
    }

    // Формируем финальный ответ: все НЕ afishaEvent + один нужный afishaEvent (если есть)
    const json = page.toJSON();
    const nonAfishaBlocks = Array.isArray(json.blocks) ? json.blocks : [];
    const merged = eventBlock
      ? [...nonAfishaBlocks, eventBlock]
      : nonAfishaBlocks;

    // Финальная сортировка по position
    merged.sort((a, b) => {
      const pa = typeof a.position === "number" ? a.position : 0;
      const pb = typeof b.position === "number" ? b.position : 0;
      return pa - pb;
    });

    json.blocks = merged;

    return res.json(json);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch page" });
  }
});

// POST /api/pages - создание страницы
router.post("/", async (req, res) => {
  try {
    const params = req.body || {};

    if (!params.projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const page = await models.Page.create({
      ...params,
      settings: {
        parent: {
          pageId: null,
          url: "",
          name: "",
        },
      },
    });
    const count = await models.Page.count({
      where: { projectId: page.projectId },
    });

    const pageName = `page_${page.id}`;
    const url = count > 1 ? pageName : "/";
    page.name = `Пустая страница ${page.id}`;
    page.url = url;

    await page.save();

    const project = await models.Project.findByPk(page.projectId, {
      include: [{ model: models.Page, as: "pages" }],
    });

    if (project.pages.length === 1) {
      project.settings = {
        ...project.settings,
        main_page_id: page.id,
      };
    }

    const newRoute = { path: url, element: "elementPage", id: page.id };
    project.routes = [...project.routes, newRoute];

    await project.save();
    res.status(201).json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// PUT /api/pages/:id - изменить страницу
router.put("/:id", async (req, res) => {
  try {
    const { name, url, settings, styles } = req.body || {};
    const id = Number.parseInt(req.params.id, 10);
    const page = await models.Page.findByPk(id);
    if (!page) return res.status(404).json({ error: "Page not found" });

    if (typeof settings !== "undefined") page.settings = settings;
    if (typeof styles !== "undefined") page.styles = styles;
    if (typeof name !== "undefined") page.name = name;
    if (typeof url !== "undefined") {
      page.url = url;

      // Find and update child pages
      const childPages = await models.Page.findAll({
        where: {
          "settings.parent.pageId": id,
        },
      });

      // Update child page URLs
      for (const childPage of childPages) {
        childPage.settings = {
          parent: {
            ...childPage.settings.parent,
            url: url,
          },
        };
        await childPage.save();
      }
    }

    await page.save();

    const project = await models.Project.findByPk(page.projectId, {
      include: [{ model: models.Page, as: "pages" }],
    });

    res.status(201).json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update page" });
  }
});

// DELETE /api/pages/:id - удалить страницу
router.delete("/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const page = await models.Page.findByPk(id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    await page.destroy();

    const project = await models.Project.findByPk(page.projectId, {
      include: [{ model: models.Page, as: "pages" }],
    });

    project.routes = project.routes.filter((r) => r.id !== id);

    if (project.pages.length === 0) {
      project.settings = {
        ...project.settings,
        main_page_id: 0,
      };
    }

    if (project.settings.main_page_id === id) {
      project.settings = {
        ...project.settings,
        main_page_id: project.pages[0].id,
      };
      await detachChildrenFromDeleted(project.pages[0].id);
      const nextMainPage = await models.Page.findByPk(project.pages[0].id);
      nextMainPage.url = "/";
      nextMainPage.settings = {
        ...project.pages[0].settings,
        parent: { pageId: null, url: "", name: "" },
      };
      await nextMainPage.save();
      project.routes = project.routes.map((r) => {
        if (r.id === project.pages[0].id) {
          return {
            ...r,
            path: "/",
          };
        } else {
          return r;
        }
      });
    } else {
      await detachChildrenFromDeleted(id);
    }

    await project.save();
    await project.reload(PAGE_INCLUDE);

    res.status(201).send(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete page" });
  }
});

module.exports = router;
