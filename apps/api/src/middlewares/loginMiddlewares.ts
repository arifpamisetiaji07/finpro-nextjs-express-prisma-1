import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../config/index";
import { User } from "../custom";
import { verify } from "jsonwebtoken";

import prisma from "../utils/prisma";

async function VerifyToken2(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) throw new Error("Unauthorized");

        // const user = verify(token, SECRET_KEY as string);

        const user = verify(token, process.env.SECRET_KEY as string);

        if (!user) throw new Error("Unauthorized");

        req.user = user as User;

        console.log(req.user)

        next();
    } catch (err) {
        next(err);
    }
}

async function AdminGuard(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user?.role !== "ORGANIZER") throw new Error("Not an ORGANIZER");

        next();
    } catch (err) {
        next(err);
    }
}

export { VerifyToken2, AdminGuard };