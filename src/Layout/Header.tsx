import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import Button from "../components/Button";
import { v4 } from "uuid";
import { toogleForm } from "../redux/TaskSlicer";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
const Header = React.memo((): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    const dispatch: AppDispatch = useDispatch()
    return (<>
        <header className={clsx('flex justify-start gap-4 items-center h-[10vh] px-8  shadow-md', {
            "bg-white": theme.mode == "light",
            "bg-[var(--dark-gray)] text-white": theme.mode == "dark"
        })}>
            <div className={clsx('border-solid border-r-[1px] border-[var(--lines)] pr-6 h-full flex items-center', {
                "hidden": theme.menu,
                "block": !theme.menu
            })}>
                {theme.mode == "light" && <img src="./assets/logo-dark.svg" alt="logo" className='w-40 h-7 object-cover' />}
                {theme.mode == "dark" && <img src="./assets/logo-light.svg" alt="logo" className='w-40 h-7 object-cover' />}
            </div>
            <h1 className='xl text-[var(--black)] mr-auto'>Platform Launch</h1>
            <Button clickEvent={() => dispatch(toogleForm(true))} key={v4()} text='+ Add New Task' />
            <i className='w-1 h-5 block bg-[--medium-gray]' style={{ mask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat", WebkitMask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat" }}></i>
        </header>
    </>)
})
export default Header