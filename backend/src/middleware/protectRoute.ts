import jwt from "jsonwebtoken"
import type * as Express from "express"
import type { NextFunction } from "express";
import prisma from "../db/client.js";

interface JwtPayload {
    userId: string
}
export const protectRoute = async (
    req: Express.Request,
    res: Express.Response,
    next: NextFunction) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            console.log("no token")
        }
        if (!process.env.SUPER_TOKEN_SECRET) {
            console.log("cannot get token")
            return;
        }
        const decoded = await jwt.verify(token, process.env.SUPER_TOKEN_SECRET) as JwtPayload
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized - user not found!"
            })
        }
        req.user = {
            id: user.id,
            email: user.email,
            username: user.userName,
            avatarUrl: user.avatarUrl
        }
        next()
    } catch (error) {
        console.log("error in middleware", error)
        res.json(
            {
                message: "middleware error"
            }
        )
    }
}