import { pool } from '../db/pool';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupService = async (
    name: string,
    email: string,
    password: string,
    birth_date?: string,
    gender?: string
) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `
      INSERT INTO users (name, email, password, birth_date, gender)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, birth_date, gender, created_at
    `,
        [name, email, hashedPassword, birth_date ?? null, gender ?? null]
    );

    return result.rows[0];
};

export const loginService = async (email: string, password: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};