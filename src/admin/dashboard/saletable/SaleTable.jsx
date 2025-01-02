import React, { useEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../../main'
import toast from 'react-hot-toast'

const SaleTable = () => {
    const [allsales, setAllSales] = useState([])
    const [sortInput, setSortInput] = useState('')
    const getSales = async () => {
        try {
            const res = await axios.get(`${server}/sale/get-sales`, { withCredentials: true })
            setAllSales(res.data.response)

        } catch (error) {
            toast.error("Something Went Wrong on fetching sales")
        }
    }

    const getSortedData = () => {
        const sortedSales = allsales.filter((e) => e.soldto === sortInput.toString() || e.group === sortInput)
        setAllSales(sortedSales)
        console.log(sortedSales)
    }

    useEffect(() => {
        getSales()
    }, [sortInput])
    return (
        <>
            <div className="search-sale">
                <input type="text" placeholder='Enter Email or group' onChange={(e) => setSortInput(e.target.value)} />
                <button className='search-butt' onClick={getSortedData}>Search</button>
            </div>
            <table className='table-sales'>
                <tr>
                    <th>Date</th>
                    <th>Belongs To</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Sold To</th>
                    <th>Price</th>
                </tr>
                {
                    allsales.length === 0 ? <h3>Sorry No sales Initiated</h3> :
                        allsales?.map((sale) => (
                            <tr>
                                <td>{sale.createdAt.toString().slice(0, 10)}</td>
                                <td>{sale.group}</td>
                                <td><img src={sale.prodimg} alt="" /></td>
                                <td>{sale.prodname}</td>
                                <td>{sale.soldto}</td>
                                <td>INR -{sale.price}/-</td>
                            </tr>
                        ))
                }


            </table>

        </>
    )
}

export default SaleTable
