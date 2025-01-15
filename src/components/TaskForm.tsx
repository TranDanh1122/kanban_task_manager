import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import { v4 } from "uuid";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store";
import { Select } from "./TaskInfo";
import { toogleForm, updateOrCreateTask } from "../redux/TaskSlicer";
interface TaskForm {
    data: Task,
    error: Task
}
const TaskForm = React.memo(({ task }: { task?: Task }): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    const { boards, current } = useSelector((state: AppState) => state.task)
    const board = boards.find(board => current == board.name)
    const [data, setData] = React.useState<TaskForm>({ data: {}, error: {} } as TaskForm)
    const dispatch: AppDispatch = useDispatch()
    React.useEffect(() => {
        if (task) {
            const subtasks = task.subtasks.map(sub => {
                return { ...sub, name: `subtask[${v4()}]` }
            })
            setData({ data: { ...task, subtasks: subtasks }, error: {} as Task })
        }
    }, [])
    const addSubTask = (name: string) => {
        setData({ ...data, data: { ...data.data, subtasks: [...(data.data.subtasks ?? []), { title: "", isCompleted: false, name: name }] } })
    }
    const deleteSubtask = (value: string) => {
        setData({ ...data, data: { ...data.data, subtasks: data.data.subtasks.filter(sub => sub.name != value) } })
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const value = e.target.value
        if (name.includes("subtask")) {
            const newSubTaks = data.data.subtasks.map(sub => {
                if (sub.name == name) return { ...sub, title: value }
                return sub
            })
            setData({ ...data, data: { ...data.data, subtasks: newSubTaks } })
        } else {
            setData({ ...data, data: { ...data.data, [name]: value } })
        }
    }
    const handleSelectInput = (value: string) => {
        setData({ ...data, data: { ...data.data, status: value } })
    }
    const submit = () => {
        const error = { ...data.error }
        let valid = true
        if (!data.data) return
        Object.entries(data.data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                error[key] = value.map((item) => {
                    const hasError = !item.title
                    if (hasError) valid = false
                    return {
                        ...item,
                        title: hasError ? "This field is required" : ""
                    }
                });

            } else {
                const hasError = !value
                if (hasError) valid = false
                error[key] = hasError ? "This field is required" : "";
            }
        });
        setData({ ...data, error: error })

        if (valid) {
            dispatch(updateOrCreateTask(data.data))
        }
    }
    return (<>
        <div onClick={() => dispatch(toogleForm(false))} className="bg-black/20 fixed top-0 left-0 w-full h-full"></div>
        <form className={clsx(" w-1/3 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2  p-8", {
            "text-white bg-[var(--dark-gray)]": theme.mode == "dark",
            "text-[var(--black)] bg-white": theme.mode == "light"
        })}>
            <h2 className={clsx("l capitalize", {
                'text-black': theme.mode == "light",
                "text-white": theme.mode == "dark"
            })} >{task ? "Edit task" : "Add new task"}</h2>
            <Input onChange={handleInputChange} label="Title" value={data.data.title} error={data.error.title ?? ""} name="title" placeholder="e.g. Take coffee break" type="input" />
            <Input onChange={handleInputChange} label="Description" value={data.data.description} error={data.error.description ?? ""} name="description" placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." type="textarea" />
            <fieldset className="flex gap-2 items-start justify-start flex-col">
                <legend className="body-m text-[var(--medium-gray)] mb-2" >Subtasks</legend>
                {data.data.subtasks && data.data.subtasks.map(subtask => <Input onChange={handleInputChange} name={subtask.name ?? `subtask[${v4()}]`} value={subtask.title} error={(data.error?.subtasks?.length ?? 0) > 0 ? data.error?.subtasks?.find(sub => sub.name == subtask.name)?.title ?? "" : ""} placeholder="e.g. Make coffee" type="input" onDelete={deleteSubtask} />)}
                <Button clickEvent={() => addSubTask(`subtask[${v4()}]`)} text="+ Add New Subtask" width="100%" />
            </fieldset>
            {board && board.columns && <Select onSelect={handleSelectInput} picked={data.data.status ?? board.columns[board.columns.length - 1].name ?? ''} items={board.columns.map(col => col.name)} />}
            <Button clickEvent={submit} text={task ? "Save change" : "Create task"} width="100%" />

        </form>
    </>)
})
export default TaskForm
export function Input({ label, name, value, placeholder, type, onDelete, onChange, error }: { label?: string, name: string, value?: string, placeholder: string, type: string, onDelete?: (value: string) => void, onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => void, error: string }): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    return (<>
        <fieldset className="flex flex-col w-full gap-2">
            {label && <label className="body-m text-[var(--medium-gray)]" htmlFor={name}>{label}</label>}
            <div className="flex items-center justify-between gap-2 relative">
                {
                    type == "input" && <input onChange={(e) => onChange?.(e, name)} type="text" name={name} value={value} className={clsx("body-l w-full outline-none  py-2 px-4 rounded-md border-[1px] border-solid border-[var(--medium-gray)]/25", {
                        "text-black": theme.mode == "light",
                        "text-white bg-[var(--dark-gray)]": theme.mode == "dark"
                    })} placeholder={placeholder} />
                }
                {
                    type == "textarea" && <textarea onChange={(e) => onChange?.(e, name)} name={name} value={value} className={clsx("body-l w-full outline-none  py-2 px-4 rounded-md border-[1px] border-solid border-[var(--medium-gray)]/25", {
                        "text-black": theme.mode == "light",
                        "text-white bg-[var(--dark-gray)]": theme.mode == "dark"
                    })} placeholder={placeholder} ></textarea>
                }
                {
                    onDelete &&
                    <i onClick={() => onDelete(name ?? "")} className="w-4 h-4 bg-[var(--medium-gray)]" style={{ mask: 'url(./assets/icon-cross.svg) center / cover no-repeat', WebkitMask: 'url(./assets/icon-cross.svg) center / cover no-repeat' }}></i>
                }
                {
                    error &&
                    <span className="absolute w-fit h-fit right-6 top-[50%] translate-y-[-50%] text-[var(--red)]">{error}</span>
                }
            </div>

        </fieldset>
    </>)
}