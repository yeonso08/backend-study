import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: 'no token' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'no token' });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        req.user = {
            userId: decoded.userId,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'invalid token' });
    }
};