import './App.css'

import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Aboutus from './Pages/AboutUs'
function App() {

  return (
  
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus/>} />
    </Routes>
  )
}

export default App