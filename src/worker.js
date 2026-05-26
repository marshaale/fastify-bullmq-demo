import { Worker } from "bullmq";
import connection from "./config/redis-connection.js";

const worker = new Worker(
  "queue",
  async (job) => {
    console.log("Processing job: ", job.id);
    console.log("Data: ", job.data);
    return {
      completedAt: new Date(),
    };
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} is completed`);
});

worker.on("error", (job) => {
  console.log(`Job ${job.id} is failed`);
});

worker.on("closed", () => {
  console.log("Worker is closed");
});
