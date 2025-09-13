import './App.css'

import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Aboutus from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import CourseList from './Pages/Course/CourseList';
import Signup from './Pages/SignUp'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
function App() {

  return ( 
  
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route  path='/login' element={<Login/>} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="contact" element={<Contact />} />
      <Route path="denied" element={<Denied />} />
      <Route path="/course/description" element={<CourseDescription />} />

      <Route  path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App