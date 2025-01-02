import React, { useState } from 'react'
import "./styles.scss"
import logo from "../../../assets/jdmlogo.png"
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios"
import { server } from '../../../main';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';



const Sider = ({ setHam }) => {
    const [productshow, setProductShow] = useState(false)
    const handleLogout = async () => {
        try {
            await axios.get(`${server}/auth/logout`, { withCredentials: true })
            await Swal.fire({
                title: "Logging you out",
                icon: "success",
                timer: 1500

            })
            window.location.reload()
        } catch (error) {
            toast.error("Can't logout something went wrong")
        }
    }
    return (
        <>

            <div className='sider'>
                <RxCross2 className='cross' onClick={() => setHam(false)} />
                <img src={logo} alt="" />
                <div className="sider-links">
                    <Link className='link' to={"/"}>
                        <MdDashboard className='ico' />
                        <span>Dashboard</span>
                    </Link>
                    <Link className='link' to={"/addpvk"}>
                        <IoIosAddCircle className='ico' />
                        <span>Add PVK</span>
                    </Link>
                    <Link className='link' to={"/adddiamond"}>
                        <IoIosAddCircle className='ico' />
                        <span>Add Diamond</span>
                    </Link>
                    <div className='link product-butt' to={"/products"} onClick={() => setProductShow(!productshow)}>
                        <GrGallery className='ico' />
                        <span>Products</span>

                    </div>
                    {
                        productshow ? <div className="prods">
                            <Link className='link underlink' to="/diamondproducts">Diamond</Link>
                            <Link className='link underlink' to={"/pvkproducts"}>PVK</Link>
                        </div> : null
                    }

                    <Link className='link' to={"/customers"}>
                        <IoPeopleSharp className='ico' />
                        <span>Customers</span>
                    </Link>
                    <Link className='link' to={"/customer-review"}>
                        <IoPeopleSharp className='ico' />
                        <span>Reviews</span>
                    </Link>
                    <Link className='link' to={"/profile-admin"}>
                        <FaUserCog className='ico' />
                        <span>Profile</span>
                    </Link>

                </div>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        </>

    )
}

export default Sider
