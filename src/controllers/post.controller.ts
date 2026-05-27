import {Request, Response} from "express";
import {getPostById, createPost, getPostsList} from "../services/post.service";

export const getPosts = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;

    try {
        const posts = await getPostsList(limit, offset);
        res.status(200).json({ data: posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    try {
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(200).json({ data: post });
    } catch (err: any) {
        console.error(err);
        if (err.code === '22P02') {
            return res.status(400).json({ message: 'invalid id' });
        }
        res.status(500).json({ message: 'internal server error' });
    }
};

export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const post = await createPost(req.user!.userId, req.body);
        res.status(201).json({ message: 'post created', data: post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
};
