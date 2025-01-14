import React from "react";
import clsx from "clsx";
import Task from "./Task";
export default function Column({ type, column }: { type: string, column: Column }): React.JSX.Element {
    return (<>
        <div className="w-1/4 h-full py-6">
            <div className="flex gap-4 items-center justify-start w-full mb-6">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: column.color }}></div>
                <h2 className="s text-[var(--medium-gray)] uppercase"> {column.name}({column.tasks.length})</h2>
            </div>

            <div className={clsx("flex flex-col w-full gap-5", {
                "items-start gap-5": type != "new",
                "items-center justify-center": type == "new"
            })}>
                {
                    column.tasks.length >= 0 &&
                    <>
                        {column.tasks.map((task: Task, index: number) => <Task key={index} task={task} />)}
                    </>
                }

            </div>
        </div>
    </>)
}