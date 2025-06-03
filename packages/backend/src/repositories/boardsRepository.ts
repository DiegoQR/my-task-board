import pool from '../lib/connection';
import BoardEntity from '../types/BoardEntity';

export { 
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
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

async function updateBoard(boardId: string, boardUpdates: Partial<BoardEntity>) {
  let result;
  const query = `
    UPDATE boards 
    SET "name" = COALESCE($1, "name"), "description" = COALESCE($2, "description"), "updatedate" = CURRENT_TIMESTAMP
    WHERE "boardId" = $3
    RETURNING *
  `;
  const client = await pool.connect();
  try {
    result = await client.query(query, [
      boardUpdates.name,
      boardUpdates.description,
      boardId,
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

async function deleteBoard(boardId: string) {
  let result;
  const query = 'DELETE FROM boards WHERE "boardId" = $1 RETURNING *';
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
  return (result?.rowCount ?? 0) > 0;
}