import { Request, Response } from 'express';
import { signupService } from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await signupService(name, email, password);

    res.json({
        message: 'signup success',
        data: user,
    });
};