import {
    getTask as getTaskRepository,
    createTask as createTaskRepository,
    updateTask as updateTaskRepository,
    deleteTask as deleteTaskRepository
} from '../repositories/tasksRepository';
import TaskEntity from '../types/TaskEntity';

export {
    getTask,
    createTask,
    updateTask,
    deleteTask
};

async function getTask(taskId: string): Promise<TaskEntity | null> {
    try {
        const task = await getTaskRepository(taskId);
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
}

async function createTask(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    try {
        const newTask = await createTaskRepository(task);
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function updateTask(taskId: string, updates: Partial<TaskEntity>): Promise<TaskEntity | null> {
    try {
        const updatedTask = await updateTaskRepository(taskId, updates);
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

async function deleteTask(taskId: string): Promise<boolean> {
    try {
        const deleted = await deleteTaskRepository(taskId);
        return deleted;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}
