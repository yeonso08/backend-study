import {pool} from "../db/pool";

export const getPostsList = async (limit: number, offset: number) => {
    const result = await pool.query(
        `SELECT title, view_count, created_at, id FROM posts
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows;
}

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

export const findPostById = async (id: string) => {
    const result = await pool.query(
        `SELECT id FROM posts WHERE id = $1`, [id]
    );

    return result.rows[0];
}

export const updatePost = async (userId: string, payload: any, id: string) => {
    const { title, content } = payload;

    const result = await pool.query(
        `
        UPDATE posts
        SET title = COALESCE($1, title), content = COALESCE($2, content), updated_at = NOW()
        WHERE id = $3 AND user_id = $4
        RETURNING id, title, content, user_id, created_at, view_count, updated_at
        `,
        [title ?? null, content ?? null, id, userId]
    );

    return result.rows[0];
}

export const deletePost = async (id: string, userId: string) => {
    const result = await pool.query(
        `DELETE FROM posts WHERE id = $1 AND user_id = $2`,
        [id, userId]
    );

    return result.rowCount;
}