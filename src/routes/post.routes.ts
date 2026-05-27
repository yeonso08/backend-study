import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {write} from "../controllers/post.controller";
import {z} from "zod";
import {validate} from "../middlewares/validate";

const writeSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(5000),
})

const router = express.Router();

router.post('/write', authMiddleware, validate(writeSchema), write)

export default router;