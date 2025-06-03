import express from "express";
import { Router } from "express-serve-static-core";
import { 
  getBoard as getBoardService,
  createBoard as createBoardService,
  updateBoard as updateBoardService,
  deleteBoard as deleteBoardService
} from "../services/boardsServices";

const router = express.Router();

router.get("/:id", getBoardById);
router.post("/", createBoard);
router.put ("/:id", updateBoardById);
router.delete ("/:id", deleteBoardById);

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/boards", router);

async function getBoardById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const board = await getBoardService(id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function createBoard(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const board = req.body;
    const newBoard = await createBoardService(board);
    res.status(201).json({ message: "Board created successfully!", board: newBoard });
  } catch (error) {
    next(error);
  }
}

async function updateBoardById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const boardUpdates = req.body;
    const updatedBoard = await updateBoardService(id, boardUpdates);
    if (updatedBoard) {
      res.status(200).json({ message: "Board updated successfully!", board: updatedBoard });
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteBoardById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const deleted = await deleteBoardService(id);
    if (deleted) {
      res.status(200).json({ message: "Board deleted successfully!" });
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    next(error);
  }
}