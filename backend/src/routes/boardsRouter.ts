import express from "express";
import { Router } from "express-serve-static-core";

const router = express.Router();

router.get ("/:id", getBoardBtId);
/* router.post ("/", createBoard);
router.put ("/:id", updateBoard);
router.delete ("/:id", deleteBoard); */

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/boards", router);

async function getBoardBtId(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { id } = req.params;
  console.log(id);
  res.status(200).json({ message: "ok" });
}