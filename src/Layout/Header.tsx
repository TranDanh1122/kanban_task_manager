import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
import Button from "../components/Button";
import { v4 } from "uuid";
import { deleteBoard, toogleBoardForm, toogleForm } from "../redux/TaskSlicer";
import { AppDispatch, AppState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NotiContext } from "../context/NotificationContext";
const Header = React.memo((): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    const { boards, current } = useSelector((state: AppState) => state.task)
    const board = boards.find(board => current == board.name)
    const dispatch: AppDispatch = useDispatch()
    const [action, setAction] = React.useState<boolean>(false)
    const { pushNoti } = React.useContext(NotiContext)
    const ref = React.useRef<HTMLElement>(null)
    const handleDeleteBoard = () => {
        pushNoti({
            type: "SHOW", payload: {
                title: "Delete this Board?",
                content: `Are you sure you want to delete the ‘${board?.name} board? This action will remove all columns and tasks and cannot be reversed.`,
                type: "warning",
                isShow: true,
                handleYes: () => {
                    dispatch(deleteBoard(board ?? {} as Board));
                    pushNoti({ type: "HIDDEN" })
                },
                handleNo: () => {
                    pushNoti({ type: "HIDDEN" })
                }
            }
        })
    }
        React.useEffect(() => {
            const handleOutsideClick = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    if (!action) return
                    setAction(!action)
                }
            }
            document.addEventListener('click', handleOutsideClick)
            return () => document.removeEventListener('click', handleOutsideClick)
        }, [action])
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
            <div className="relative w-fit h-fit">
                <i ref={ref} onClick={() => setAction(!action)} className='w-1 h-5 block bg-[--medium-gray]' style={{ mask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat", WebkitMask: "url(./assets/icon-vertical-ellipsis.svg) center / cover no-repeat" }}></i>

                <div className={clsx("flex flex-col absolute rounded-md shadow-md z-10 min-w-max w-full h-fit right-[-25%] top-[100%] p-4 body-l", {
                    " bg-[var(--dark-gray)]": theme.mode == "dark",
                    "bg-white": theme.mode == "light",
                    "hidden": !action,
                    "block": action
                })}>
                    <button onClick={() => dispatch(toogleBoardForm(board ?? true))} className="text-left text-[var(--medium-gray)]">Edit board</button>
                    <button onClick={() => handleDeleteBoard()} className="text-left text-[var(--red)]">Delete board</button>
                </div>
            </div>
        </header>
    </>)
})
export default Header