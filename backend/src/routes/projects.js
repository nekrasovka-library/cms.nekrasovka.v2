const express = require("express");
const router = express.Router();
const { models } = require("../models");
const { Op } = require("sequelize");

const EMPTY_PARENT = { pageId: null, url: "", name: "" };
const PAGE_INCLUDE = {
  include: [{ model: models.Page, as: "pages" }],
};

// GET /api/projects - список проектов
router.get("/", async (req, res) => {
  try {
    const projects = await models.Project.findAll();
    res.json(projects);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/projects - создание проекта
router.post("/", async (req, res) => {
  try {
    const params = req.body || {};
    const project = await models.Project.create({ ...params });

    res.status(201).json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// GET /api/projects/:id - один проект (с его страницами)
router.get("/:id", async (req, res) => {
  try {
    const project = await models.Project.findByPk(req.params.id, {
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
        },
      ],
      order: [
        [{ model: models.Page, as: "pages" }, "id", "ASC"],
        [
          { model: models.Page, as: "pages" },
          { model: models.Block, as: "blocks" },
          "id",
          "ASC",
        ],
      ],
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const groupedPages = project.toJSON().pages.reduce((acc, page) => {
      const groupIndex = acc.findIndex((group) => group.url === page.url);

      if (acc[groupIndex]) {
        if (!acc[groupIndex].data) {
          const firstPage = { ...acc[groupIndex] };
          acc[groupIndex] = {
            id: firstPage.id,
            name: firstPage.name,
            url: firstPage.url,
            settings: firstPage.settings,
            projectId: firstPage.projectId,
            data: [firstPage],
          };
        }

        acc[groupIndex].data.push(page);
      } else {
        acc.push(page);
      }

      return acc;
    }, []);

    const projectResponse = project.toJSON();
    projectResponse.pages = groupedPages;
    res.json(projectResponse);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

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

// PUT /api/projects/:id - изменение проекта
router.put("/:id", async (req, res) => {
  try {
    const { name, settings, url, styles, routes } = req.body || {};
    const project = await models.Project.findByPk(req.params.id, {
      include: [{ model: models.Page, as: "pages" }],
      order: [[{ model: models.Page, as: "pages" }, "id", "ASC"]],
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    if (typeof styles !== "undefined") {
      project.styles = { ...project.styles, ...styles };
    }
    if (typeof routes !== "undefined") project.routes = routes;
    if (typeof url !== "undefined") project.url = url;
    if (typeof name !== "undefined") project.name = name;
    if (typeof settings !== "undefined") {
      if (
        settings.main_page_id &&
        project.settings.main_page_id !== settings.main_page_id
      ) {
        const pages = await models.Page.findAll({
          where: { projectId: project.id },
        });

        for (const page of pages) {
          if (page.id === settings.main_page_id) {
            await detachChildrenFromDeleted(page.id);

            page.url = "/";
            page.settings = {
              ...page.settings,
              parent: {
                pageId: null,
                url: "",
                name: "",
              },
            };

            await page.save();

            project.routes = project.routes.map((r) => {
              if (r.id === page.id) {
                return {
                  ...r,
                  path: "/",
                };
              } else {
                return r;
              }
            });
          }

          if (page.id === project.settings.main_page_id) {
            page.url = `page_${page.id}`;
            page.settings = {
              ...page.settings,
              parent: {
                pageId: null,
                url: "",
                name: "",
              },
            };

            await page.save();

            project.routes = project.routes.map((r) => {
              if (r.id === page.id) {
                return {
                  ...r,
                  path: `page_${page.id}`,
                };
              } else {
                return r;
              }
            });
          }
        }
      }

      project.settings = settings;
    }

    await project.save();
    await project.reload(PAGE_INCLUDE);

    res.json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/projects/:id - удаление проекта (каскадно удалит страницы)
router.delete("/:id", async (req, res) => {
  try {
    const project = await models.Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.destroy();
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// GET /api/projects/:id/pages - список страниц проекта
router.get("/:id/pages", async (req, res) => {
  try {
    const pages = await models.Page.findAll({
      where: { projectId: req.params.id },
      order: [["id", "ASC"]],
    });
    res.json(pages);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch project pages" });
  }
});

module.exports = router;
