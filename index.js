const fastify = require("fastify")({ logger: false });
const { sequelize } = require("./src/configs/dbconfig");
const fastifySwagger = require("fastify-swagger");
// const model = require("./src/models/ModelIntaillize");
// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "test" };
});

fastify.register(fastifySwagger, {
  routePrefix: "/docs",
  swgger: {
    info: {
      title: "Paitum api document",
      discription: "",
      version: "1.0.0",
    },
  },
  exposeRoute: true,
});
fastify.register(require("./src/routes/user"), { prefix: "/user" });
fastify.register(require("./src/routes/restaurant"), { prefix: "/restaurant" });

// Run the server!
const start = async () => {
  fastify.listen(process.env.PORT || 3000, "0.0.0.0", function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  });
};
start();
