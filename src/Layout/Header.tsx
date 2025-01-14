import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import Button from "../components/Button";
import { v4 } from "uuid";
const Header = React.memo((): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    return (<>
        <header className='flex justify-start gap-4 items-center h-[10vh] px-8  shadow-md'>
            <div className={clsx('border-solid border-r-[1px] border-[var(--lines)] pr-6 h-full flex items-center', {
                "hidden": theme.menu,
                "block": !theme.menu
            })}>
                {theme.mode == "light" && <img src="./assets/logo-dark.svg" alt="logo" className='w-40 h-7 object-cover' />}
                {theme.mode == "dark" && <img src="./assets/logo-light.svg" alt="logo" className='w-40 h-7 object-cover' />}
            </div>
            <h1 className='xl text-[var(--black)] mr-auto'>Platform Launch</h1>
            <Button key={v4()} text='+ Add New Task' />
            <i className='w-1 h-5 block bg-[--medium-gray]' style={{ mask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat", WebkitMask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat" }}></i>
        </header>
    </>)
})
export default Header