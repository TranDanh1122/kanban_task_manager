
import clsx from 'clsx'
import './App.css'
import React from 'react'
import { ThemeContext } from './context/ThemeContext'
import Sidebar from './Layout/Sidebar'
function App() {
  const { theme, setTheme } = React.useContext(ThemeContext)
  return (
    <div className='container mb:max-w-none w-full h-full overflow-x-hidden relative'>
      <Sidebar />

    </div>
  )
}

export default App
