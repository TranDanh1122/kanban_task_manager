import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import Column from "./Column"
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { v4 } from "uuid";
import Button from "./Button";
export function Board(): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const { boards, current } = useSelector((state: AppState) => state.task)
    const board = boards.find(board => current == board.name)
    if (!board) return <>This board is error...</>
    return (
        <div className={clsx('h-full flex justify-center items-center pl-6  overflow-y-scroll overflow-x-scroll', {
            "bg-[var(--light-grey)]": theme.mode == "light",
            "bg-[var(--very-dark-grey)]": theme.mode == "dark"
        })}>
            {board.columns.length <= 0 &&
                <div className='flex w-1/2 flex-col gap-8'>
                    <span className='l text-[var(--medium-gray)] text-center'>This board is empty. Create a new column to get started.</span>
                    <div className='w-fit mx-auto'>
                        <Button key={v4()} text='+ Add New Column' />
                    </div>
                </div>
            }
            {board.columns.length > 0 &&
                < div className="flex justify-start min-h-max w-full gap-6 pt-[15vh] ">
                    {board.columns.map((column: Column, index: number) => <Column key={index} type="column" column={column} />)}
                    <Column key={v4()} type="new" />
                </div >
            }
        </div>
    )
}