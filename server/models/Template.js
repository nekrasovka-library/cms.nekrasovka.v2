module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define(
    "Template",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      variants: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "templates",
      timestamps: true,
    },
  );

  return Template;
};
