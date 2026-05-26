import { Worker } from "bullmq";
import connection from "./config/redis-connection.js";
import sendFakeEmail from "./utils/fake-email.js";

const worker = new Worker(
  "queue",
  async (job) => {
    console.log("Processing job: ", job.id);

    await sendFakeEmail(job.data);

    return {
      completedAt: new Date(),
    };
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} is completed`);
});

worker.on("failed", (job) => {
  console.log(`Job ${job.id} is failed`);
});

worker.on("error", (error) => {
  console.log("Worker error: ", error);
});

worker.on("closed", () => {
  console.log("Worker is closed");
});
