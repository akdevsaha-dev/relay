import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { generateToken } from "../lib/auth/generateToken.js";
import z, { success } from "zod";
import prisma from "../db/client.js";

export const Signup = async (req: Request, res: Response) => {
    const schema = z.object({
        userName: z.string(),
        email: z.email(),
        password: z.string().min(6),
    });
    try {
        const { userName, email, password } = schema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists, please signin!",
            });
        }

        const user = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashedPassword,
            },
        });
        generateToken(user.id, res);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                status: "online",
            },
        });
        return res.status(200).json({
            id: user.id,
            userName: user.userName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            lastSeen: user.lastSeen
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error signing up!",
        });
    }
};


export const Signin = async (req: Request, res: Response) => {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(6)
    })
    const { email, password } = schema.parse(req.body)

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist, please signup!"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "Incorrect password"
            })
        }
        generateToken(user.id, res)
        await prisma.user.update({
            where: {
                email
            },
            data: {
                status: "online"
            }
        })
        return res.status(200).json({
            id: user.id,
            userName: user.userName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            lastSeen: user.lastSeen
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error signing in."
        })
    }
}

export const Logout = (req: Request, res: Response) => {
    res.cookie("jwt", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

export const checkAuth = (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}