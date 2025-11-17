import type { Server, Socket } from "socket.io";
import prisma from "../../db/client.js";

export const registerUserHandler = (socket: Socket, io: Server) => {
    socket.on("join_user", async (userId: string) => {
        socket.data.userId = userId
        socket.join(userId)

        await prisma.user.update({
            where: {
                id: userId
            }, data: {
                status: "online",
            }
        })

        const contacts = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                myContacts: {
                    include: {
                        addedUser: true
                    }
                }
            }
        })
        if (!contacts) return
        contacts.myContacts.forEach((contact) =>
            io.to(contact.addedUserId).emit("user_status", {
                userId,
                status: "online"
            })
        )
    })

    socket.on("disconnect", async () => {
        const userId = socket.data.userId
        if (!userId) return;

        await prisma.user.update({
            where: {
                id: userId,
            }, data: {
                lastSeen: new Date(),
                status: "offline"
            }
        })

        const contacts = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                myContacts: {
                    include: {
                        addedUser: true
                    }
                }
            }
        })
        contacts?.myContacts.forEach((contact) => {
            io.to(contact.addedUserId).emit("user_status", {
                userId,
                status: "offline"
            })
        })
    })
}