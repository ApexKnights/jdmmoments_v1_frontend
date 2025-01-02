import React, { useContext, useState } from 'react'
import "./styles.scss"
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { server } from '../../../main';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';

const PvkProductadd = ({ cat }) => {
    const [free, setFree] = useState(true);
    const [prodname, setProdName] = useState('')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const { pvk_categories } = useContext(UserContext)
    const selectedCategory = pvk_categories?.filter(e => e.catname === cat)[0]

    const submitProduct = async () => {
        try {
            setLoading(true)
            let prodimg = ""
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename

                try {
                    const imgupload = await axios.post(`${server}/upload`, data, { withCredentials: true })
                    console.log(imgupload.data.message.url)
                    prodimg = imgupload.data.message.url;
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.put(`${server}/pvk/add-product/${cat}`, { prodname, prodimg, free }, { withCredentials: true })
            await Swal.fire({
                title: "Successfull",
                text: res.data.response,
                timer: 1500,
                icon: "success",
            })
            setLoading(false)
            window.location.reload();

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
        <div className='product-add'>
            <img src={selectedCategory?.catimg} alt="" />
            <h2>Add Products in {cat}</h2>
            <div className="add-subs">
                <div className="add-image">
                    <label>PLease add product image :-</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <input type="text" placeholder='Name your product' onChange={(e) => setProdName(e.target.value)} />
                <select onChange={(e) => setFree(e.target.value)}>
                    <option value={true}>Free</option>
                    <option value={false}>Paid</option>
                </select>
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
                    /> : <button disabled={file === null ? true : false} onClick={submitProduct}>Add Product</button>
                }


            </div>
        </div>
    )
}

export default PvkProductadd
