import { Queue } from "bullmq"

const redisUrl = new URL(process.env.REDIS_URL || "redis://localhost:6379")
const connection = {
  host: redisUrl.hostname,
  port: parseInt(redisUrl.port || "6379"),
  password: redisUrl.password
}

const emailQueue = new Queue("emailQueue", { connection })

export { connection }
export default emailQueue