import {
   getBoard as getBoardRepository,
   createBoard as createBoardRepository,
   updateBoard as updateBoardRepository,
   deleteBoard as deleteBoardRepository 
} from '../repositories/boardsRepository';
import BoardEntity from '../types/BoardEntity';

export { 
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};

async function getBoard(boardId: string): Promise<BoardEntity | null> {
  try {
    const board = await getBoardRepository(boardId);
    return board;
  } catch (error) {
    console.error('Error fetching board:', error);
    throw error;
  }
}

async function createBoard(board: BoardEntity): Promise<BoardEntity> {
  try {
    const newBoard = await createBoardRepository(board);
    return newBoard;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
}

async function updateBoard(boardId: string, boardUpdates: Partial<BoardEntity>): Promise<BoardEntity | null> {
  try {
    const updatedBoard = await updateBoardRepository(boardId, boardUpdates);
    return updatedBoard;
  } catch (error) {
    console.error('Error updating board:', error);
    throw error;
  }
}

async function deleteBoard(boardId: string): Promise<boolean> {
  try {
    const deleted = await deleteBoardRepository(boardId);
    return deleted;
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
}
