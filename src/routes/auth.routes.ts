import express from 'express';
import { z } from 'zod';
import {loginHandler, signupHandler} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validate} from "../middlewares/validate";

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    birth_date: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
});

const router = express.Router();

router.post('/signup', validate(signupSchema), signupHandler);
router.post('/login', loginHandler);
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        user: req.user,
    });
});

export default router;
