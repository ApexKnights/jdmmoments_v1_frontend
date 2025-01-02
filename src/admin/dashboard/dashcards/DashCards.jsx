import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../../main'
import toast from 'react-hot-toast'
import { UserContext } from '../../../context/userContext'
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoDiamondSharp } from "react-icons/io5";
import { GiGemNecklace } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";


const DashCards = () => {
    const [sales, setSales] = useState([])
    const { pvk_categories, diamond_categories, customers } = useContext(UserContext)
    const getSales = async () => {
        try {
            const res = await axios.get(`${server}/sale/get-sales`, { withCredentials: true })
            setSales(res.data.response)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const pvk_product_total = pvk_categories.reduce((sum, item) => sum + (item.products?.length || 0), 0);
    const diamond_product_total = diamond_categories.reduce((sum, item) => sum + (item.products?.length || 0), 0);

    const profit_amounts = sales.map((e) => e.price)

    const sum_profit = profit_amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    useEffect(() => {
        getSales()
    }, [])
    return (
        <div className="first-section">
            <div className="box">
                <FaMoneyBillTrendUp className='marks' />
                <h2>Sales</h2>
                <span>{sales.length}</span>
            </div>
            <div className="box">
                <IoDiamondSharp className='marks' />
                <h2>Diamond Products</h2>
                <div className="cat-prod">
                    <span>Categories - {diamond_categories.length}</span>
                    <span>Products - {diamond_product_total}</span>
                </div>
            </div>
            <div className="box">
                <GiGemNecklace className='marks' />
                <h2>Polki Kundan & Victorian</h2>
                <div className="cat-prod">
                    <span>Categories -{pvk_categories.length}</span>
                    <span>Products - {pvk_product_total}</span>
                </div>
            </div>
            <div className="box">
                <GiTakeMyMoney className='marks' />
                <h2>Total Profits</h2>
                <span>INR -{sum_profit}/-</span>
            </div>
            <div className="box">
                <FaUsers className='marks' />
                <h2>Customers</h2>
                <span>{customers.length}</span>
            </div>
        </div>
    )
}

export default DashCards
