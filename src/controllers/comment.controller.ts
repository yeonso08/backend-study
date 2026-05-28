import {Request, Response} from 'express';
import {createComment, findComments, updateComment, findCommentById, deleteComment} from "../services/comment.service";

export const getCommentsHandler = async (req: Request, res: Response) => {
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

export const createCommentHandler = async (req: Request, res: Response) => {
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

export const updateCommentHandler = async (req: Request, res: Response) => {
    const { commentId } = req.params as { commentId: string };
    const { content } = req.body;
    const userId = req.user!.userId;

    try {
        const comment = await updateComment(userId, commentId, content);

        if (!comment) {
            const exists = await findCommentById(commentId);
            if (!exists) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(403).json({ message: 'forbidden' });
        }

        return res.status(200).json({ data: comment });
    } catch (err: any) {
        console.error(err);
        if (err.code === '22P02') {
            return res.status(400).json({ message: 'invalid id' });
        }
        res.status(500).json({ message: 'internal server error' });
    }
}

export const deleteCommentHandler = async (req: Request, res: Response) => {
    const { commentId } = req.params as { commentId: string };
    const userId = req.user!.userId;

    try {
        const rowCount = await deleteComment(commentId, userId);
        if(!rowCount) {
            const exists = await findCommentById(commentId);
            if (!exists) {
                return res.status(404).json({ message: 'comment not found' });
            }
            return res.status(403).json({ message: 'forbidden' });
        }
        return res.status(204).send();
    } catch (err: any) {
        console.error(err);
        if (err.code === '22P02') {
            return res.status(400).json({ message: 'invalid id' });
        }
        res.status(500).json({ message: 'internal server error' });
    }
}