import express from 'express';
import { Router } from "express-serve-static-core";
import { 
  getTask as getTaskService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService
} from "../services/tasksServices";

const router = express.Router();

router.get("/:id", getTaskById);
router.post("/", createTask);
router.put ("/:id", updateTaskById);
router.delete ("/:id", deleteTaskById);

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/tasks", router);

async function getTaskById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const task = await getTaskService(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
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
    const { id } = req.params;
    const taskUpdates = req.body;
    const updatedTask = await updateTaskService(id, taskUpdates);
    if (updatedTask) {
      res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteTaskById(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const { id } = req.params;
    const deleted = await deleteTaskService(id);
    if (deleted) {
      res.status(200).json({ message: "Task deleted successfully!" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
}
