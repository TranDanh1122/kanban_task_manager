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
    loading: boolean
}
const initData: CoreData = {
    boards: [],
    current: "",
    viewTask: null,
    loading: false

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
        },
        updateStatusTask: (state: CoreData, action: PayloadAction<{ task: Task, status: string }>) => {
            const currentBoardIndex = state.boards.findIndex(board => board.name == state.current)
            if (currentBoardIndex == -1) return
            const currentBoard = state.boards[currentBoardIndex]
            const currentColumnIndex = currentBoard.columns.findIndex(col => col.name == action.payload.task.status)
            if (currentColumnIndex == -1) return
            const currentColumn = currentBoard.columns[currentColumnIndex]
            const removedTaskColumn = currentColumn.tasks.filter(ts => action.payload.task.title != ts.title)
            const destinationColumnIndex = currentBoard.columns.findIndex(col => col.name == action.payload.status)
            if (destinationColumnIndex == -1) return
            currentColumn.tasks = removedTaskColumn
            currentBoard.columns[destinationColumnIndex].tasks.push({ ...action.payload.task, status: action.payload.status })
            console.log(1);
            
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

export const { viewBoard, toogleViewTask, updateStatusTask } = taskSlicer.actions
export default taskSlicer.reducer
