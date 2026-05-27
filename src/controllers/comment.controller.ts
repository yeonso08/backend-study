import {Request, Response} from 'express';
import {createComment} from "../services/comment.service";

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