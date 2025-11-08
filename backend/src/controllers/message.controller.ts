import type { Request, Response } from "express";
import z from "zod"
import prisma from "../db/client.js";
export const createMessage = async (req: Request, res: Response) => {

    const schema = z.object({
        message: z.string(),
        senderId: z.string(),
        conversationId: z.string()
    })
    try {
        const { message, senderId, conversationId } = schema.parse(req.body)
        if (!message || !senderId || !conversationId) {
            return res.status(400).json({
                success: false,
                message: "short on inputs"
            })
        }
        const newMessage = await prisma.message.create({
            data: {
                message,
                senderId,
                conversationId
            }
        })

        await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageId: newMessage.id
            }
        })
        return res.status(400).json({
            success: true,
            message: "sent",
            data: newMessage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: "Failed to send message."
        })
    }
}


export const getMessage = async (req: Request, res: Response) => {
    const { conversationId } = req.params
    if (!conversationId) {
        return res.status(400).json({
            success: false,
            message: "Missing conversation id."
        })
    }
    try {
        const allMessages = await prisma.message.findMany({
            where: {
                conversationId
            },
            orderBy: {
                createdAt: "asc"
            },
        })
        return res.status(200).json({
            success: true,
            data: allMessages,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: "Failed to fetch messages"
        })
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No message id"
            })
        }
        await prisma.message.delete({
            where: {
                id
            }
        })

        return res.status(200).json({
            success: true,
            message: "Messsage deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: "Failed to delete message. Try again!"
        })
    }
}

export const updateMessage = async (req: Request, res: Response) => {
    const { id } = req.params
    const { message } = req.body
    try {
        if (!id || !message) {
            return res.status(400).json({
                success: false,
                message: "short on inputs"
            })
        }
        const updatedMessage = await prisma.message.update({
            where: {
                id
            },
            data: {
                message
            }
        })
        return res.status(200).json({
            success: true,
            data: updatedMessage
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Failed to update message!"
        })
    }
}