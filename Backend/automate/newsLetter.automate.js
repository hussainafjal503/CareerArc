import cron from "node-cron";
import { Job } from "../models/jobSchema.models.js";
import { User } from "../models/userSchema.model.js";

import { sendEmail } from "../utils/sendEmail.js";

//cron is used schedule the task and that task automatically run when that event occured..
export const newsLetterCron = () => {
  try {
    cron.schedule("*/1 * * * *", async () => {
      console.log(`cron automate running...`)
      const jobs = await Job.find({ newsLettersSent: false });

      for (let job of jobs) {
        try {
          const filteredUsers = await User.find({
            $or: [
              { "niches.firstNiche": job.jobNiche },
              { "niches.secondNiche": job.jobNiche },
              { "niches.thirdNiche": job.jobNiche },
            ],
          });

          for (let users of filteredUsers) {
            const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
            const message = `Hi ${users.name},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\n Team`;

            sendEmail({
              email: users.email,
              subject,
              message,
            });
          }

          job.newsLettersSent = true;
          await job.save();
        } catch (err) {
          console.log(
            `error occured while finding job for sending mail newsLetter automate function : ${err}`
          );
          next(err);
        }
      }
    });
  } catch (err) {}
};
