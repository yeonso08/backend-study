import {Request, Response} from 'express';
import {createComment, findComments} from "../services/comment.service";

export const getComments = async (req: Request, res: Response) => {
    const { postId } = req.params as { postId: string };
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    try {
        const comments = await findComments(postId, limit, offset);
        return res.status(200).json({ data: comments });
    } catch (err: any) {
        console.error(err);
        if (err.code === '22P02') {
            return res.status(400).json({ message: 'invalid id' });
        }
        res.status(500).json({ message: 'internal server error' });
    }
}

export const postComment = async (req: Request, res: Response) => {
    const { postId } = req.params as { postId: string };
    const { content } = req.body;

    try {
        const comment = await createComment(req.user!.userId, postId, content)
        return res.status(201).json({ data: comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}