import type { Request, Response } from "express";
import prisma from "../db/client.js";
import { success } from "zod";

export const createConversation = async (req: Request, res: Response) => {
    const senderId = req.user?.id
    const { recieverId } = req.body
    try {
        if (!senderId || !recieverId) {
            return res.status(400).json({
                success: false,
                error: "No sender or reciever ID"
            })
        }

        const existingConversation = await prisma.conversation.findFirst({
            where: {
                isGroup: false,
                AND: [
                    { participants: { some: { userId: senderId } } },
                    { participants: { some: { userId: recieverId } } },
                ],
            }
        });
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
    const userId = req.user?.id
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: "Try again."
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
        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Cannot create group without a name."
            });
        }

        if (!creatorId) {
            return res.status(400).json({
                success: false,
                error: "Creator ID is required."
            });
        }

        if (!groupMemberIds || !Array.isArray(groupMemberIds)) {
            return res.status(400).json({
                success: false,
                error: "Group member IDs must be an array."
            });
        }

        if (groupMemberIds.length < 2) {
            return res.status(400).json({
                success: false,
                error: "A group must include at least 3 members (creator + 2 others)."
            });
        }

        const uniqueMembers = groupMemberIds.filter((id: string) => id !== creatorId);

        const group = await prisma.conversation.create({
            data: {
                isGroup: true,
                name,
                participants: {
                    create: [
                        { user: { connect: { id: creatorId } } },
                        ...uniqueMembers.map((id: string) => ({
                            user: { connect: { id } }
                        }))
                    ]
                }
            },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            data: group
        });

    } catch (error) {
        console.log("Group creation error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create group. Try again!"
        });
    }
};


export const getConversation = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    try {
        if (!conversationId) {
            return res.status(400).json({
                error: "No conversation Id"
            })
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                userName: true,
                                avatarUrl: true,
                                email: true,
                                lastSeen: true,
                                status: true
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json({
            success: true,
            conversation: conversation
        })
    } catch (error) {
        return res.status(400).json({
            error: "Server error"
        })
    }

}