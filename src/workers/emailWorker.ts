import { Worker, Job } from "bullmq"
import { connection } from "../queues/emailQueue"
import mailer from "../config/mailer"
import logger from "../utils/logger"
import { getIO } from "../socket"

const emailWorker = new Worker("emailQueue", async (job: Job) => {
    const { to, subject, message } = job.data


    try {
        getIO().emit("notification-status", {  // same event name for all
            email: to,
            status: "processing",
            timestamp: new Date().toISOString()
        })
        logger.info(`Processing job ${job.id} for email ${to}`)
        await mailer.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text: message
        })
        getIO().emit("notification-status", {
            email: to,
            status: "sent",
            timestamp: new Date().toISOString()
        })
        logger.info(`Email sent successfully for job ${job.id}`)

    } catch (error) {
        getIO().emit("notification-status", {
            email: to,
            status: "failed",
            timestamp: new Date().toISOString()
        })
        const err = error as Error

        logger.error(`Failed to send email for job ${job.id}: ${err.message}`)
        throw error
    }


}, { connection })

emailWorker.on("failed", (job, error: Error) => {
    logger.error(`Job ${job?.id} failed: ${error.message}`)
})

export default emailWorker