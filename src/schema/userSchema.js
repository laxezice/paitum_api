module.exports = {
  registerSchema: {
    body: {
      type: "object",
      required: [
        "username",
        "password",
        "confirmPassword",
        "firstname",
        "lastname",
        "birthday",
        "gender",
      ],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
        confirmPassword: { type: "string" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        birthday: { type: "string", format: "date-time" },
        gender: {
          type: "string",
          enum: ["male", "female"],
        },
        caption: { type: ["string", "null"] },
        avatar: { type: ["string", "null"] },
        cover_image: { type: ["string", "null"] },
      },
    },
  },

  loginSchema: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
  },

  followSchema: {
    body: {
      type: "object",
      required: ["main", "sub"],
      properties: {
        main: { type: "number" },
        sub: { type: "number" },
      },
    },
  },

  profileSchema: {
    querystring: {
      type: "object",
      required: ["userId"],
      properties: {
        userId: { type: "number" },
      },
    },
  },
};
