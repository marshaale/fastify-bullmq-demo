import { Queue } from "bullmq";
import IoRedis from "ioredis";

const connection = new IoRedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const mailQueue = new Queue("mail-queue", { connection });

console.log(connection);
console.log(mailQueue);

export { mailQueue, connection };
