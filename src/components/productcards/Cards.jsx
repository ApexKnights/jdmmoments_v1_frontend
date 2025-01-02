import React, { useContext, useState } from 'react'
import "./styles.scss"
import testprod1 from "../../assets/testprod1.jpg"
import ImageModal from '../ImageModal/ImageModal'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import SingleProduct from '../single_product/SingleProduct'

const ProductCards = ({ prod, price, catname, group }) => {
    const [openimage, setOpenImage] = useState(false)
    const [singleprodbuy, setSingleProdBuy] = useState(false)
    const navigateTo = useNavigate();
    const { user, settings } = useContext(UserContext)
    return (
        <div className='cards'>
            {
                openimage ? <ImageModal img={prod.prodimg} setOpenImage={setOpenImage} /> : null
            }
            {
                singleprodbuy ? <SingleProduct catname={catname} prod={prod} price={price} setSingleProdBuy={setSingleProdBuy} group={group} /> : false
            }

            <div className="img-sec">
                <img src={prod.prodimg} alt="" className={prod.free === true ? "image" : "image-restrict"} />
            </div>
            <div className="content-sec" style={{ background: settings.color2 }}>
                <div className="titles">
                    <h3>{prod.prodname}</h3>
                    <span>INR {price} /-</span>
                </div>
                <div className="butts">
                    <button
                        disabled={prod.free === true || prod.buy === user?.email ? false : true}
                        onClick={() => setOpenImage(true)}
                    >
                        View Image
                    </button>
                    {
                        user ?
                            <button onClick={() => setSingleProdBuy(true)}>{prod.buy === user.email ? "Download" : "Buy"} Product</button> :
                            <button onClick={() => navigateTo("/login")}>Login To Buy</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductCards
