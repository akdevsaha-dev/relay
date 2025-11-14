import type { Server as HTTPServer } from "http"
import { Server, Socket } from "socket.io";
let io: Server | null = null;
export const initSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.on("connection", (socket: Socket) => {
        console.log("socket connected", socket.id)
    })
}

export const getSocket = (): Server => {
    if (!io) {
        throw new Error("Socket io has not been initialized yet!")
    }
    return io;
} 