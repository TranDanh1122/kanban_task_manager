import { configureStore } from "@reduxjs/toolkit"
import taskSlicer from "./TaskSlicer"
export const store = configureStore({
    reducer: {
        task: taskSlicer
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch