import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import About from './pages/About/About'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about/:characterId' element={<About />} />
      </Routes>
    </>
  )
}

export default App
