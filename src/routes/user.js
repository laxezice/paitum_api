const userController = require("../controllers/userController");
const userSchema = require("../schema/userSchema");
module.exports = function (fastify, opts, done) {
  fastify.get("/all", userController.getAll);

  fastify.post(
    "/register",
    { schema: userSchema.registerSchema },
    userController.register
  );

  fastify.post(
    "/login",
    { schema: userSchema.loginSchema },
    userController.login
  );

  fastify.put(
    "/follow",
    { schema: userSchema.followSchema },
    userController.follow
  );

  fastify.put(
    "/unfollow",
    { schema: userSchema.followSchema },
    userController.unfollow
  );

  fastify.get(
    "/profile",
    { schema: userSchema.profileSchema },
    userController.profile
  );
  done();
};
