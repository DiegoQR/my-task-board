import express from "express";
import boom from "@hapi/boom";
import { Router } from "express-serve-static-core";
import { 
  getBoard as getBoardService,
  createBoard as createBoardService,
  updateBoard as updateBoardService,
  deleteBoard as deleteBoardService
} from "../services/boardsServices";
import { boardIdSchema, createBoardSchema, updateBoardSchema } from "../utils/schemas/boardSchema";
import { default as validation } from "../utils/middlewares/validationMiddleware";

const router = express.Router();

router.get("/:boardId",validation({ params: boardIdSchema }), getBoardById);
router.post("/", validation({ body: createBoardSchema}), createBoard);
router.put ("/:boardId", validation({ params: boardIdSchema }), validation({ body: updateBoardSchema }), updateBoardById);
router.delete ("/:boardId", validation({ params: boardIdSchema }), deleteBoardById);

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/boards", router);

async function getBoardById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { boardId } = req.params;
    const board = await getBoardService(boardId);
    if(board){
      res.status(200).json(board);
    } else {
      const { output: {statusCode, payload}} = boom.notFound();
      payload.message = `Board with id ${boardId} not found`;
      res.status(statusCode).json(payload);
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
    const { boardId } = req.params;
    const boardUpdates = req.body;
    const updatedBoard = await updateBoardService(boardId, boardUpdates);
    res.status(200).json({ message: "Board updated successfully!", board: updatedBoard });
  } catch (error) {
    next(error);
  }
}

async function deleteBoardById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { boardId } = req.params;
    const deleted = await deleteBoardService(boardId);
    if (deleted) {
      res.status(200).json({ message: "Board deleted successfully!" });
    } else {
      const {output: {statusCode, payload}} = boom.notFound();
      payload.message = `Board with id ${boardId} not found`;
      res.status(statusCode).json(payload);
    }
  } catch (error) {
    next(error);
  }
}