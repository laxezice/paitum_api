module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "restaurants",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cover_image: {
        type: DataTypes.TEXT,
      },
      coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      star: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Restaurant;
};
