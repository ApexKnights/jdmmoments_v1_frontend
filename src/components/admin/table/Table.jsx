import React, { useEffect, useState } from 'react'
import "./styles.scss"
import { Link } from "react-router-dom"
import "./styles.scss"
import ProductView from './prodview/ProductView'
import axios from 'axios'
import { server } from '../../../main'
import Swal from 'sweetalert2'

const Table = ({ tablehead, tabledata, deleteButt, editButt, headfont, jewelname }) => {
    const [products, setProducts] = useState([])
    const [catname, setCatName] = useState('')
    const [productmodal, setProductModal] = useState(false)
    const [currentpage, setCurrentPage] = useState(1)
    const [categoryname, setCategoryName] = useState('')
    const [tablerecords, setTableRecords] = useState([...tabledata])
    const [entries, setEntries] = useState(5)
    const [entry, setEntry] = useState(0)
    const recordsPerPage = entries;
    const lastIndex = currentpage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = tabledata.slice(firstIndex, lastIndex)
    const npage = Math.ceil(tabledata.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [price, setPrice] = useState(0)





    const getData = () => {
        if (categoryname.length === 0) {
            setTableRecords([...tabledata])
        } else {
            const filterData = tablerecords.filter(f => f.catname.includes(categoryname))
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


    const openProducts = (p, cname) => {
        setProductModal(true)
        setProducts(p)
        setCatName(cname)

    }
    const deleteCategory = async (catname) => {
        try {
            const res = await axios.delete(`${server}/${jewelname}/delete-category/${catname}`, { withCredentials: true });
            await Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 1500,
            })
            window.location.reload();
        } catch (error) {
            Swal.fire({
                title: "something went wrong",
                icon: "error",
                timer: 1500
            })
            console.log(error)
        }
    }

    const updatePrice = async (catname) => {
        try {
            const res = await axios.put(`${server}/${jewelname}/update-price/${catname}`, { price }, { withCredentials: true });
            await Swal.fire({
                title: res.data.message,
                timer: 1500,
                icon: "success"
            }),
                window.location.reload();
        } catch (error) {
            Swal.fire({
                title: "something went wrong",
                icon: "error",
                timer: 1500
            })
            console.log(error)
        }
    }


    useEffect(() => {
        setTableRecords([...tabledata])
    }, [tabledata])

    return (
        <>
            <div className="up-table">
                <div className="search">
                    <input onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder='Search Clients' />
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
                            <td>{td.catname}</td>
                            <td>
                                <img src={td.catimg} alt="" />
                            </td>
                            <td>
                                INR {td.price} /-
                                <div className="edit-price" style={{ paddingTop: "5px" }}>
                                    <input type="number" placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} style={{ width: "50px" }} />
                                    <button onClick={() => updatePrice(td.catname)}>Edit</button>
                                </div>



                            </td>
                            <td>{td.createdAt.toString().slice(0, 10)}</td>
                            <td>
                                <button onClick={() => openProducts(td.products, td.catname)}>View Products</button>
                            </td>
                            <td>
                                {
                                    td.products.length
                                }
                            </td>
                            <td>
                                <button className='del' onClick={() => deleteCategory(td.catname)}>Delete</button>
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
            {productmodal ? <ProductView products={products} setProductModal={setProductModal} catname={catname} jewelname={jewelname} /> : null}
        </>
    )
}

export default Table
