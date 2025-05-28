import pool from '../lib/connection';
import BoardEntity from '../types/BoardEntity';

export { 
  getBoard,
  createBoard
};

async function getBoard(boardId: string) {
  let result;
  const query = 'SELECT * FROM boards WHERE "boardId" = $1';
  const client = await pool.connect();
  try {
    result = await client.query(query, [boardId]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    client.release();
  }
  return result.rows[0];
}

async function createBoard(board: BoardEntity) {
  let result;
  const query = 'INSERT INTO boards ("name", "description") VALUES ($1, $2) RETURNING *';
  const client = await pool.connect();
  try {
    result = await client.query(query, [
      board.name,
      board.description,
    ]);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  } finally {
    client.release();
  }
  return result.rows[0];
}
