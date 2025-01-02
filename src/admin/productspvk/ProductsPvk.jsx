import React, { useContext } from 'react'
import "./styles.scss"
import Table from '../../components/admin/table/Table'
import { UserContext } from '../../context/userContext'

const ProductsPvk = () => {
    const { pvk_categories } = useContext(UserContext)
    const tablehead = [
        {
            id: 1,
            headers: "Category Name"
        },
        {
            id: 2,
            headers: "Category feature image"
        },
        {
            id: 3,
            headers: "Price"
        },
        {
            id: 4,
            headers: "Date of Upload"
        },
        {
            id: 5,
            headers: "Total Products"
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
        <div className='pvk-prods'>
            <h1>Polki Kundan Victorian Products</h1>
            <Table tabledata={pvk_categories} tablehead={tablehead} jewelname={"pvk"} />
        </div>
    )
}

export default ProductsPvk
