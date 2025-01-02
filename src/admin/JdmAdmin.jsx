import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Sider from '../components/admin/sider/Sider'
import AdminHeader from '../components/admin/admin_header/AdminHeader'
import AddPvk from './addpvk/AddPvk'
import { Toaster } from 'react-hot-toast'
import ProductsPvk from './productspvk/ProductsPvk'
import { RxHamburgerMenu } from "react-icons/rx";
import AddDiamond from './addDiamond/AddDiamond'
import ProductsDiamond from './productsdiamond/ProductsDiamond'
import Customers from './customers/Customers'
import AdminProfile from './adminprofile/AdminProfile'
import CustomerReview from './customerreview/CustomerReview'


const JdmAdmin = () => {
    const [ham, setHam] = useState(false)
    return (
        <div className='admin-template'>
            <RxHamburgerMenu className='ham' onClick={() => setHam(true)} />
            <div className={ham ? "sider-sec-menu" : "sider-sec"}>
                <Sider setHam={setHam} />
            </div>
            <div className="body-sec">
                <AdminHeader />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/addpvk' element={<AddPvk />} />
                    <Route path='/adddiamond' element={<AddDiamond />} />
                    <Route path='/pvkproducts' element={<ProductsPvk />} />
                    <Route path='/diamondproducts' element={<ProductsDiamond />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/profile-admin' element={<AdminProfile />} />
                    <Route path='/customer-review' element={<CustomerReview />} />
                    <Route path='*' element={"/"}></Route>
                </Routes>
            </div>
            <Toaster />
        </div >
    )
}

export default JdmAdmin
