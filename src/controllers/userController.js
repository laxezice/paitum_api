const { User, Coupon } = require("../models/ModelIntaillize");
module.exports = {
  getAll: async (request, reply) => {
    let users = await User.findAll({
      include: {
        model: User,
        as: "following",
        attributes: { exclude: ["password"] },
      },
    });
    return { users: users };
  },

  register: async (request, reply) => {
    const data = request.body;
    let user = User.build({ ...data, coin: 0 });
    await user.save();
    return {
      status: 201,
      message: "register success",
      user: { ...user.dataValues, password: null },
    };
  },

  login: async (request, reply) => {
    const data = request.body;
    let user = await User.findOne({
      where: {
        username: data.username,
      },
    });
    if (data.password === user.password) {
      return {
        status: 200,
        message: "get data success",
        user: { ...user.dataValues, password: null },
      };
    } else {
      return {
        status: 400,
        message: "username or password is incorrect",
      };
    }
  },

  follow: async (request, reply) => {
    let follower = await User.findByPk(request.body.main);
    let followed = await User.findByPk(request.body.sub);
    await follower.addFollowing(followed);
    return {
      status: 200,
      message: "follow success",
    };
  },

  unfollow: async (request, reply) => {
    let follower = await User.findByPk(request.body.main);
    let followed = await User.findByPk(request.body.sub);
    await follower.removeFollowing(followed);
    return {
      status: 200,
      message: "unfollow success",
    };
  },

  profile: async (request, reply) => {
    let user = await User.findByPk(request.query.userId, {
      attributes: { exclude: ["password"] },
      include: ["following", "follower", "coupons"],
    });
    return {
      status: 200,
      message: "get success",
      user: user,
    };
  },
};
