const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

// SQLite database file stored in server/data/database.sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../data/database.sqlite"),
  logging: false,
});

// Models
const Project = require("./Project")(sequelize, DataTypes);
const Page = require("./Page")(sequelize, DataTypes);
const Block = require("./Block")(sequelize, DataTypes);
const Menu = require("./Menu")(sequelize, DataTypes);
const Variant = require("./Variant")(sequelize, DataTypes);
const Template = require("./Template")(sequelize, DataTypes);
const Event = require("./Event")(sequelize, DataTypes);

// Associations
Project.hasMany(Page, {
  as: "pages",
  foreignKey: "projectId",
  onDelete: "CASCADE",
  hooks: true,
});
Page.belongsTo(Project, {
  as: "project",
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Template.hasMany(Project, {
  as: "projects",
  foreignKey: "templateId",
});
Project.belongsTo(Template, {
  as: "template",
  foreignKey: "templateId",
});

Page.hasMany(Block, {
  as: "blocks",
  foreignKey: "pageId",
  onDelete: "CASCADE",
  hooks: true,
});
Block.belongsTo(Page, {
  as: "page",
  foreignKey: "pageId",
  onDelete: "CASCADE",
});

Menu.hasMany(Variant, {
  as: "variants",
  foreignKey: "menuId",
  onDelete: "CASCADE",
  hooks: true,
});
Variant.belongsTo(Menu, {
  as: "menu",
  foreignKey: "menuId",
  onDelete: "CASCADE",
});

const db = {
  sequelize,
  Sequelize,
  models: {
    Project,
    Page,
    Block,
    Menu,
    Variant,
    Template,
    Event,
  },
};

module.exports = db;
