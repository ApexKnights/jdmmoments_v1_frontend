import React, { useEffect } from 'react'
import "./styles.scss"
import prodtest from "../../../../assets/testprod1.jpg"
import { RxCross1 } from "react-icons/rx";
import axios from "axios"
import { server } from '../../../../main';
import Swal from 'sweetalert2';


const ProductView = ({ products, setProductModal, catname, jewelname }) => {
    console.log(catname)
    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${server}/${jewelname}/delete-product/${catname}?id=${id}`, { withCredentials: true });
            await Swal.fire({
                title: res.data.message,
                icon: "success",
                timer: 1000,
            })
            window.location.reload();

        } catch (error) {
            await Swal.fire({
                title: "Something Went Wrong, cant be deleted",
                icon: "error",
                timer: 1000,
            })
        }
        // const productIndex = products.findIndex((p) => p._id === e)
        // console.log(productIndex)

    }

    return (
        <div className='product-view'>
            <RxCross1 className='cross' onClick={() => setProductModal(false)} />
            {
                products.length === 0 ? <h1>Sorry No Products To Show </h1> :
                    products?.map((p) => (
                        <div className="prodcard">
                            <div className="img-sec">
                                <img src={p.prodimg} alt="" />
                            </div>
                            <div className="contents">
                                <h3>{p.prodname}</h3>
                                <span >Status : {p.free === true ? "Free" : "Paid"}</span>
                                <span>Bought by - {p.buy}</span>
                                <button onClick={() => deleteProduct(p.id)}>Delete Product ?</button>
                            </div>

                        </div>
                    ))
            }


        </div>
    )
}

export default ProductView
