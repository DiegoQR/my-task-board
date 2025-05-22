import pool from '../lib/connection';

export { getBoard };

async function getBoard(boardId: string) {
  const query = 'SELECT * FROM boards WHERE "boardId" = $1';
  const client = await pool.connect();
  try {
    const result = await client.query(query, [boardId]);
    return result.rows[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    client.release();
  }
}

