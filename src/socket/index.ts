import { Server } from "socket.io"
import { Server as HttpServer } from "http"
import logger from "../utils/logger"


let io: Server

export const initSocket = (server: HttpServer) => {
    logger.info("Initializing socket server...")
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {
        logger.info(`Client connected: ${socket.id}`)

        socket.on("disconnect", () => {
            logger.info(`Client disconnected: ${socket.id}`)
        })
    })
}

export const getIO = (): Server => {
    if (!io) throw new Error("Socket not initialized")
    return io
}