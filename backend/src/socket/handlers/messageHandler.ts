import type { Server, Socket } from "socket.io";
import prisma from "../../db/client.js";

export const registerMessageHandler = (socket: Socket, io: Server) => {
    socket.on("send_message", async (data) => {
        const newMessage = await prisma.message.create({
            data: {
                message: data.message,
                senderId: data.senderId,
                conversationId: data.conversationId
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: data.conversationId,
            },
            data: {
                lastMessageId: newMessage.id,
                updatedAt: new Date()
            },
            include: {
                participants: true,
                lastMessage: true
            }
        })

        io.to(data.conversationId).emit("new_message", {
            message: newMessage,
            conversation: updatedConversation
        })

        updatedConversation.participants.forEach((p) => {
            io.to(p.userId).emit("conversation_list_update", updatedConversation)
        })
    }
    )
}
