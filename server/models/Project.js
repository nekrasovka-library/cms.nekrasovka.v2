module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
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
      routes: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "projects",
      timestamps: true,
    },
  );

  return Project;
};
