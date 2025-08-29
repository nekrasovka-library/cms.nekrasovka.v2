const express = require("express");
const router = express.Router();
const { models } = require("../models");

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
      include: [{ model: models.Page, as: "pages" }],
      order: [[{ model: models.Page, as: "pages" }, "createdAt", "DESC"]],
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// PUT /api/projects/:id - изменение проекта
router.put("/:id", async (req, res) => {
  try {
    const { name, settings, url, styles, routes } = req.body || {};
    const project = await models.Project.findByPk(req.params.id, {
      include: [{ model: models.Page, as: "pages" }],
      order: [[{ model: models.Page, as: "pages" }, "createdAt", "DESC"]],
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    if (typeof url !== "undefined") project.url = url;
    if (typeof name !== "undefined") project.name = name;
    if (typeof settings !== "undefined") project.settings = settings;
    if (typeof styles !== "undefined") project.styles = styles;
    if (typeof routes !== "undefined") project.routes = routes;

    await project.save();

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
    });
    res.json(pages);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch project pages" });
  }
});

module.exports = router;
