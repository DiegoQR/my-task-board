export default interface TaskEntity {
    taskId: string;
    boardId: string;
    name: string;
    description: string;
    icon: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO';
    createdAt?: Date;
    updatedAt?: Date;
}