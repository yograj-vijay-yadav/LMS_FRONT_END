import './App.css'

import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Aboutus from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/SignUp'
import Login from './Pages/Login'
function App() {

  return ( 
  
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route  path='/login' element={<Login/>} />
      <Route  path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App