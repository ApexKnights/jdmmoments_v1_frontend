import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import AppWrapper from '../../components/AppWrapper'
import { Link } from 'react-router-dom'
import jdmhomeimg from "../../assets/jdmhomeimg.png"
import testprod2 from "../../assets/testprod2.jpg"
import FeatureCards from '../../components/featurecards/FeatureCards'
import { pvk } from '../../data/data'
import { UserContext } from '../../context/userContext'
import Review from '../../components/reviews/Review'
import Loading from '../loader/Loading'




const Home = () => {
    const { pvk_categories, diamond_categories, settings, loading } = useContext(UserContext)
    const [pvks, setPvks] = useState([...pvk_categories]);
    const [diamonds, setDiamonds] = useState([...diamond_categories]);



    useEffect(() => {
        setPvks([...pvk_categories])
    }, [pvk_categories])
    useEffect(() => {
        setDiamonds([...diamond_categories])
    }, [diamond_categories])
    return (
        <>
            {loading ? <Loading /> : <AppWrapper>
                {
                    settings?.heading === "none" ? null : <div className="scroll-text-div" style={{ background: settings?.color2 }}>
                        <div className='text-div'>
                            <p> ***Information :{settings
                                ?.heading} </p>
                        </div>
                    </div>
                }
                <div className='hero' style={{ background: settings?.color ? settings?.color : "#1e201e" }}>
                    <div className="left">
                        <h4>JDM MOMENTS</h4>
                        <h1>Welcome to JDM Moments <br /> <span className='title-half' style={{ color: settings.color2 }}> (Jewellery Designer Manoj)</span></h1>
                        <span className='hero-desc'>Explore our marketplace of different jewellery designs, Buy and claim your products.</span>
                        <Link className='hero-link' to={"/contact"} style={{ background: settings.color2 }}>Tell Us Your Queries</Link>
                    </div>
                    <div className="right">
                        <img src={settings?.heroimg?.length === 0 ? jdmhomeimg : settings?.heroimg} alt="" className='hero-img' />
                    </div>
                </div>
                <div className="products-pvk">
                    <h1>POLKI VICTORIAN & KUNDAN PRODUCTS</h1>
                    <div className="cards-sec">
                        {
                            pvks.length === 0 ? <h2 style={{ textAlign: "center", color: "#fff" }}>Sorry No Products To Show - <Link style={{ color: "#fff" }}>Contact Admin</Link></h2> :
                                pvks?.map((prod) => (
                                    <FeatureCards prod={prod} key={prod._id} linkto={"pvk"} />
                                )).slice(0,)
                        }
                    </div>
                </div>
                <div className="about-us" style={{ background: settings.color2 }}>
                    <div className="left">
                        <span className='tag'>JDM MOMENTS</span>
                        <h2>Best Handcrafted And <br /> Custom Jewelry Designs</h2>
                        <p>{settings.about}</p>
                    </div>
                    <div className="right">
                        <img src={settings?.aboutimg?.length === 0 ? testprod2 : settings?.aboutimg} alt="" />
                    </div>
                </div>
                <div className="diamonds">
                    <h1>DIAMOND PRODUCTS</h1>
                    <div className="cards-sec">
                        {
                            diamonds.length === 0 ?
                                <h2 style={{ textAlign: "center", color: "#fff" }}>Sorry No Products To Show - <Link style={{ color: "#fff" }}>Contact Admin</Link></h2>
                                :
                                diamonds?.map((prod) => (
                                    <FeatureCards prod={prod} key={prod._id} linkto={"diamond"} />
                                )).slice(0,)
                        }
                    </div>
                </div>
                <div className="review-section" style={{ background: settings?.color ? settings?.color : "#1e201e" }}>
                    <h1>Customer Reviews</h1>
                    <Review />
                </div>
            </AppWrapper>
            }

        </>
    )
}

export default Home
