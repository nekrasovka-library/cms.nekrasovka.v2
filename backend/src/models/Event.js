module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        // формат YYYY-MM-DD
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      time_start: {
        // дата+время, например "2025-08-07 19:30:00"
        type: DataTypes.DATE,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      geo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      geo_link: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      picture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      og_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      restriction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      is_public: {
        // 0/1
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "events",
      timestamps: true,
    },
  );

  return Event;
};
