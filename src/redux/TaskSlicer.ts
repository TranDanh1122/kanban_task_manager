import { TaskAPI } from "../api/taskAPI";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
export const fetchTasks = createAsyncThunk('task/fetchData', async () => {
    const response = await TaskAPI.fetchData()
    return response.data
})
interface CoreData {
    boards: Board[],
    current: string,
    loading: boolean
}
const initData: CoreData = {
    boards: [],
    current: "",
    loading: false

}
const taskSlicer = createSlice({
    "name": "task",
    initialState: initData,
    reducers: {
        viewBoard: (state: CoreData, action: PayloadAction<string>) => {
            state.current = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state: CoreData) => {
            state.loading = true
        })
            .addCase(fetchTasks.fulfilled, (state: CoreData, action: PayloadAction<{ boards: Board[] }>) => {
                state.boards = action.payload.boards
                state.loading = false
            })
    }
})

export const { viewBoard } = taskSlicer.actions
export default taskSlicer.reducer
