import React, { useContext, useState } from 'react'
import "./styles.scss"
import verify from "../../assets/verify.png"
import axios from 'axios'
import { server } from '../../main'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import logo from "../../assets/jdmlogo.png"

const Verify = () => {
    const paramsId = useParams().id;
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const { user } = useContext(UserContext)
    // ** Make a condition if id not match show different
    const sendLink = async () => {
        try {
            const res = await axios.post(`${server}/auth/verify/${paramsId}`, { withCredentials: true })
            toast.success(res.data.response)
            setShowSuccess(true)
            alert("Email Has Been Sent")
        } catch (error) {
            toast.error("Something went wrong")
            setShowError(true)
            console.log(error)
        }
    }
    return (
        <>
            {
                user?._id === paramsId ? <div className='verify'>
                    <img src={verify} alt="" />
                    <h1>Great, You are successfully registered, Verify your email</h1>
                    <span>Click on the button below and get verification link in your email, get verified so that we can understand its you</span>
                    <button onClick={sendLink}>Click here to send Verification Link</button>
                    {showSuccess ? <h3 className='sent-msg'>Email Has Been Sent To your registered email address please Verify</h3> : null}
                    {showError ? <h3 className='sent-msg-error'>We Cannot Sent Email Please Re-Check</h3> : null}
                </div> : <div className="not-match">
                    <img src={logo} alt="" />
                    <h2>Sorry Credentials doesnot match, or you are here by mistake</h2>
                    <Link to={"/"} className='bth'>Back TO Home ?</Link>
                </div>
            }

        </>
    )
}

export default Verify
