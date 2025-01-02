import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../components/AppWrapper'
import ProductCards from '../../components/productcards/Cards';
import { pvk } from '../../data/data';
import Filter from '../../components/filter/Filter';
import { FaFilter } from "react-icons/fa6";
import SingleProduct from '../../components/single_product/SingleProduct';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';


const PVK = () => {
    const { pvk_categories, user, settings } = useContext(UserContext)
    const [productsfetch, setProductsFetch] = useState([...pvk_categories])
    const [dropdown, setDropDown] = useState(false)
    const filterByPrice = (pr) => {
        const pricefilter = pvk_categories.filter(p => p.price === pr);
        setProductsFetch(pricefilter)
        setDropDown(false)
    }
    const filterByProd = (product) => {
        const prodfilter = pvk_categories.filter(p => p.catname === product);
        setProductsFetch(prodfilter)
        setDropDown(false)
    }
    useEffect(() => {
        setProductsFetch([...pvk_categories])
    }, [pvk_categories])
    return (
        <AppWrapper>
            <div className='pvk' style={{ background: settings.color }}>
                <h2 className='head'>Browse Polki Kundan & Victorian Products</h2>
                <div className="filter">
                    <FaFilter className='filter-icon' onClick={() => setDropDown(!dropdown)} />
                    <p>Filter Products</p>
                    {
                        dropdown ? <Filter
                            filterByPrice={filterByPrice}
                            filterByProd={filterByProd}
                            prod={pvk_categories} /> : null
                    }
                </div>
                {
                    productsfetch.length === 0 ? <h3 style={{ textAlign: "center", color: "#fff" }}>No Products Uploaded, or removed by admin <Link>Contact Now</Link></h3> :
                        productsfetch.map((prod) => (
                            <div className="cats">
                                <div className="categories-head" style={{ background: settings.color2 }}>
                                    <h2>{prod.catname} Collections</h2>
                                </div>
                                <div className="product-cards">
                                    {
                                        prod?.products?.filter(p => p.buy === "none" || p.buy === user?.email).length === 0 ? <h2 style={{ textAlign: "center", color: "#fff" }}>Sorry Products are sold or not updated</h2> :
                                            prod?.products?.filter(p => p.buy === "none" || p.buy === user?.email).map((p) => (
                                                <ProductCards prod={p} price={prod.price} catname={prod.catname} key={p.id} group={"pvk"} />
                                            ))
                                    }
                                </div>
                            </div>
                        ))
                }

            </div>
        </AppWrapper>
    )
}

export default PVK
