import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { toogleViewTask } from "../redux/TaskSlicer";
export default function Task({ task }: { task: Task }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const dispatch: AppDispatch = useDispatch()
    const { subTaskDone, subtasks } = React.useCallback((): { subTaskDone: number, subtasks: number } => {
        return { subTaskDone: task.subtasks?.filter(subtask => subtask.isCompleted).length ?? 0, subtasks: task.subtasks?.length ?? 0 }
    }, [task])()
    const handleViewTask = () => {
        dispatch(toogleViewTask(task))
    }
    return (
        <div onClick={handleViewTask} className={clsx("px-4 py-6 rounded-md shadow-md w-full h-full cursor-pointer", {
            "bg-white text-[var(--black)]": theme.mode == "light",
            "bg-[var(--dark-gray)] text-white": theme.mode == "dark"
        })}>
            <h3 className="m">{task.title}</h3>
            <span className="body-m text-[var(--medium-gray)]">{subTaskDone} of {subtasks} substasks</span>
        </div>
    )
}