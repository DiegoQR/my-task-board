import {
   getBoard as getBoardRepository,
   createBoard as createBoardRepository, 
} from '../repositories/boardsRepository';
import BoardEntity from '../types/BoardEntity';

export { 
  getBoard,
  createBoard
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
