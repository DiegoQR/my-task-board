import express from 'express';
import boom from "@hapi/boom";
import { Router } from "express-serve-static-core";
import { 
  getTask as getTaskService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService
} from "../services/tasksServices";
import { taskIdSchema, createTaskSchema, updateTaskSchema } from '../utils/schemas/taskSchema';
import { default as validate} from "../utils/middlewares/validationMiddleware";

const router = express.Router();

router.get("/:taskId",validate({ params: taskIdSchema }), getTaskById);
router.post("/",validate({ body: createTaskSchema }), createTask);
router.put ("/:taskId",validate({ params: taskIdSchema}), validate({ body: updateTaskSchema}), updateTaskById);
router.delete ("/:taskId",validate({ params: taskIdSchema }), deleteTaskById);

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/tasks", router);

async function getTaskById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { taskId } = req.params;
    const task = await getTaskService(taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      const { output: {statusCode, payload}} = boom.notFound();
      payload.message = `Task with id ${taskId} not found`;
      res.status(statusCode).json(payload);
    }
  } catch (error) {
    next(error);
  }
}

async function createTask(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const task = req.body;
    const newTask = await createTaskService(task);
    res.status(201).json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    next(error);
  }
}

async function updateTaskById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { taskId } = req.params;
    const taskUpdates = req.body;
    const updatedTask = await updateTaskService(taskId, taskUpdates);
    if (updatedTask) {
      res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
    } else {
      const { output: {statusCode, payload}} = boom.notFound();
      payload.message = `Task with id ${taskId} not found`;
      res.status(statusCode).json(payload);
    }
  } catch (error) {
    next(error);
  }
}

async function deleteTaskById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { taskId } = req.params;
    const deleted = await deleteTaskService(taskId);
    if (deleted) {
      res.status(200).json({ message: "Task deleted successfully!" });
    } else {
      const { output: {statusCode, payload}} = boom.notFound();
      payload.message = `Task with id ${taskId} not found`;
      res.status(statusCode).json(payload);
    }
  } catch (error) {
    next(error);
  }
}
