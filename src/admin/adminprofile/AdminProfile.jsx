import React, { useContext, useState } from 'react'
import "./styles.scss"
import { MdAdminPanelSettings } from "react-icons/md";
import Settings from './settings/Settings';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { server } from '../../main';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';


const AdminProfile = () => {
    const { user } = useContext(UserContext)
    const [password, setPassword] = useState('')
    const updatePassword = async () => {
        try {
            const res = await axios.put(`${server}/user/userupdate-password/${user?._id}`, { password }, { withCredentials: true });
            await Swal.fire({
                title: "Your Password has been successfully updated",
                icon: "success",
                timer: 1500,
            })
        } catch (error) {
            toast.error("Something went Wrong")
            console.log(error)
        }
    }
    return (
        <div className='admin-profile'>
            <h1>JDM Moments Admin Profile</h1>
            <div className="userinstructions">
                <MdAdminPanelSettings className='mark' />
                <h3>Name - {user?.username}</h3>
                <h3>Email - {user?.email}</h3>
                <h3>Phone Number - {user?.mobile}</h3>
                <div className="update-password">
                    <input type="text" placeholder='Update Your Password' onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={updatePassword}>Update</button>
                </div>
            </div>
            <div className="settings">
                <h2>Website Theme Settings</h2>
                <Settings />
            </div>
        </div>
    )
}

export default AdminProfile
