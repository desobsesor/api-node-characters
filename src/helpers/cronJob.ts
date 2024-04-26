import { createCronJob } from "../utils/cronJob";

export const myCronJob = createCronJob("* * 12 * * *"); // Cron expression for every 12 hours
