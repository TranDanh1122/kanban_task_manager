
import clsx from 'clsx'
import React from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../redux/store'
import { fetchTasks } from '../redux/TaskSlicer'
import Sidebar from '../Layout/Sidebar'
import Header from '../Layout/Header'
import { Board } from '../components/Board'
import TaskInfo from '../components/TaskInfo'
import { v4 } from 'uuid'
import TaskForm from '../components/TaskForm'
import Task from '../components/Task'
export default function Main() {
    const { theme } = React.useContext(ThemeContext)
    const dispatch: AppDispatch = useDispatch()
    const { loading, viewTask, taskForm } = useSelector((state: AppState) => state.task)
    React.useEffect(() => {
        dispatch(fetchTasks())
    }, [])
    if (loading) return <>Loading...</>

    return (
        <div className='container mb:max-w-none w-full h-full overflow-hidden relative flex '>
            <Sidebar />
            <div className={clsx(' flex flex-col transition-all ease-linear duration-500', {
                "w-full max-w-none": !theme.menu,
                "w-4/5 max-w-4/5": theme.menu,
            })}>
                <Header />
                <Board />
                {viewTask != null && <TaskInfo key={v4()} task={viewTask} />}
                {taskForm  && <TaskForm key={v4()} task={taskForm instanceof Task ? taskForm : undefined} />}
            </div>
        </div>
    )
}


