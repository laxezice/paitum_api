const resController = require("../controllers/restaurantController");
const resSchema = require("../schema/resSchema");
module.exports = function (fastify, {}, done) {
  fastify.get("/all", resController.getAll);

  fastify.get(
    "/:restaurantId",
    { schema: resSchema.getSchema },
    resController.get
  );

  fastify.post(
    "/near",
    { schema: resSchema.nearSchema },
    resController.findByDistance
  );

  fastify.post(
    "/create",
    { schema: resSchema.createSchema },
    resController.create
  );

  fastify.post(
    "/review",
    { schema: resSchema.reviewSchema },
    resController.review
  );

  fastify.get(
    "/review/:reviewId",
    { schema: resSchema.getReviewSchema },
    resController.getReview
  );

  fastify.post(
    "/comment",
    { schema: resSchema.commentSchema },
    resController.comment
  );

  fastify.put("/like", { schema: resSchema.likeSchema }, resController.like);

  fastify.put(
    "/unlike",
    { schema: resSchema.likeSchema },
    resController.unlike
  );

  fastify.post(
    "/coupon",
    { schema: resSchema.couponSchema },
    resController.addCoupon
  );

  fastify.get(
    "/coupon/:restaurantId",
    { schema: resSchema.getPromotionSchema },
    resController.getCoupon
  );

  fastify.post(
    "/promotion",
    { schema: resSchema.promotionSchema },
    resController.addPromotion
  );

  fastify.get(
    "/promotion/:restaurantId",
    { schema: resSchema.getPromotionSchema },
    resController.getPromotion
  );

  fastify.put(
    "/redeem",
    { schema: resSchema.redeemSchema },
    resController.redeem
  );
  done();
};
