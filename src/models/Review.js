module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deleteAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );
  return Review;
};
