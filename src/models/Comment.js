module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
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
  return Comment;
};
