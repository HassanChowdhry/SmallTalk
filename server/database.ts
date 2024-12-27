import { Pool } from 'pg';

let pool: Pool;

// replace with env vars
export function getDb() {
  if (!pool) {
    pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'smalltalk',
      password: '',
      port: 5432,
    });
  }
  return pool;
}

export async function testConnection() {
  const db = getDb();
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Connection successful, server time:', result.rows[0]);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await db.end();
  }
}