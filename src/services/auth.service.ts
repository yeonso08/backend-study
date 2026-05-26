import { pool } from '../db/pool';

export const signupService = async (
    name: string,
    email: string,
    password: string
) => {
    const result = await pool.query(
        `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `,
        [name, email, password]
    );

    return result.rows[0];
};