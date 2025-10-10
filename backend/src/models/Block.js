module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      content: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "blocks",
      timestamps: true,
    },
  );

  return Block;
};
