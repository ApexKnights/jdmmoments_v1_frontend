import React, { useContext } from 'react'
import "./styles.scss"
import testprod from "../../assets/testprod1.jpg"
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { server } from '../../main';
import { UserContext } from '../../context/userContext';
import Swal from 'sweetalert2';
import { saveAs } from "file-saver"


const SingleProduct = ({ prod, catname, price, setSingleProdBuy, group }) => {
    const { user } = useContext(UserContext)
    const initiatePayment = async () => {
        try {
            const res2 = await axios.post(`${server}/sale/initiate-sale`, {
                prodname: prod.prodname,
                prodimg: prod.prodimg,
                price: price,
                soldto: user.email,
                group: group,
            }, { withCredentials: true })
            const res = await axios.put(`${server}/sale/${group}/update-buy/${catname}`, {
                productId: prod.id,
                buy: user?.email,
            }, { withCredentials: true })
            await Swal.fire({
                title: "Success",
                text: "Products are saved in your product page",
                timer: 1500,
                icon: "success"
            })
            window.location.reload()
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "Something Went Wrong",
                timer: 1500,
                icon: "error"
            })
            console.log(error)
        }
    }
    const downLoadImage = (url) => {
        saveAs(url, `${prod.prodname}-jdmdownloads.jpg`) // Put your image URL here.
    }
    return (
        <div className='single-product' >
            <RxCross1 className='cross' onClick={() => setSingleProdBuy(false)} />
            <div className="product-view-sec">
                <div className="left">
                    <img src={prod.prodimg} alt="" style={prod.free === true || prod.buy === user?.email ? { filter: "none" } : { filter: "blur(5px)", pointerEvents: "none" }} />
                </div>
                <div className="right">
                    <span>{group === "pvk" ? "Polki Kundan & Victorian" : "Diamond"}</span>
                    <span>Category {catname}</span>
                    <h2>Design Name - {prod.prodname}</h2>
                    <span>Design Price - INR {price}/-</span>
                    <div className="butts">
                        {
                            prod.free === true || prod.buy === user?.email ? <button onClick={() => downLoadImage(prod.prodimg)}>Download Image</button> : <button onClick={initiatePayment}>Buy Image</button>
                        }

                    </div>
                </div>
            </div>

        </div>

    )
}

export default SingleProduct
