export interface Task {
    name: string,
    description: string,
    icon: string,
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'WONT_DO',
}