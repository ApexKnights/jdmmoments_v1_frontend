import React, { useState } from 'react'
import "./styles.scss"
import logo from "../../assets/jdmlogo.png"
import { RiEyeCloseLine } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

const Login = () => {
    const navigateTo = useNavigate()
    const [passview, setPassView] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${server}/auth/login`, { email, password }, { withCredentials: true })
            await Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 1500,
            })
            navigateTo('/')
            window.location.reload();
            setLoading(false)
        } catch (error) {
            toast.error("Something went Wrong, Please check again")
            console.log(error)
        }
    }
    return (
        <div className='login'>
            <div className="left">
                <img src={logo} alt="" className='logo' />
                <h1 className='heading'>LOGIN <br />TO YOUR ACCOUNT</h1>
                <form className="form" onSubmit={loginHandler}>
                    <div className="input">
                        <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="passwordbox">
                        {
                            passview ? <RxEyeOpen className='eye' onClick={() => setPassView(false)} /> : <RiEyeCloseLine className='eye' onClick={() => setPassView(true)} />
                        }

                        <input type={passview ? "text" : `password`} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {
                        loading ? <h3 style={{ color: "#fff" }}>Signing in ....</h3> : <button>Login</button>
                    }

                    <span className='donthave'>Don't have an Account ? <Link className='link' to={"/register"}>Sign Up Here</Link></span>
                </form>
            </div>
            <div className="right">
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default Login
