import { CronJob } from "toad-scheduler";
import notificationSchedule from "../schedule/notification.schedule.js";

const notificationCronJob = new CronJob(
  {
    cronExpression: "* * * * *",
  },
  notificationSchedule,
);

export { notificationCronJob };
