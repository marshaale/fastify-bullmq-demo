import { Queue } from "bullmq";
import connection from "../config/redis-connection.js";

export default new Queue("notification-queue", { connection });
