import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import Button from "./Button";
import { v4 } from "uuid";
export function Board(): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)

    return (
        <div className={clsx('h-full flex justify-center items-center', {
            "bg-[var(--light-grey)]": theme.mode == "light",
            "bg-[var(--very-dark-grey)]": theme.mode == "dark"
        })}>

            <div className='flex w-1/2 flex-col gap-8'>
                <span className='l text-[var(--medium-gray)] text-center'>This board is empty. Create a new column to get started.</span>
                <div className='w-fit mx-auto'>
                    <Button key={v4()} text='+ Add New Column' />
                </div>
            </div>

        </div>)
}