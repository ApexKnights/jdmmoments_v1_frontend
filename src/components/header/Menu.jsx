import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import Swal from 'sweetalert2'
import { IoCloseOutline } from "react-icons/io5";


const Menu = ({ setOpenHam }) => {
    const { user, settings } = useContext(UserContext)
    const navigateTo = useNavigate();
    const closeMenu = () => {
        setOpenHam(false)
    }
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${server}/auth/logout`, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 1500,
            })
            navigateTo('/login')
            window.location.reload();
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <div className="head-contents-menu" style={{ background: settings.color2 }}>
            <IoCloseOutline className='closeic' onClick={closeMenu} />
            <Link onClick={closeMenu} className='link' to={"/"}>Home</Link>
            <Link onClick={closeMenu} className='link' to={"/about"}>About</Link>
            <Link onClick={closeMenu} className='link' to={"/contact"}>Contact</Link>
            <Link onClick={closeMenu} className='link' to={"/pvk"}>PVK</Link>
            <Link onClick={closeMenu} className='link' to={"/diamond"}>Diamond</Link>
            {user ? <Link className='link' to={`/products/${user?._id}`}>Your Products</Link> : null}
            {user ? <Link onClick={closeMenu} className='link link-prof' to={"/profile"}>profile</Link> : <Link onClick={closeMenu} className='link link-auth-login' to={"/login"}>Login</Link>}
            {
                user ? <button onClick={handleLogout} className='link link-logout' >Logout</button> : <Link onClick={closeMenu} className='link link-auth-register' to={"/register"}>Sign Up</Link>
            }

        </div>
    )
}

export default Menu
