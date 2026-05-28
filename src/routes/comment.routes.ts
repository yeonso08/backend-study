import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {getCommentsHandler, createCommentHandler} from "../controllers/comment.controller";
import {z} from "zod";
import {validate} from "../middlewares/validate";

const commentSchema = z.object({
    content: z.string().min(1).max(1000),
})

const router = express.Router({ mergeParams: true });

router.get('/', getCommentsHandler)
router.post('/', authMiddleware, validate(commentSchema), createCommentHandler)

export default router;
