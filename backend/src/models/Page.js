module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "Page",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      settings: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
          parent: { pageId: null, url: "", name: "" },
          is_public: 0,
          is_archive: 0,
          is_private: 0,
        },
      },
      styles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "pages",
      timestamps: true,
    },
  );

  return Page;
};
