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
        id?: string,
        name: string,
        color?: string,
        tasks: Task[],
        [key: string]: any
    }
    interface Board {
        name: string,
        columns: Column[],
        [key: string]: any
    }
    interface Theme {
        mode: string,
        menu: boolean
    }
}
export { }