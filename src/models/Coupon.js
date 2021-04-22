module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "coupons",
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
      coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
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
  return Coupon;
};
