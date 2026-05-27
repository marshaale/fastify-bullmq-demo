import fastify from "fastify";
import queue from "./config/queue.js";
import connection from "./config/redis-connection.js";
import { fastifySchedule } from "@fastify/schedule";
import { notificationCronJob } from "./jobs/cron.job.js";

const app = fastify({
  logger: true,
});

app.register(fastifySchedule);

app.get("/", (request, reply) => {
  return {
    message: "Server is working..........",
    timestamp: new Date().toISOString(),
  };
});

app.post(
  "/emails/send",
  {
    schema: {
      body: {
        type: "object",
        required: ["to", "subject"],
        properties: {
          to: { type: "string" },
          subject: { type: "string" },
        },
      },
    },
  },
  async (request, reply) => {
    const { to, subject } = request.body;

    const job = await queue.add(
      "send-email",
      { to, subject },
      {
        attempts: 3,
        removeOnComplete: true,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );

    return {
      success: true,
      data: job,
    };
  },
);

app.ready().then(() => {
  console.log("Here");
  app.scheduler.addCronJob(notificationCronJob);
});

app.listen({
  port: 3000,
});
