import express from 'express';
import {login, signup} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        user: req.user,
    });
});

export default router;