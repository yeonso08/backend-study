import {pool} from "../db/pool";

export const findComments = async (postId: string, limit: number, offset: number) => {
    const result = await pool.query(
        `
        SELECT id, content, created_at, user_id FROM comments
        WHERE post_id = $1
        ORDER BY created_at ASC
        LIMIT $2 OFFSET $3
        `,
        [postId, limit, offset]
    )

    return result.rows;
}

export const createComment = async (userId: string, postId: string, content: string) => {
    const result = await pool.query(
        `
        INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)
        RETURNING id, user_id, post_id, content, created_at
        `,
        [userId, postId, content]
    )

    return result.rows[0];
}

export const findCommentById = async (id: string) => {
    const result = await pool.query(
        `SELECT id FROM comments WHERE id = $1`, [id]
    );

    return result.rows[0];
}

export const updateComment = async (userId: string, id: string, content: string) => {
    const result = await pool.query(
        `
        UPDATE comments SET content = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3
        RETURNING id, user_id, content, updated_at
        `,
        [content, id, userId]
    )

    return result.rows[0];
}

export const deleteComment = async (id: string, userId: string) => {
    const result = await pool.query(
        `DELETE FROM comments WHERE id = $1 AND user_id = $2`,
        [id, userId]
    )
    return result.rowCount;
}