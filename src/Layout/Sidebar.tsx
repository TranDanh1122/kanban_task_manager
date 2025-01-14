import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import MenuItem from "../components/MenuItem";
const Sidebar = React.memo((): React.JSX.Element => {
    const { theme, setTheme } = React.useContext(ThemeContext)
    const [value, setValue] = React.useState<number>(0)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTheme({ type: "CHANGE_THEME", payload: value == "0" ? "light" : "dark" })
        setValue(value as unknown as number)
    }
    const { boards } = useSelector((state: AppState) => state.task)

    return (<>
        <div onClick={() => setTheme({ type: "TOOGLE_MENU", payload: true })} className="absolute w-14 h-12 rounded-r-full bg-[var(--purple)] hover:bg-[var(--purple-hover)] flex items-center justify-center bottom-0 translate-y-[-2rem] left-0">
            <i className="w-4 h-3 block bg-white" style={{
                mask: "url(./assets/icon-show-sidebar.svg) center / cover no-repeat",
                WebkitMask: "url(./assets/icon-show-sidebar.svg) center / cover no-repeat",
            }}></i>
        </div>
        <div className={clsx(" w-1/5 max-w-1/5 h-full max-h-[100vh] shadow shadow-[var(--lines)] flex flex-col  transition-all ease-linear duration-500", {
            "translate-x-[-100%] absolute -z-10": !theme.menu,
            "translate-x-0 ": theme.menu,
            "bg-white": theme.mode == "light",
            "bg-[var(--dark-gray)]": theme.mode == "dark"
        })}>
            {theme.mode == "light" && <img src="./assets/logo-dark.svg" alt="logo" className='w-40 h-7 object-cover  my-8 ml-8' />}
            {theme.mode == "dark" && <img src="./assets/logo-light.svg" alt="logo" className='w-40 h-7 object-cover  my-8 ml-8' />}

            <h2 className='uppercase s text-[var(--medium-gray)] pl-8'>All Boards ({boards.length})</h2>
            <div className='flex flex-col justify-start items-start w-5/6 mt-5'>
                {boards.map((board: Board, index: number) => <MenuItem key={index} name={board.name} text={board.name} />)}
            </div>

            <div className={clsx('w-5/6 mx-auto py-4 px-16 flex items-center justify-center gap-4 mt-auto', {
                "bg-[var(--light-grey)]": theme.mode == "light",
                "bg-[var(--very-dark-grey)]": theme.mode == "dark"
            })}>
                <i className='w-5 h-5 block bg-[var(--medium-gray)]' style={{
                    mask: "url(./assets/icon-light-theme.svg) center / cover no-repeat",
                    WebkitMask: "url(./assets/icon-light-theme.svg) center / cover no-repeat"
                }}></i>
                <input id='toogle_theme' value={value} onChange={e => handleChange(e)} type="range" min="0" max="1" />
                <i className='w-5 h-5 block bg-[var(--medium-gray)]'
                    style={{
                        mask: "url(./assets/icon-dark-theme.svg) center / cover no-repeat",
                        WebkitMask: "url(./assets/icon-dark-theme.svg) center / cover no-repeat"
                    }}></i>
            </div>
            <div onClick={() => setTheme({ type: "TOOGLE_MENU", payload: false })} className='w-5/6 mt-2 flex justify-start cursor-pointer items-center gap-4 pl-8 py-6 text-[var(--medium-gray)]'>
                <i className='w-[1.125rem] h-4 block bg-[var(--medium-gray)]' style={{
                    mask: "url(./assets/icon-hide-sidebar.svg) center / cover no-repeat",
                    WebkitMask: "url(./assets/icon-hide-sidebar.svg) center / cover no-repeat",
                }}></i>
                Hide Sidebar
            </div>
        </div>
    </>)
})
export default Sidebar