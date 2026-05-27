import {Request, Response} from "express";
import {writeService} from "../services/post.service";

export const write = async (req: Request, res: Response) => {
    try {
        const post = await writeService(req.user!.userId, req.body);
        res.status(201).json({ message: 'post created', data: post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
};