import type { Request, Response } from "express";
import prisma from "../db/client.js";

export const setProfilePicture = async (req: Request, res: Response) => {
    const { userId, avatarUrl } = req.body;

    try {
        if (!userId || !avatarUrl) {
            return res.status(400).json({
                success: false,
                message: "Error. Try again later"
            })
        }

        const setProfile = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatarUrl
            }
        })
        // TODO: Cloudinary steps to complete
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: "Cannot upload photo. Try again!"
        })
    }
}

export const setAbout = async (req: Request, res: Response) => {
    const { userId, status } = req.body


    try {
        if (!userId || !status) {
            return res.status(400).json({
                success: false,
                message: "Not enough fileds are provided"
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status
            }
        })
        return res.status(200).json({
            success: true,
            data: updatedUser.status
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: true,
            message: "Cannot update status!"
        })
    }
}