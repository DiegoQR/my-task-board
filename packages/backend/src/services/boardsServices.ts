import {
   getBoard 
} from '../repositories/boardsRepository';
import BoardEntity from '../types/BoardEntity';

export { getBoard };

async function fetchBoard(boardId: string): Promise<BoardEntity | null> {
  try {
    const board = await getBoard(boardId);
    return board;
  } catch (error) {
    console.error('Error fetching board:', error);
    throw error;
  }
}
