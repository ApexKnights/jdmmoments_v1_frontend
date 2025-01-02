import React, { useContext, useState } from 'react'
import "./styles.scss"
import logo from "../../assets/jdmlogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { RiMenu4Line } from "react-icons/ri";
import Menu from './Menu'

const Header = () => {
    const { user, settings } = useContext(UserContext)
    const navigateTo = useNavigate();
    const [openham, setOpenHam] = useState(false)
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
        <div className='header' style={{ background: settings.color2 }}>
            {settings?.logo?.length === 0 ? <img src={logo} alt="" className='logo' /> : <img src={settings.logo} alt="" className='logo' />}
            <div className="head-contents">
                <Link className='link' to={"/"}>Home</Link>
                <Link className='link' to={"/about"}>About</Link>
                <Link className='link' to={"/contact"}>Contact</Link>
                <Link className='link' to={"/pvk"}>PVK</Link>
                <Link className='link' to={"/diamond"}>Diamond</Link>
                {user ? <Link className='link' to={`/products/${user?._id}`}>Your Products</Link> : null}
                {user ? <Link className='link link-prof' to={"/profile"}>profile</Link> : <Link className='link link-auth-login' to={"/login"}>Login</Link>}
                {
                    user ? <button onClick={handleLogout} className='link link-logout' >Logout</button> : <Link className='link link-auth-register' to={"/register"}>Sign Up</Link>
                }

            </div>
            <RiMenu4Line className='ham' onClick={() => setOpenHam(true)} />
            {openham ? <Menu setOpenHam={setOpenHam} /> : null}
        </div>
    )
}

export default Header
