import React, { useContext, useLayoutEffect, useState } from 'react'
import "./styles.scss"
import axios from "axios"
import { server } from '../../main'
import Swal from 'sweetalert2'
import { ThreeDots } from "react-loader-spinner"
import toast from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import DProductAdd from './diamondproduct/DProductAdd'

const AddDiamond = () => {

    const [productbox, setProductbox] = useState(false)
    const [catname, setCatName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectionName, setSelectionName] = useState('')
    const { diamond_categories } = useContext(UserContext)
    const categorySelection = () => {
        if (selectionName.length != 0) {
            setProductbox(true)
        } else {
            setProductbox(false)
            toast.error("Please Select a Category")
        }

    }

    const submitCategory = async () => {
        try {
            setLoading(true)
            let catimg = ""
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename

                try {
                    const imgupload = await axios.post(`${server}/upload`, data, { withCredentials: true })
                    console.log(imgupload.data.message.url)
                    catimg = imgupload.data.message.url;
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.post(`${server}/diamond/add-category`, { catname, catimg, price }, { withCredentials: true })
            await Swal.fire({
                title: "Successfull",
                text: res.data.response,
                timer: 1500,
                icon: "success",
            })
            setLoading(false)

        } catch (error) {
            Swal.fire({
                title: "Problem",
                text: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <div className='add-product'>
            <h1>Add Diamond Categories</h1>
            <div className="cat-sec">
                <div className='select-cats-d'>
                    <h2>Select Your registered categories</h2>
                    <select className='selection' onChange={(e) => setSelectionName(e.target.value)}>
                        <option value="">Select</option>
                        {
                            diamond_categories.length === 0 ?
                                <option value="">No categories found</option> :

                                diamond_categories.map((c) => (
                                    <option value={c.catname}>{c.catname}</option>
                                ))
                        }
                    </select>
                    <button onClick={categorySelection}>Enter</button>
                </div>
                <div className="add-category-d">
                    <h1>Add a new Category</h1>
                    <div className="file-input">
                        <label>Please Select A Feature Image - </label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder='Category Name'
                        onChange={(e) => setCatName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Category Price'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {
                        loading ? <ThreeDots
                            visible={true}
                            height="60"
                            width="60"
                            color="#e4a951"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : <button onClick={submitCategory}>Add Category</button>
                    }


                </div>
            </div>
            {
                productbox ? <DProductAdd cat={selectionName} /> : null
            }

        </div>
    )
}

export default AddDiamond
