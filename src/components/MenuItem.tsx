import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { viewBoard } from "../redux/TaskSlicer";
const MenuItem = React.memo(({ text, name }: { text: string, name: string }): React.JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const { current } = useSelector((state: AppState) => state.task)
    const handleClick = () => {
        dispatch(viewBoard(name))
    }
    return (<>
        <div onClick={handleClick} className={clsx('py-4 pl-8 m rounded-r-full w-full flex items-center justify-start gap-4 cursor-pointer', {
            "text-[var(--medium-gray)]": current != name,
            "text-white bg-[var(--purple)]": current == name,
        })}>
            <i className={clsx('w-4 h-4 block', {
                "bg-[var(--medium-gray)]": current != name,
                "bg-white": current == name,
            })} style={{ mask: "url(./assets/icon-board.svg) center / cover no-repeat", WebkitMask: "url(./assets/icon-board.svg) center / cover no-repeat " }}></i>
            {text}
        </div>
    </>)
})
export default MenuItem