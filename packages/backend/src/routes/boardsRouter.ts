import express from "express";
import { Router } from "express-serve-static-core";
import { 
  getBoard as getBoardService,
  createBoard as createBoardService
} from "../services/boardsServices";

const router = express.Router();

router.get("/:id", getBoardById);
router.post("/", createBoard);
/* router.put ("/:id", updateBoard);
router.delete ("/:id", deleteBoard); */

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
    console.log('Creating board:', req.body);
    const newBoard = await createBoardService(board);
    res.status(201).json({ message: "Board created successfully!", board: newBoard });
  } catch (error) {
    next(error);
  }
}