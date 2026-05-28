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
        RETURNING user_id, post_id, content, created_at
        `,
        [userId, postId, content]
    )

    return result.rows[0];
}