import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import { v4 } from "uuid";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { Input } from "./TaskForm";
import { toogleBoardForm, updateOrCreateBoard } from "../redux/TaskSlicer";
import { Board } from "./Board";
interface BoardForm {
    data: Board,
    error: Board
}
const BoardForm = React.memo((): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    const { boards, current, boardForm } = useSelector((state: AppState) => state.task)
    let currentBoard = null
    if (boardForm != true) currentBoard = boards.find(board => current == board.name)
    const [data, setData] = React.useState<BoardForm>({ data: {}, error: {} } as BoardForm)
    const dispatch: AppDispatch = useDispatch()
    React.useEffect(() => {
        const columns = currentBoard?.columns.map(col => {
            return { ...col, id: `col[${v4()}]` }
        })
        setData({ data: { ...currentBoard, name: currentBoard?.name ?? "", columns: columns as Column[] }, error: {} as Board })
    }, [])
    const addColumn = (name: string) => {
        setData({ ...data, data: { ...data.data, columns: [...(data.data.columns ?? []), { name: "", color: "", tasks: [], id: name }] } })
    }
    const deleteCol = (value: string) => {
        setData({ ...data, data: { ...data.data, columns: data.data.columns.filter(col => col.id != value) } })
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const value = e.target.value
        if (id.includes("col")) {
            const newCols = data.data.columns.map(col => {
                if (col.id == id) return { ...col, name: value }
                return col
            })
            setData({ ...data, data: { ...data.data, columns: newCols } })
        } else {
            setData({ ...data, data: { ...data.data, [id]: value } })
        }
    }

    const submit = () => {
        const error = { ...data.error }
        let valid = true
        if (!data.data) return
        Object.entries(data.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                error[key] = value.map((item) => {
                    const hasError = !item.name
                    if (hasError) valid = false
                    return {
                        ...item,
                        name: hasError ? "This field is required" : ""
                    }
                });

            } else {
                if (key != "columns") {
                    const hasError = !value
                    if (hasError) valid = false
                    error[key] = hasError ? "This field is required" : "";
                }
            }
        });
        setData({ ...data, error: error })
        console.log(data);

        if (valid) {
            dispatch(updateOrCreateBoard(data.data))

        }
    }

    return (<>
        <div onClick={() => dispatch(toogleBoardForm(false))} className="bg-black/20 fixed top-0 left-0 w-full h-full"></div>
        <form className={clsx(" w-1/3 tb:w-1/2 mb:w-3/4 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2  p-8", {
            "text-white bg-[var(--dark-gray)]": theme.mode == "dark",
            "text-[var(--black)] bg-white": theme.mode == "light"
        })}>
            <h2 className={clsx("l capitalize", {
                'text-black': theme.mode == "light",
                "text-white": theme.mode == "dark"
            })} >{currentBoard ? "Edit board" : "Add new board"}</h2>
            <Input onChange={handleInputChange} label="name" value={data.data.name} error={data.error.name ?? ""} name="name" placeholder="e.g. Web Design" type="input" />
            <fieldset className="flex gap-2 items-start justify-start flex-col">
                <legend className="body-m text-[var(--medium-gray)] mb-2" >Columns</legend>
                {
                    data.data.columns && data.data.columns.map(col => {
                        const columnErrorTitle = Array.isArray(data.error.columns) ? (data.error.columns.find(colErr => colErr.id === col.id)?.name ?? "") : "";
                        return <Input onChange={handleInputChange} name={col.id ?? `col[${v4()}]`} value={col.name} error={columnErrorTitle} placeholder="Todo" type="input" onDelete={deleteCol} />
                    })
                }
                <Button clickEvent={() => addColumn(`col[${v4()}]`)} text="+ Add New Columns" width="100%" />
            </fieldset>
            <Button clickEvent={submit} text={currentBoard ? "Save change" : "Create board"} width="100%" />

        </form>
    </>)
})
export default BoardForm
