import type { Request, Response } from "express";
import prisma from "../db/client.js";

export const createConversation = async (req: Request, res: Response) => {
    const { senderId, recieverId } = req.body
    try {
        if (!senderId || recieverId) {
            return res.status(400).json({
                success: false,
                message: "No sender or reciever ID"
            })
        }

        const existingConversation = await prisma.conversation.findFirst({
            where: {
                isGroup: false,
                participants: {
                    every: {
                        userId: { in: [senderId, recieverId] }
                    }
                }
            }
        })
        if (!existingConversation) {
            const conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        create: [
                            {
                                user: { connect: { id: senderId } }
                            },
                            {
                                user: { connect: { id: recieverId } }
                            }
                        ]
                    }
                }
            })
            return res.status(200).json({
                success: true,
                data: conversation.id
            })
        }
        return res.status(200).json({
            success: true,
            data: existingConversation.id
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: "Cannot create conversation."
        })
    }
}

export const getAllConversations = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Try again."
            })
        }

        const allConversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                lastMessage: true
            },
        })

        const conversations = allConversations.filter((c) => c.lastMessage !== null)
        return res.status(200).json({
            success: true,
            data: conversations
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: "cannot fetch conversations."
        })
    }
}


export const createGroupConversation = async (req: Request, res: Response) => {

    try {
        const { name, creatorId, groupMemberIds } = req.body;

        if (groupMemberIds.length < 2)
            return res.status(400).json({ message: "Minimum 3 people are required to create a group" })

        if (!name)
            return res.status(400).json({ message: "Cannot create group without a name" })

        if (!creatorId || !groupMemberIds)
            return res.status(400).json({ message: "cannot create group" })

        const group = await prisma.conversation.create({
            data: {
                isGroup: true,
                name,
                participants: {
                    create: [
                        { user: { connect: { id: creatorId } } },
                        ...groupMemberIds.map((id: string) => ({
                            user: { connect: { id } },
                        })),
                    ]
                }
            }
        })

    } catch (error) {

    }
}
