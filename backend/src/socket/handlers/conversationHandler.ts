import type { Server, Socket } from "socket.io";

export const registerConversationHandler = (socket: Socket, io: Server) => {
    socket.on("join_conversation", (conversationId: string) => {
        socket.join(conversationId)
    })
    socket.on("leave_conversation", (conversationId: string) => {
        socket.leave(conversationId)
    })
}