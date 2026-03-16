import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { createServer } from "http"

import { initSocket } from "./socket"
import notificationRoutes from "./routes/notification"
import "./workers/emailWorker"  
import logger from "./utils/logger"
import cors from "cors";

const app = express()
const server = createServer(app)

initSocket(server)

app.use(express.json())

app.use(cors());
app.use(notificationRoutes)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})