declare global {
    interface Task {
        title: string,
        description: string,
        status: string,
        subtasks: {
            name?: string,
            title: string,
            isCompleted: boolean
        }[];
        [key: string]: any
    }
    interface Column {
        name: string,
        color: string,
        tasks: Task[]
    }
    interface Board {
        name: string,
        columns: Column[]
    }
    interface Theme {
        mode: string,
        menu: boolean
    }
}
export { }