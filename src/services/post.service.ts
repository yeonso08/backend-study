import {pool} from "../db/pool";

export const writeService = async (userId: string, payload: any) => {
    const { title, content } = payload;

    const result = await pool.query(
        `
        INSERT INTO posts (title, content, user_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, user_id, created_at
        `,
        [title, content, userId]
    );

    return result.rows[0];
}