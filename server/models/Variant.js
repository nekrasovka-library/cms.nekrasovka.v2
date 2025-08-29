module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define(
    "Variant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      content: {
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
      tableName: "variants",
      timestamps: true,
    },
  );

  return Variant;
};
