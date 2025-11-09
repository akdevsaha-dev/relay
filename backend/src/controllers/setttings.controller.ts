import type { Request, Response } from "express";
import prisma from "../db/client.js";
import multer from "multer"
import cloudinary from "../lib/cloudinary.js";

const uplaod = multer({ dest: "uploads/" })
export const multerMiddleware = uplaod.single("avatar")
export const setProfilePicture = async (req: Request, res: Response) => {

    try {
        const { userId } = req.body;
        const file = req.file;
        if (!userId || !file) {
            return res.status(400).json({
                success: false,
                message: "Error. Try again later"
            })
        }
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "avatars",
            transformation: [{ width: 300, height: 300, crop: "fill" }],
        })
        const setProfile = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatarUrl: result.secure_url
            }
        })
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