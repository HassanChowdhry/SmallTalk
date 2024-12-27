import { getDb } from "../../database";

export async function getInboxByUserId(userId: number) {
  const db = getDb();
  const query = `
    SELECT conversation_id, name, updated_at from users
    INNER JOIN user_conversations ON users.id = user_conversations.user_id
    INNER JOIN conversations ON user_conversations.conversation_id = conversations.id
    WHERE users.id = $1
    ORDER BY conversations.updated_at DESC
  `;
  try {
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error getting inbox:', error);
    return [];
  }
}