import { TaskAPI } from "../api/TaskAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
export const fetchTasks = createAsyncThunk('task/fetchData', async () => {
    const response = await TaskAPI.fetchData()
    return response.data
})
interface CoreData {
    boards: Board[],
    current: string,
    viewTask: Task | null,
    loading: boolean,
    editTask: Task | null,
    createTask: boolean
}
const initData: CoreData = {
    boards: [],
    current: "",
    loading: false,
    editTask: null,
    createTask: false,
    viewTask: null
}
const taskSlicer = createSlice({
    "name": "task",
    initialState: initData,
    reducers: {
        viewBoard: (state: CoreData, action: PayloadAction<string>) => {
            state.current = action.payload
        },
        toogleViewTask: (state: CoreData, action: PayloadAction<Task | null>) => {
            state.viewTask = action.payload
            state.createTask = false
            state.editTask = null
        },
        updateStatusTask: (state: CoreData, action: PayloadAction<{ task: Task, status: string }>) => {
            const { boards, current } = state;
            const currentBoard = boards.find(board => board.name === current);
            if (!currentBoard) return;

            const { task, status } = action.payload;
            const currentColumn = currentBoard.columns.find(col => col.name === task.status);
            const destinationColumn = currentBoard.columns.find(col => col.name === status);
            if (!currentColumn || !destinationColumn) return;

            currentColumn.tasks = currentColumn.tasks.filter(ts => ts.title !== task.title);

            if (!destinationColumn.tasks.some(ts => ts.title === task.title)) {
                destinationColumn.tasks.push({ ...task, status });
            }
        },
        toggleStatusSubtask: (state: CoreData, action: PayloadAction<{ task: Task, value: string }>) => {
            const { boards, current } = state;
            const { task, value } = action.payload;
            const subTask = boards
                .find(board => board.name === current)
                ?.columns.find(col => col.name === task.status)
                ?.tasks.find(ts => ts.title === task.title)
                ?.subtasks.find(sub => sub.title === value);

            if (subTask && state.viewTask) {
                subTask.isCompleted = !subTask.isCompleted;
                state.viewTask.subtasks = task.subtasks.map(sub => {
                    if (value == sub.title) return subTask
                    return sub
                })
            }
        },
        editTask: (state: CoreData, action: PayloadAction<Task | null>) => {
            state.editTask = action.payload
            state.createTask = false
            state.viewTask = null
        },
        createTask: (state: CoreData) => {
            state.createTask = true
            state.editTask = null
            state.viewTask = null
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state: CoreData) => {
            state.loading = true
        })
            .addCase(fetchTasks.fulfilled, (state: CoreData, action: PayloadAction<{ boards: Board[] }>) => {
                state.boards = action.payload.boards
                state.current = action.payload.boards[0].name ?? ""
                state.loading = false
            })
    }
})

export const { viewBoard, toogleViewTask, updateStatusTask, toggleStatusSubtask, editTask, createTask } = taskSlicer.actions
export default taskSlicer.reducer
