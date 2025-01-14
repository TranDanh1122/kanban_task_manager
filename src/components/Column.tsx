import React from "react";
import clsx from "clsx";
import Task from "./Task";
import { ThemeContext } from "../context/ThemeContext";
export default function Column({ type, column }: { type: string, column?: Column }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    // if (!column) return <>
    //     <div className={clsx("w-1/4 h-full py-6 flex items-center justify-center text-[var(--medium-gray)] xl", {
    //         "bg-[#E9EFFA]": theme.mode == "light",
    //         "bg-[var(--dark-gray)]": theme.mode == "dark",
    //     })}>
    //         + New Column
    //     </div>
    // </>

    return (<>
        <div className="w-1/4 h-full py-6" >
            <div className="flex gap-4 items-center h-max justify-start w-full mb-6" >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: column?.color }}></div>
                {column && <h2 className="s text-[var(--medium-gray)] uppercase"> {column.name}({column.tasks.length})</h2>}
            </div>

            <div className={clsx("flex flex-col w-full gap-5 h-full min-h-0", {
                "items-start gap-5": type != "new",
                "items-center justify-center": type == "new",
                "bg-[#E9EFFA]": theme.mode == "light" && type == "new",
                "bg-[var(--dark-gray)]": theme.mode == "dark" && type == "new",
            })}
                style={{ height: `calc(100% +  ${((column?.tasks.length ?? 1) - 1) * 100}px)` }}>
                {column &&
                    column.tasks.length >= 0 &&
                    <>
                        {column.tasks.map((task: Task, index: number) => <Task key={index} task={task} />)}
                    </>
                }
                {!column && <span className="cursor-pointer h-[100px] text-[var(--medium-gray)] xl">+ New Column</span>}
            </div>
        </div >
    </>)
}