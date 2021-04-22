module.exports = (sequelize, DataTypes) => {
  const ReviewImage = sequelize.define(
    "review_images",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return ReviewImage;
};
