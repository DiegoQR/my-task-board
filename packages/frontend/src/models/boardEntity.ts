import type { Task } from "./TaskEntity";

export interface Board {
    name: string,
    description: string,
    tasks: Array<Task>
}
