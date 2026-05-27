import {pool} from "../db/pool";

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