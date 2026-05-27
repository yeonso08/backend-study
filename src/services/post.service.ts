import {pool} from "../db/pool";

export const getPostById = async (id: string) => {
    const result = await pool.query(
        `UPDATE posts SET view_count = view_count + 1 WHERE id = $1
         RETURNING id, title, content, view_count, user_id, created_at`, [id]
    );

    return result.rows[0];
}

export const createPost = async (userId: string, payload: any) => {
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