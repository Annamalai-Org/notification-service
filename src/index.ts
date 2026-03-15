import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { createServer } from "http"

import { initSocket } from "./socket"
import notificationRoutes from "./routes/notification"
import "./workers/emailWorker"  // just importing starts the worker
import logger from "./utils/logger"

const app = express()
const server = createServer(app)

initSocket(server)

app.use(express.json())
app.use(notificationRoutes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})