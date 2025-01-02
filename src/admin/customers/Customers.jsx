import React, { useContext, useLayoutEffect, useState } from 'react'
import "./styles.scss"
import TableC from './customer-table/TableC'
import { UserContext } from '../../context/userContext'

const Customers = () => {
    const { customers } = useContext(UserContext)

    console.log(customers)

    const tablehead = [
        {
            id: 1,
            headers: "Registered On"
        },
        {
            id: 2,
            headers: "Customer Name"
        },
        {
            id: 3,
            headers: "Verification"
        },
        {
            id: 4,
            headers: "Email Address"
        },
        {
            id: 5,
            headers: "Mobile Number"
        },
        {
            id: 6,
            headers: "Products"
        },
        {
            id: 7,
            headers: "Action"
        }
    ]


    return (
        <div className='customers'>
            <TableC tablehead={tablehead} tabledata={customers} />
        </div>
    )
}

export default Customers
