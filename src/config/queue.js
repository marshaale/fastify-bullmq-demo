import { Queue } from "bullmq";
import connection from "./redis-connection.js";

const queue = new Queue("queue", { connection });

export default queue;
