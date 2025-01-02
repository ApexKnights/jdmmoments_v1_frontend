import React, { useContext } from 'react'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const FeatureCards = ({ prod, linkto }) => {
    const { settings } = useContext(UserContext)
    return (
        <div className='feature-cards'>
            <div className="img-sec">
                <img src={prod.catimg} alt="" />
            </div>
            <div className="content-sec" style={{ background: settings.color2 }}>
                <div className="titles">
                    <h3>{prod.catname}</h3>
                    <span> Starting At INR {prod.price}/-</span>
                </div>
                <div className="butts">
                    <Link to={`/${linkto}`} onClick={() => scrollTo(0, 0)} className='button'>View Products</Link>
                </div>
            </div>
        </div>
    )
}

export default FeatureCards
