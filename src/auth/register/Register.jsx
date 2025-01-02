import React, { useContext, useState } from 'react'
import "./styles.scss"
import logo from "../../assets/jdmlogo.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { server } from '../../main'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/userContext'

const Register = () => {
    const navigateTo = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = {
            username,
            email,
            password,
            mobile
        }
        try {
            setLoading(true)
            const res = await axios.post(`${server}/auth/register`, registerData, { withCredentials: true });
            toast.success(res.data.message);
            await navigateTo(`/verify/${res.data.userId}`)
            window.location.reload()
            setLoading(false)
        } catch (error) {
            toast.error("Something Went Wrong");
            console.log(error)
        }
    }
    return (
        <div className='register'>
            <div className="left">

            </div>
            <div className="right">
                <img src={logo} alt="" className='logo' />
                <h2>Create Your Account</h2>
                <form className='form' onSubmit={handleRegister}>
                    <input type="text" placeholder='Enter Your Name' className='inputs' onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Create Password' className='inputs' onChange={(e) => setPassword(e.target.value)} />
                    <input type="number" placeholder='Enter Your Mobile Number' className='inputs' onChange={(e) => setMobile(e.target.value)} />
                    <input type="email" placeholder='Enter Your Email' className='inputs' onChange={(e) => setEmail(e.target.value)} />
                    {
                        loading ? <h4 style={{ color: "#fff" }}>Signing Up... </h4> : <button className='butt'>Register</button>
                    }

                </form>
                <span>Already have an account? <Link to={"/login"} className='log'>Login</Link></span>
            </div>
        </div>
    )
}

export default Register
