import React, { useContext } from 'react'
import Home from './client/home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import Verify from './auth/verify/Verify'
import Success from './auth/success/Success'
import { Toaster } from "react-hot-toast"
import PVK from './client/pvk/PVK'
import { UserContext } from './context/userContext'
import Dashboard from './admin/dashboard/Dashboard'
import JdmAdmin from './admin/JdmAdmin'
import Profile from './client/profile/Profile'
import Diamond from './client/diamond/Diamond'
import CustomerProducts from './client/customer_products/CustomerProducts'
import About from './client/about/About'
import Contact from './client/contact/Contact'


const App = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {
        user?.type === "Admin" ? <JdmAdmin /> : <div className="client">
          <Routes>
            <Route path='/' element={<Home />} />
            {user ? <Route path='/login' element={<Home />} /> : <Route path='/login' element={<Login />} />}
            {
              user ? <Route path='/register' element={<Home />} /> : <Route path='/register' element={<Register />} />}
            <Route path='/verify/:id' element={<Verify />} />
            <Route path='/success/:id/verify/:token' element={<Success />} />
            <Route path='/pvk' element={<PVK />} />
            <Route path='/diamond' element={<Diamond />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/products/:id' element={<CustomerProducts />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<Home />} />
          </Routes>

          <Toaster />
        </div>

      }


    </>
  )
}

export default App
