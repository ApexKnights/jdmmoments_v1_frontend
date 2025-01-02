import React, { useContext } from 'react'
import "./styles.scss"
import AppWrapper from '../../components/AppWrapper';
import logo from "../../assets/jdmlogo.png"
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { UserContext } from '../../context/userContext';


const Profile = () => {
    const { user, settings } = useContext(UserContext)
    return (
        <AppWrapper>
            <div className='profile'>
                <div className="profile-box" style={{ background: settings.color }}>
                    <img src={logo} alt="" />
                    <div className="customer-intro">
                        <span>JDM Customer</span>
                        <h1>{user?.username}</h1>
                    </div>
                    {
                        user?.verify === true ? <h3 className='v-customer'>
                            <MdVerified />
                            Verified Customer
                        </h3> : <h3 className='v-customer-red'>
                            <GoUnverified />
                            Customer not verified
                        </h3>
                    }


                    <h3>Phone Number :- {user?.mobile}</h3>
                    <h3>Email Address :- {user?.email}</h3>
                </div>
            </div>
        </AppWrapper>
    )
}

export default Profile
