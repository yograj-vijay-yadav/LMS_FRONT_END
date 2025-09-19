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
import CreateCourse from './Pages/Course/CreateCourse'
import RequireAuth from './Components/Auth/RequireAuth'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payments/Checkout'
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess'
import CheckoutFailure from './Pages/Payments/CheckoutFailure'
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
      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
      </Route>
       <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
              <Route path='/user/profile' element={<Profile />} />
              <Route path='/user/editprofile' element={<EditProfile />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/checkout/success' element={<CheckoutSuccess />} />
              <Route path='/checkout/fail' element={<CheckoutFailure />} />
       </Route>


      <Route  path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App