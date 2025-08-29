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
        defaultValue: {},
      },
      styles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      tableName: "pages",
      timestamps: true,
    },
  );

  return Page;
};
