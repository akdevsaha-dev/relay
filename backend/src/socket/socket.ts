import type { Server as HTTPServer } from "http"
import { Server, Socket } from "socket.io";
import { registerUserHandler } from "./handlers/userHandler.js";
import { registerConversationHandler } from "./handlers/conversationHandler.js";
import { registerMessageHandler } from "./handlers/messageHandler.js";
let io: Server | null = null;
export const initSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.on("connection", (socket: Socket) => {
        console.log("socket connected", socket.id)
        registerUserHandler(socket, io!)
        registerConversationHandler(socket, io!)
        registerMessageHandler(socket, io!)
    })
}

export const getSocket = (): Server => {
    if (!io) {
        throw new Error("Socket io has not been initialized yet!")
    }
    return io;
} 