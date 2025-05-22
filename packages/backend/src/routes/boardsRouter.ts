import express from "express";
import { Router } from "express-serve-static-core";
import { getBoard } from "../repositories/boardsRepository";

const router = express.Router();

router.get ("/:id", getBoardBtId);
/* router.post ("/", createBoard);
router.put ("/:id", updateBoard);
router.delete ("/:id", deleteBoard); */

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/boards", router);

async function getBoardBtId(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const board = await getBoard(id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    next(error);
  }
}