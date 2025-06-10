import pool from '../lib/connection';
import TaskEntity from '../types/TaskEntity';

export {
    getTask,
    createTask,
    updateTask,
    deleteTask
};

async function getTask(taskId: string): Promise<TaskEntity | null> {
    let result;
    const query = 'SELECT * FROM tasks WHERE "taskid" = $1';
    const client = await pool.connect();
    try {
        result = await client.query(query, [taskId]);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    } finally {
        client.release();
    }
    return result.rows[0] || null;
}

async function createTask(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    const query = 'INSERT INTO tasks (boardid, name, description, icon, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [task.boardId, task.name, task.description, task.icon, task.status];
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    } finally {
        client.release();
    }
}

async function updateTask(taskId: string, updates: Partial<TaskEntity>): Promise<TaskEntity | null> {
    const query = `
        UPDATE tasks
        SET "name" = COALESCE($1, "name"), "description" = COALESCE($2, "description"), "icon" = COALESCE($3, "icon"), "status" = COALESCE($4, "status"), "updatedate" = CURRENT_TIMESTAMP
        WHERE "taskid" = $5
        RETURNING *
    `;
    const values = [
        updates.name,
        updates.description,
        updates.icon,
        updates.status,
        taskId
    ];
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows[0] || null;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    } finally {
        client.release();
    }
}

async function deleteTask(taskId: string): Promise<boolean> {
    const query = 'DELETE FROM tasks WHERE "taskid" = $1';
    const client = await pool.connect();
    try {
        const result = await client.query(query, [taskId]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    } finally {
        client.release();
    }
}
