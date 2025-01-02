import React, { useContext } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { FaUserCog } from "react-icons/fa";
import { UserContext } from '../../../context/userContext';


const AdminHeader = () => {
    const { user, customers } = useContext(UserContext)
    return (
        <div className='admin-header'>
            <div className="header-box">
                <div className="left">
                    <h3>Hi, {user?.username}</h3>
                    <span>Welcome to JDM Portal</span>
                </div>
                <div className="right">
                    <div className="users">
                        <span>Customers -</span>
                        <span>{customers.length}</span>
                    </div>
                    <div className="prods">
                        <Link className='prod' to={"/pvkproducts"}>View Products </Link>
                    </div>
                    <Link className="prof" to={"/profile-admin"}>
                        <FaUserCog className='user' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
