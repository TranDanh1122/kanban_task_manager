import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { toggleStatusSubtask, toogleForm, toogleViewTask, updateStatusTask } from "../redux/TaskSlicer";
const TaskInfo = React.memo(({ task }: { task: Task }): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    const { boards, current } = useSelector((state: AppState) => state.task)
    const dispatch: AppDispatch = useDispatch()
    const [action, togleAction] = React.useState<boolean>(false)
    const board = boards.find(board => current == board.name)
    const changeStatus = (value: string) => {
        dispatch(updateStatusTask({ task: task, status: value }))
    }
    const handleChangeSubtask = (value: string) => {
        dispatch(toggleStatusSubtask({ task: task, value: value }))
    }
    const ref = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (!action) return
                togleAction(!action)
            }
        }
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [action])
    return (
        <>
            <div onClick={() => dispatch(toogleViewTask(null))} className="bg-black/20 fixed top-0 left-0 w-full h-full"></div>
            <div className={clsx(" w-1/3 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-6  p-8", {
                "text-white bg-[var(--dark-gray)]": theme.mode == "dark",
                "text-[var(--black)] bg-white": theme.mode == "light"
            })}>
                <div className="flex items-center justify-between gap-6 relative ">
                    <h2 className="l" >{task.title}</h2>
                    <i ref={ref} onClick={() => togleAction(!action)} className="block w-2 cursor-pointer h-5 bg-[var(--medium-gray)]" style={{
                        mask: "url(./assets/icon-vertical-ellipsis.svg) center / contain no-repeat",
                        WebkitMask: "url(./assets/icon-vertical-ellipsis.svg) center / contain no-repeat"
                    }}></i>
                    <div className={clsx("flex flex-col absolute rounded-md shadow-md z-10 min-w-fit w-[25%] h-fit right-[-25%] top-[100%] p-4 body-l", {
                        " bg-[var(--dark-gray)]": theme.mode == "dark",
                        "bg-white": theme.mode == "light",
                        "hidden": !action,
                        "block": action
                    })}>
                        <button onClick={() => dispatch(toogleForm(task))} className="text-left text-[var(--medium-gray)]">Edit task</button>
                        <button  className="text-left text-[var(--red)]">Delete Task</button>
                    </div>
                </div>
                <p className=" body-l text-[var(--medium-gray)]">We know what we're planning to build for version one.
                    Now we need to finalise the first pricing model we'll use.
                    Keep iterating the subtasks until we have a coherent proposition.
                </p>
                <div className="flex flex-col gap-2">
                    {
                        task.subtasks.map(subtask => <Subtask key={v4()} text={subtask.title} onChange={handleChangeSubtask} isComplete={subtask.isCompleted} />)
                    }

                </div>
                {board && board.columns && <Select key={v4()} picked={task.status} onSelect={changeStatus} items={board.columns.map(col => col.name)} />}
            </div>
        </>
    )
})
export default TaskInfo
export function Select({ items, picked, onSelect }: { items: unknown[], picked: string, onSelect?: (value: string) => void }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const [show, isShow] = React.useState<boolean>(false)
    React.useEffect(() => {
        const handleOutsideClick = () => {
            if (!show) return
            isShow(!show)
        }
        document.addEventListener("click", handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [show])
    return (<>
        <div onClick={(e) => { e.stopPropagation(); isShow(!show) }} className={clsx("flex flex-col gap-4 cursor-pointer relative", {
            "bg-white text-black ": theme.mode == "light",
            "bg-[var( --dark-gray)] text-white": theme.mode == "dark",

        })}>
            <span className="body-m text-[var(--medium-gray)]">Current Status</span>
            <div className={clsx("w-full flex justify-between items-center px-3 py-2 border-solid border-[1px] rounded-md", {
                "border-[var(--medium-gray)]": theme.mode == "light",
                "border-white": theme.mode == "dark",
            })}>
                <span>{picked}</span>
                <i className={clsx("block w-2 h-1 bg-[var(--purple)]", {
                    "rotate-0": show,
                    "rotate-[-90deg]": !show
                })}
                    style={{
                        mask: "url(./assets/icon-chevron-down.svg) center / cover no-repeat",
                        WebkitMask: "url(./assets/icon-chevron-down.svg) center / cover no-repeat"
                    }}></i>
            </div>

            {
                items
                && <div className={clsx("absolute p-4 w-full h-fit flex flex-col top-[100%] shadow-md", {
                    "bg-white text-black ": theme.mode == "light",
                    "bg-[var( --dark-gray)] text-white": theme.mode == "dark",
                    "hidden": !show,
                    "block": show
                })}>
                    {items.map((column: unknown) => <span key={v4()} onClick={() => onSelect?.(column as unknown as string)} className="cursor-pointer py-3">{column as unknown as string}</span>)}
                </div>
            }

        </div >
    </>)
}
export function Subtask({ text, isComplete, onChange }: { text: string, isComplete: boolean, onChange?: (id: string) => void }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    return (<>
        <div className={clsx("p-3 ", {
            "bg-[var(--light-grey)]": theme.mode == "light",
            "bg-[var(--very-dark-grey)]": theme.mode == "dark"
        })}>
            <label className={clsx("flex items-center justify-start gap-4", {
                "text-[var(--black)]": theme.mode == "light",
                "text-white": theme.mode == "dark",
            })} htmlFor={text}>
                <input type="checkbox" name={text} checked={isComplete} onChange={() => onChange?.(text)} className="w-4 h-4" />
                {text}
            </label>
        </div>
    </>)
}