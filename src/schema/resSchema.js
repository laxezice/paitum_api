module.exports = {
  getSchema: {
    params: {
      type: "object",
      required: ["restaurantId"],
      properties: {
        restaurantId: { type: "number" },
      },
    },
  },

  createSchema: {
    body: {
      type: "object",
      required: ["name", "about", "avatar", "latitude", "longitude", "userId"],
      properties: {
        name: { type: "string" },
        about: { type: "string" },
        avatar: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        userId: { type: "number" },
        cover_image: { type: "string" },
      },
    },
  },

  reviewSchema: {
    body: {
      type: "object",
      required: ["userId", "restaurantId", "message", "star"],
      properties: {
        userId: { type: "number" },
        restaurantId: { type: "number" },
        message: { type: "string" },
        star: { type: "number" },
        images: {
          type: "array",
          items: {
            type: "object",
            required: ["url"],
            properties: {
              url: { type: "string" },
            },
          },
        },
      },
    },
  },

  getReviewSchema: {
    params: {
      type: "object",
      required: ["reviewId"],
      properties: {
        reviewId: { type: "number" },
      },
    },
  },

  commentSchema: {
    body: {
      type: "object",
      required: ["message", "userId", "reviewId"],
      properties: {
        userId: { type: "number" },
        reviewId: { type: "number" },
        message: { type: "string" },
      },
    },
  },

  likeSchema: {
    body: {
      type: "object",
      required: ["userId", "reviewId"],
      properties: {
        userId: { type: "number" },
        reviewId: { type: "number" },
      },
    },
  },

  nearSchema: {
    body: {
      type: "object",
      required: ["latitude", "longitude", "radius"],
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        radius: { type: "number" },
      },
    },
  },

  promotionSchema: {
    body: {
      type: "object",
      required: ["name", "exp", "description", "restaurantId"],
      properties: {
        name: { type: "string" },
        exp: { type: "string", format: "date-time" },
        image: { type: "string" },
        description: { type: "string" },
        restaurantId: { type: "number" },
      },
    },
  },

  couponSchema: {
    body: {
      type: "object",
      required: [
        "name",
        "exp",
        "description",
        "restaurantId",
        "coin",
        "quantity",
      ],
      properties: {
        name: { type: "string" },
        exp: { type: "string", format: "date-time" },
        image: { type: "string" },
        description: { type: "string" },
        coin: { type: "number" },
        quantity: { type: "number" },
        restaurantId: { type: "number" },
      },
    },
  },

  redeemSchema: {
    body: {
      type: "object",
      required: ["userId", "couponId"],
      properties: {
        userId: { type: "number" },
        couponId: { type: "number" },
      },
    },
  },

  getPromotionSchema: {
    params: {
      type: "object",
      required: ["restaurantId"],
      properties: {
        restaurantId: { type: "number" },
      },
    },
  },
};
