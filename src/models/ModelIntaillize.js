const { DataTypes } = require("sequelize");
const db = require("../configs/dbconfig");
const sequelize = db.sequelize;

Model = {};
Model.User = require("./User")(sequelize, DataTypes);
Model.Restaurant = require("./Restaurant")(sequelize, DataTypes);
Model.Review = require("./Review")(sequelize, DataTypes);
Model.ReviewIamge = require("./ReviewImage")(sequelize, DataTypes);
Model.Comment = require("./Comment")(sequelize, DataTypes);
Model.Coupon = require("./Coupon")(sequelize, DataTypes);
Model.Promotion = require("./Promotion")(sequelize, DataTypes);

//follow user
Model.User.belongsToMany(Model.User, {
  as: "following",
  foreignKey: "following",
  through: "follow",
});
Model.User.belongsToMany(Model.User, {
  as: "follower",
  foreignKey: "follower",
  through: "follow",
});

//restaurant owner
Model.User.hasMany(Model.Restaurant, { as: "restaurants" });
Model.Restaurant.belongsTo(Model.User, { as: "user" });

//reviews by user
Model.User.hasMany(Model.Review, {
  as: "myReviews",
});
Model.Review.belongsTo(Model.User, {
  as: "reviewBy",
  foreignKey: "userId",
});
Model.Restaurant.hasMany(Model.Review, {
  as: "userReviews",
});
Model.Review.belongsTo(Model.Restaurant, {
  as: "reviewTo",
  foreignKey: "restaurantId",
});

//review image
Model.Review.hasMany(Model.ReviewIamge, { as: "images" });
Model.ReviewIamge.belongsTo(Model.Review, { as: "post" });

//comment review
Model.User.belongsToMany(Model.Review, {
  as: "myComments",
  through: Model.Comment,
});
Model.Review.belongsToMany(Model.User, {
  as: "commenBy",
  through: Model.Comment,
});

//like on review
Model.User.belongsToMany(Model.Review, { as: "likes", through: "like" });
Model.Review.belongsToMany(Model.User, { as: "likeBy", through: "like" });

//follow restaurant
Model.User.belongsToMany(Model.Restaurant, {
  as: "favRestaurants",
  through: "follow_restaurants",
});
Model.Restaurant.belongsToMany(Model.User, {
  as: "followers",
  through: "follow_restaurants",
});

//restaurant coupon
Model.Restaurant.hasMany(Model.Coupon, { as: "coupons" });
Model.Coupon.belongsTo(Model.Restaurant, { as: "restaurant" });

//restaurant promotion
Model.Restaurant.hasMany(Model.Promotion, { as: "promotions" });
Model.Promotion.belongsTo(Model.Restaurant, { as: "restaurant" });

//user's coupon
Model.User.belongsToMany(Model.Coupon, {
  as: "coupons",
  through: "user_coupons",
});
Model.Coupon.belongsToMany(Model.User, {
  as: "redeemBy",
  through: "user_coupons",
});
//db.sequelize.sync({ force: true });

module.exports = Model;
