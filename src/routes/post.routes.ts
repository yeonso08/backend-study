import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {
    getPostHandler,
    createPostHandler,
    getPostsHandler,
    updatePostHandler,
    deletePostHandler
} from "../controllers/post.controller";
import {z} from "zod";
import {validate} from "../middlewares/validate";

const writeSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(5000),
})

const updateSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).max(5000).optional(),
}).refine(data => data.title !== undefined || data.content !== undefined, {
    message: 'title or content is required',
})

const router = express.Router();

router.get('/', authMiddleware, getPostsHandler);
router.get('/:id', authMiddleware, getPostHandler);
router.post('/', authMiddleware, validate(writeSchema), createPostHandler)
router.patch('/:id', authMiddleware, validate(updateSchema), updatePostHandler)
router.delete('/:id', authMiddleware, deletePostHandler)

export default router;
