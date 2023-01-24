import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "5a806959-8f18-4ed7-837f-0bbad2316e6b"
    }
})

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(
            "todo-lists")
            .then((res) => res.data)
    },
    createTodolists(title: string) {
        return instance.post<ResponceType<{ item: TodolistType }>>(
            "todo-lists",
            {title: title})
            .then((res) => res.data)
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponceType>(
            `todo-lists/${id}`)
            .then((res) => res.data)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponceType>(
            `todo-lists/${id}`,
            {title: title})
            .then((res) => res.data)
    },

    getTask(todolistId: string) {
        return instance.get<GetTasksResponse>(
            `todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponceType<{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks`,
            {title: title})
            .then((res) => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponceType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponceType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title})
            .then((res) => res.data)
    },
}


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponceType<T = {}> = {
    resultCode: number
    fieldErrors: string[]
    messages: string[]
    data: T
}
//example
// const test = (arg: any = {}) => {
//     return arg
// }
// const result = test(1)
// const result2 = test()
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
export type GetTasksResponse = {
    items: TaskType[],
    totalCount: string,
    error: string | null
}