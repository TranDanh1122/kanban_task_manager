declare global {
    interface Task {
        title: string;
        description: string;
        status: string;
        subtasks: {
            title: string;
            isCompleted: boolean;
        }[];
    }
    interface Column {
        name: string,
        tasks: Task[]
    }
    interface Board {
        name: string,
        columns: Column
    }
    interface Theme {
        mode: string,
        menu: boolean
    }
}
export { }