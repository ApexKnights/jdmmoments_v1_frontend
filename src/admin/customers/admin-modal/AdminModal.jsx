import React, { useContext, useState } from 'react'
import "./styles.scss"
import toast from 'react-hot-toast'
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../../main';
import { UserContext } from '../../../context/userContext';
import Swal from 'sweetalert2';


const AdminModal = ({ customerdetail, setadminModal }) => {
    const { user } = useContext(UserContext)
    const [verifycode, setVerifyCode] = useState('')

    const [verifysec, setVerifysec] = useState(false)
    console.log(customerdetail)
    const verifyadminPass = () => {
        if (verifycode === import.meta.env.VITE_ADMIN_PASS) {
            setVerifysec(true)
        } else {
            setVerifysec(false)
            toast.error("Sorry Wrong Credentials, try again")

        }
    }
    const makeMeAdmin = async () => {
        try {
            const res = await axios.put(`${server}/user/make-admin/${customerdetail._id}/${user._id}`, { withCredentials: true });
            await Swal.fire({
                title: res.data.response,
                timer: 2000,
                icon: "success"
            })
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <div className='admin-modal'>
            <RxCross1 className='cross' onClick={() => setadminModal(false)} />
            <h1>To Make Someone admin, please let us ensure its you, Enter the admin password</h1>
            <div className="verify-box">
                <input type="text" placeholder='Enter Admin Password' value={verifycode} onChange={(e) => setVerifyCode(e.target.value)} />
                <button onClick={verifyadminPass}>Verify</button>
            </div>
            {
                verifysec ? <div className="make-admin">
                    <h3>Make {customerdetail.username} admin ? </h3>
                    <button onClick={makeMeAdmin}>Make Admin</button>
                </div> : null
            }

        </div>
    )
}

export default AdminModal
