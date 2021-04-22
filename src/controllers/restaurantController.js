const {
  Restaurant,
  User,
  Review,
  Comment,
  ReviewIamge,
  Promotion,
  Coupon,
} = require("../models/ModelIntaillize");
const { Sequelize } = require("../configs/dbconfig");
const { Op, where } = require("sequelize");
module.exports = {
  getAll: async (request, reply) => {
    let restautants = await Restaurant.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: User,
          as: "followers",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return { restautants: restautants };
  },

  get: async (request, reply) => {
    let restautants = await Restaurant.findOne({
      where: {
        id: request.params.restaurantId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: User,
          as: "followers",
          attributes: { exclude: ["password"] },
        },
        {
          model: Review,
          as: "userReviews",
          include: {
            model: ReviewIamge,
            as: "images",
          },
        },
      ],
    });
    return { restautants: restautants };
  },

  findByDistance: async (request, reply) => {
    let data = request.body;
    let restautants = await Restaurant.findAll({
      where: {
        latitude: {
          [Op.and]: {
            [Op.gte]: data.latitude - data.radius / 111000,
            [Op.lte]: data.latitude + data.radius / 111000,
          },
        },
        longitude: {
          [Op.and]: {
            [Op.gte]: data.longitude - data.radius / 111000,
            [Op.lte]: data.longitude + data.radius / 111000,
          },
        },
      },
    });
    return { restautants: restautants };
  },

  create: async (request, reply) => {
    const data = request.body;
    let restaurant = Restaurant.build({ ...data, coin: 1000, star: 0 });
    await restaurant.save();
    return {
      status: 201,
      message: "create success",
      restaurant: { ...restaurant.dataValues },
    };
  },

  review: async (request, reply) => {
    const data = request.body;

    let review = await Review.create(data, {
      include: { model: ReviewIamge, as: "images" },
    });
    let user = await User.findByPk(data.userId);
    let restaurant = await Restaurant.findOne({
      where: {
        id: data.restaurantId,
      },
      include: ["userReviews"],
    });

    //cal coin
    let r = restaurant.userReviews.length;
    let getCoin = 20;
    if (restaurant.coin < 20) {
      getCoin = restaurant.coin;
      restaurant.coin = 0;
    } else {
      restaurant.coin = restaurant.coin - 20;
    }
    getCoin += Math.ceil(1000 / (r * 10));
    user.coin += getCoin;

    star = 0;
    // cal star
    for (let i = 0; i < restaurant.userReviews.length; i++) {
      star += restaurant.userReviews[i].star;
    }
    restaurant.star = star / restaurant.userReviews.length;

    await user.save();
    await restaurant.save();
    return {
      status: 201,
      message: "review success",
      review: review.dataValues,
    };
  },

  comment: async (request, reply) => {
    const data = request.body;
    let comment = await Comment.build(data);
    await comment.save(data);
    return {
      status: 201,
      message: "comment success",
    };
  },

  like: async (request, reply) => {
    const data = request.body;
    let user = await User.findByPk(data.userId);
    let review = await Review.findByPk(data.reviewId);
    await user.addLikes(review);
    return {
      status: 200,
      message: "like success",
    };
  },

  unlike: async (request, reply) => {
    const data = request.body;
    let user = await User.findByPk(data.userId);
    let review = await Review.findByPk(data.reviewId);
    await user.removeLikes(review);
    return {
      status: 200,
      message: "unlike success",
    };
  },

  getReview: async (request, reply) => {
    let review = await Review.findOne({
      where: {
        id: request.params.reviewId,
      },
      include: [
        {
          model: User,
          as: "reviewBy",
          attributes: {
            exclude: [
              "password",
              "birthday",
              "gender",
              "caption",
              "coin",
              "cover_image",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: User,
          as: "commenBy",
          attributes: {
            exclude: [
              "password",
              "birthday",
              "gender",
              "caption",
              "coin",
              "cover_image",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: User,
          as: "likeBy",
          attributes: {
            exclude: [
              "password",
              "birthday",
              "gender",
              "caption",
              "coin",
              "cover_image",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });
    return { status: 201, message: "add success", review: review };
  },

  addPromotion: async (request, reply) => {
    const data = request.body;
    let promotion = await Promotion.build(data);
    await promotion.save(data);
    return {
      status: 201,
      message: "add success",
      promotion: promotion.dataValues,
    };
  },

  getPromotion: async (request, reply) => {
    let promotions = await Promotion.findAll({
      where: {
        restaurantId: request.params.restaurantId,
      },
    });
    return {
      status: 200,
      message: "get success",
      promotion: promotions,
    };
  },

  addCoupon: async (request, reply) => {
    const data = request.body;
    let coupon = await Coupon.build(data);
    await coupon.save(data);
    return {
      status: 201,
      message: "add success",
      promotion: coupon.dataValues,
    };
  },

  getCoupon: async (request, reply) => {
    let coupons = await Coupon.findAll({
      where: {
        restaurantId: request.params.restaurantId,
      },
    });
    return {
      status: 200,
      message: "get success",
      coupons: coupons,
    };
  },

  redeem: async (request, reply) => {
    const data = request.body;
    const coupon = await Coupon.findByPk(data.couponId);
    if (coupon.quantity > 0) {
      const user = await User.findOne({
        where: {
          id: data.userId,
        },
        include: [
          {
            model: Coupon,
            as: "coupons",
          },
        ],
      });

      let have = user.coupons.some(function (coupon) {
        return coupon.id == data.couponId;
      });
      if (have) {
        return {
          status: 400,
          message: "already redeem",
        };
      }

      if (user.coin >= coupon.coin) {
        user.coin -= coupon.coin;
        coupon.quantity -= 1;
        await user.addCoupons(coupon);
        await user.save();
        await coupon.save();
        return {
          status: 201,
          message: "redeem success",
        };
      } else {
        return {
          status: 400,
          message: "coin not enough",
        };
      }
    }
    return {
      status: 400,
      message: "coupon is emty",
    };
  },
};
