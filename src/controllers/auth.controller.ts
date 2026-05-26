import { Request, Response } from 'express';
import {loginService, signupService} from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await signupService(name, email, password);

    res.json({
        message: 'signup success',
        data: user,
    });
};

export const login = async (req: Request, res: Response) => {
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