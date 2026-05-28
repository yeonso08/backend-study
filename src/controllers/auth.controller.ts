import { Request, Response } from 'express';
import {loginService, signupService} from '../services/auth.service';

export const signupHandler = async (req: Request, res: Response) => {
    const { name, email, password, birth_date, gender } = req.body;

    try {
        const user = await signupService(name, email, password, birth_date, gender);
        res.status(201).json({
            message: 'signup success',
            data: user,
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({ message: 'email already exists' });
        }
        res.status(500).json({ message: 'internal server error' });
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    if (!user) {
        return res.json({
            message: 'invalid email or password',
        });
    }

    res.json({
        message: 'login success',
        data: user,
    });
}
