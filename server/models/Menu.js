module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "menus",
      timestamps: true,
    },
  );

  return Menu;
};
