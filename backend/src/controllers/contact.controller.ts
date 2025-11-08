
import type { Request, Response } from "express";
import z from "zod";
import prisma from "../db/client.js";


export const addContact = async (req: Request, res: Response) => {
    const schema = z.object({
        ownerId: z.string(),
        addedUserId: z.string()
    })
    const { ownerId, addedUserId } = schema.parse(req.body)
    if (!ownerId || !addedUserId) {
        return res.status(400).json({
            success: false,
            message: "No data provided."
        })
    }
    try {
        const existingContact = await prisma.contact.findFirst({
            where: {
                ownerId,
                addedUserId
            }
        })

        if (!existingContact) {
            const newContact = await prisma.contact.create({
                data: {
                    ownerId,
                    addedUserId,
                }
            })
            return res.status(200).json({
                success: true,
                data: newContact,
                message: "Contact added successfully!"
            })
        }
        return res.status(400).json({
            success: false,
            message: "Contact already exists."
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: "Failed to add the contact."
        })
    }
}

export const getAllContacts = async (req: Request, res: Response) => {
    const { ownerId } = req.params;
    try {
        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "OwnerId is required"
            })
        }
        const allContacts = await prisma.contact.findMany({
            where: {
                ownerId
            },
            include: {
                addedUser: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                        avatarUrl: true,
                        lastSeen: true,
                        status: true
                    }
                }
            },
            orderBy: {
                addedAt: "desc"
            }
        })
        return res.status(200).json({
            success: true,
            data: allContacts,
            count: allContacts.length
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: "Failed to get contacts."
        })
    }
}

export const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Contact id is required"
            });
        }
        const contact = await prisma.contact.findUnique({
            where: {
                id
            }
        })
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        const deletedContact = await prisma.contact.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
            data: deletedContact
        });

    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact"
        });
    }
}

export const updateContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nickName, isBlocked } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Contact id is required"
            });
        }
        const contact = await prisma.contact.findUnique({
            where: { id }
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        const updatedContact = await prisma.contact.update({
            where: {
                id
            },
            data: {
                ...(nickName !== undefined && { nickName }),
                ...(isBlocked !== undefined && { isBlocked })
            },
            include: {
                addedUser: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                        avatarUrl: true,
                        status: true,
                        lastSeen: true
                    }
                },
            }
        })

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact
        });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete contact"
        });
    }
}