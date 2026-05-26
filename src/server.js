import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/", (request, reply) => {
  return {
    message: "Server is working..........",
    timestamp: new Date().toISOString(),
  };
});

app.listen({
  port: 3000,
});
