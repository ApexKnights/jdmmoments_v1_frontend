import React, { useEffect, useState } from 'react'
import "./styles.scss"
import confirm from "../../assets/successverify.png"
import logo from "../../assets/jdmlogo.png"
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { server } from '../../main'

const Success = () => {
    const userId = useParams().id
    const userToken = useParams().token
    const [errormsg, setErrorMsg] = useState(false)
    const [confirmed, setConfirmed] = useState('')
    const getConfirm = async () => {
        try {
            const res = await axios.get(`${server}/auth/${userId}/email-confirm/${userToken}`, { withCredentials: true })
            setConfirmed(res.data.response)
        } catch (error) {
            console.log(error)

        }

    }
    useEffect(() => {
        getConfirm();

    }, [])
    return (
        <div className='success'>
            <img src={logo} alt="" className='logo' />
            <div className="success-box">
                <img src={confirm} alt="" className='success-img' />
                <span>{confirmed}</span>
                <h2>Your Email Has Been Successfully verified</h2>
                <Link to={"/"} className='button'>Navigate To Home</Link>
            </div>


        </div>
    )
}

export default Success
