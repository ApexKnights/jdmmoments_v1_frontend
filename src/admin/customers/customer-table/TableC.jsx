import React, { useEffect, useState } from 'react'
import "./styles.scss"
import AdminModal from '../admin-modal/AdminModal'
import axios from 'axios'
import { server } from '../../../main'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const TableC = ({ tablehead, tabledata, headfont }) => {
    const [currentpage, setCurrentPage] = useState(1)
    const [username, setUserName] = useState('')
    const [tablerecords, setTableRecords] = useState([...tabledata])
    const [entries, setEntries] = useState(5)
    const [entry, setEntry] = useState(0)
    const recordsPerPage = entries;
    const lastIndex = currentpage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = tabledata.slice(firstIndex, lastIndex)
    const npage = Math.ceil(tabledata.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [adminmodal, setadminModal] = useState(false)
    const [customerdetail, setCustomerDetail] = useState({})

    const getData = () => {
        if (username.length === 0) {
            setTableRecords([...tabledata])
        } else {
            const filterData = tablerecords.filter(f => f.username.includes(username))
            setTableRecords([...filterData])
        }

    }

    const prevPage = () => {
        if (currentpage !== firstIndex) {
            setCurrentPage(currentpage - 1)
        }

    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentpage !== lastIndex) {
            setCurrentPage(currentpage + 1)
        }
    }
    const handleEntries = () => {
        if (entry <= 0) {
            setEntries(5)
        } else {
            setEntries(entry)
        }
    }

    const deleteCustomer = async (id) => {
        try {
            const res = await axios.delete(`${server}/user/userdelete/${id}`, { withCredentials: true });
            await Swal.fire({
                title: res.data.response,
                icon: "success",
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }



    const openAdmin = (e) => {
        setCustomerDetail(e)
        setadminModal(true)
    }



    useEffect(() => {
        setTableRecords([...tabledata])
    }, [tabledata])
    return (
        <>


            <div className="up-table">
                <div className="search">
                    <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Search Clients' />
                    <button onClick={getData}>Search</button>
                </div>
                <div className="entries">
                    <input type="number" placeholder='Entries - 5' onChange={(e) => setEntry(e.target.value)} />
                    <button onClick={handleEntries}>Enter</button>
                </div>
            </div>
            <table className='table'>
                <tr>
                    {
                        tablehead.map((th) => (
                            <th style={{ fontSize: headfont }} key={th.id}>{th.headers}</th>
                        ))
                    }

                </tr>
                {
                    tablerecords?.map((td) => (
                        <tr key={td._id} >
                            <td>{td.createdAt.toString().slice(0, 10)}</td>
                            <td>
                                {td.username}
                                {
                                    td.type === "Admin" ? <span className='admin-tag'
                                    >Admin</span> : null
                                }
                            </td>
                            <td className={td.verify === true ? "verified-customer" : "not-verified"}>{td.verify === true ? "Verified" : "Not Verified"}</td>
                            <td>{td.email}</td>
                            <td>{td.mobile}</td>
                            <td className='prods'>
                                {
                                    td.products.length === 0 ? <span>No Products</span> :
                                        td.products?.map((p) => (
                                            <div className="prod-details">
                                                <img src={p.prodimg} alt="" />
                                                <span>{p.prodname}</span>
                                            </div>
                                        ))
                                }
                            </td>
                            <td>
                                <button className='del' onClick={() => deleteCustomer(td._id)}>Delete</button>
                                <button className='make-admin' onClick={() => openAdmin(td)}>Make Admin ?</button>
                            </td>
                        </tr>
                    )).slice(firstIndex, lastIndex)
                }




            </table>

            <div className="pagination">
                <div className="prev">
                    <span onClick={prevPage}>Previous</span>
                </div>
                {
                    numbers.map((n, i) => (
                        <span key={i} className={`page-item ${currentpage === n ? 'active' : ''}`} onClick={() => changeCPage(n)}>
                            {n}
                        </span>
                    ))
                }
                <div className="next">
                    <span onClick={nextPage}>Next</span>
                </div>
            </div>
            {
                adminmodal ? <AdminModal customerdetail={customerdetail} setadminModal={setadminModal} /> : null
            }

        </>
    )
}

export default TableC
