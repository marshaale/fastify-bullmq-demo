import { AsyncTask } from "toad-scheduler";
import notificationQueue from "../queue/notification.queue.js";

const notificationSchedule = new AsyncTask(
  "notification",
  async (taskId) => {
    console.log(`Running scheduled task: ${taskId}`);
    await notificationQueue.add(
      "send-notification",
      {
        userId: 10,
        message: "Your document is not valid please make sure to update it.",
        isBroadcast: false,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );
  },
  (error) => console.log(`Schedule error: ${error.message}`),
);

export default notificationSchedule;
