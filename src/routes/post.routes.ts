import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {getPost, createPostHandler, getPosts} from "../controllers/post.controller";
import {z} from "zod";
import {validate} from "../middlewares/validate";

const writeSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(5000),
})

const router = express.Router();

router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPost);
router.post('/', authMiddleware, validate(writeSchema), createPostHandler)

export default router;