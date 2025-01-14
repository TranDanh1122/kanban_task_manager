
import { Routes, Route } from 'react-router'
import './App.css'
import Main from './pages/main'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' index element={<Main />}></Route>
      </Routes>
    </>

  )

}

export default App
