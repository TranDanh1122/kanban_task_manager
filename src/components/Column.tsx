import React from "react";
import clsx from "clsx";
import Task from "./Task";
import { ThemeContext } from "../context/ThemeContext";
import { AppDispatch, AppState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toogleBoardForm } from "../redux/TaskSlicer";
export default function Column({ type, column }: { type: string, column?: Column }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const dispatch: AppDispatch = useDispatch()
    const { boards, current } = useSelector((state: AppState) => state.task)
    const board = boards.find(board => current == board.name)
    return (<>
        <div onClick={() => {
            if (type != "new") return
            dispatch(toogleBoardForm(board ?? true))
        }} className=" cursor-pointer w-1/4 tb:w-1/2 mb:w-3/4 min-w-1/4 tb:min-w-1/2 mb:min-w-3/4 h-full py-6 flex-shrink-0 " >
            <div className="flex gap-4 items-center h-max justify-start w-full mb-6" >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: column?.color }}></div>
                {column && <h2 className="s text-[var(--medium-gray)] uppercase"> {column.name}({column.tasks.length})</h2>}
            </div>

            <div className={clsx("flex flex-col w-full gap-5 h-full min-h-[85vh] ", {
                "items-start gap-5": type != "new",
                "items-center justify-center": type == "new",
                "bg-[#E9EFFA]": theme.mode == "light" && type == "new",
                "bg-[var(--dark-gray)]": theme.mode == "dark" && type == "new",
            })}>
                {column &&
                    column.tasks.length >= 0 &&
                    <>
                        {column.tasks.map((task: Task, index: number) => <Task key={index} task={task} />)}
                    </>
                }
                {!column && <div className="cursor-pointer text-[var(--medium-gray)] xl">+ New Column</div>}
            </div>
        </div >
    </>)
}