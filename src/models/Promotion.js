module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "promotions",
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
      exp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
  return Promotion;
};
