const express = require("express");
const router = express.Router();
const { models } = require("../models");
const { Op } = require("sequelize");
const { getGroupedPages } = require("../helpers");

const EMPTY_PARENT = { pageId: null, url: "", name: "" };

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
router.get("/:id", async (req, res) => {
  try {
    let page;
    const id = Number.parseInt(req.params.id, 10);

    page = await models.Page.findByPk(id, {
      include: [{ model: models.Block, as: "blocks" }],
      order: [[{ model: models.Block, as: "blocks" }, "position", "ASC"]],
    });

    return res.json(page);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch page" });
  }
});

// POST /api/pages/grouped - создание сгруппированной страницы
router.post("/grouped", async (req, res) => {
  try {
    const params = req.body || {};
    if (!params.projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const page = await models.Page.create({
      projectId: +params.projectId,
      url: params.url,
      name: params.name,
      type: params.type,
      styles: params.styles,
    });

    page.settings = {
      ...page.settings,
      parent: { ...params.settings.parent },
    };

    await page.save();

    const groupedMainPage = await models.Page.findOne({
      where: {
        projectId: params.projectId,
        url: params.url,
      },
    });

    const groupedPageBlocks = await models.Block.findAll({
      where: { pageId: groupedMainPage.id },
    });

    for (const block of groupedPageBlocks) {
      const { type, position, styles, variantId } = block.toJSON();
      const variant = await models.Variant.findByPk(variantId, {
        attributes: ["content", "settings"],
      });

      await models.Block.create({
        pageId: page.id,
        settings: variant.settings,
        content: variant.content,
        type,
        position,
        styles,
        variantId,
      });
    }

    res.status(201).json(page.id);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// POST /api/pages/copy - копирование страницы
router.post("/copy", async (req, res) => {
  try {
    const params = req.body || {};
    if (!params.pageId) {
      return res.status(400).json({ error: "Page ID is required" });
    }

    const page = await models.Page.create({ ...params });

    const copiedPage = await models.Page.findByPk(params.pageId, {
      include: [{ model: models.Block, as: "blocks" }],
    });

    for (const block of copiedPage.blocks) {
      const { type, position, styles, settings, content, variantId } =
        block.toJSON();

      await models.Block.create({
        pageId: page.id,
        settings,
        content,
        type,
        position,
        styles,
        variantId,
      });
    }

    res.status(201).json(page.id);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// POST /api/pages - создание страницы
router.post("/", async (req, res) => {
  let projectResponse;
  try {
    const params = req.body || {};

    if (!params.projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const page = await models.Page.create({ projectId: +params.projectId });
    const template = await models.Template.findByPk(params.templateId);

    if (template.variants.length > 0) {
      for (const [index, variantId] of template.variants.entries()) {
        const variant = await models.Variant.findByPk(variantId, {
          attributes: ["type", "content", "settings", "styles"],
        });
        await models.Block.create({
          ...variant.toJSON(),
          variantId,
          position: index + 1,
          pageId: page.id,
        });
      }
    }

    const count = await models.Page.count({
      where: { projectId: page.projectId },
    });

    const pageName = `page_${page.id}`;
    const url = count > 1 ? pageName : "/";
    page.name = `Пустая страница ${page.id}`;
    page.url = url;

    await page.save();

    const project = await models.Project.findByPk(page.projectId, {
      include: [
        {
          model: models.Page,
          as: "pages",
          include: [
            {
              model: models.Block,
              as: "blocks",
              required: false,
              where: {
                type: {
                  [Op.notIn]: ["header", "footer"],
                },
              },
            },
          ],
          order: [[{ model: models.Block, as: "blocks" }, "id", "ASC"]],
        },
      ],
      order: [[{ model: models.Page, as: "pages" }, "id", "ASC"]],
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

    projectResponse = getGroupedPages(project);
    res.status(201).send(projectResponse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// PUT /api/pages/:id - изменить страницу
router.put("/:id", async (req, res) => {
  let pages;
  let isPages = false;
  let projectResponse;

  try {
    const { name, url, settings, styles, type } = req.body || {};
    const id = Number.parseInt(req.params.id, 10);
    const page = await models.Page.findByPk(id);
    if (!page) return res.status(404).json({ error: "Page not found" });

    if (page.type) {
      pages = await models.Page.findAll({ where: { url: page.url } });
      isPages = pages.length > 0;
    }

    if (typeof type !== "undefined") {
      page.type = type;

      if (isPages) {
        for (const pageKey of pages) {
          pageKey.type = type;
          await pageKey.save();
        }
      }
    }
    if (typeof settings !== "undefined") {
      page.settings = settings;

      if (isPages) {
        for (const pageKey of pages) {
          pageKey.settings = {
            ...pageKey.settings,
            parent: { ...settings.parent },
          };

          await pageKey.save();
        }
      }
    }

    if (typeof styles !== "undefined") {
      page.styles = styles;

      if (isPages) {
        for (const pageKey of pages) {
          pageKey.styles = styles;
          await pageKey.save();
        }
      }
    }
    if (typeof name !== "undefined") {
      page.name = name;

      if (isPages) {
        for (const pageKey of pages) {
          pageKey.name = name;
          await pageKey.save();
        }
      }
    }
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
      include: [
        {
          model: models.Page,
          as: "pages",
          include: [
            {
              model: models.Block,
              as: "blocks",
              required: false,
              where: {
                type: {
                  [Op.notIn]: ["header", "footer"],
                },
              },
            },
          ],
          order: [[{ model: models.Block, as: "blocks" }, "id", "ASC"]],
        },
      ],
      order: [[{ model: models.Page, as: "pages" }, "id", "ASC"]],
    });

    projectResponse = getGroupedPages(project);

    res.status(201).send(projectResponse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update page" });
  }
});

// DELETE /api/pages/:id - удалить страницу
router.delete("/:id", async (req, res) => {
  let projectResponse;

  try {
    const id = Number.parseInt(req.params.id, 10);
    const page = await models.Page.findByPk(id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    await page.destroy();

    const project = await models.Project.findByPk(page.projectId, {
      include: [
        {
          model: models.Page,
          as: "pages",
          include: [
            {
              model: models.Block,
              as: "blocks",
              required: false,
              where: {
                type: {
                  [Op.notIn]: ["header", "footer"],
                },
              },
            },
          ],
          order: [[{ model: models.Block, as: "blocks" }, "id", "ASC"]],
        },
      ],
      order: [[{ model: models.Page, as: "pages" }, "id", "ASC"]],
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

    projectResponse = getGroupedPages(project);

    res.status(201).send(projectResponse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete page" });
  }
});

module.exports = router;
