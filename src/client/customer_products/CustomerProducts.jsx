import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../components/AppWrapper'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { server } from '../../main'
import { FaFaceSadTear } from "react-icons/fa6";

const CustomerProducts = () => {
    const { settings, user } = useContext(UserContext)
    const [savedProds, setSavedProds] = useState([])
    const fetchsavedProducts = async () => {
        try {
            const res = await axios.get(`${server}/sale/products/${user?.email}`, { withCredentials: true })
            setSavedProds(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    const downloadImg = (url) => {
        saveAs(url, `${user?.username}-jdmdownloads.jpg`)
    }
    useEffect(() => {
        fetchsavedProducts()
    }, [savedProds])
    return (
        <AppWrapper>
            <div className='customer-products' style={{ background: settings.color }}>
                <h1>Your Products</h1>
                <div className="prod-bought">
                    {
                        savedProds.length === 0 ? <div className="no-prods">
                            <FaFaceSadTear className='no-prod-icon' />
                            <h2>Sorry You Havent Bought Any Products</h2>
                        </div> :
                            savedProds.map((s) => (
                                <div className="bought-card" style={{ background: settings.color2 }}>
                                    <div className="img-div">
                                        <img src={s.prodimg} alt="" />
                                    </div>
                                    <div className="content-div">
                                        <span>{s.group}</span>
                                        <h2>{s.prodname}</h2>
                                        <button onClick={() => downloadImg(s.prodimg)}>Download</button>
                                    </div>
                                </div>
                            ))
                    }

                </div>
            </div>
        </AppWrapper>
    )
}

export default CustomerProducts
