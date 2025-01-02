import React, { useContext } from 'react'
import "./styles.scss"
import AppWrapper from '../../components/AppWrapper'
import testprod2 from "../../assets/testprod2.jpg"
import pvkabout from "../../assets/pvk-about.jpg"
import diamondabout from "../../assets/diamond-about.jpg"
import { UserContext } from '../../context/userContext'

const About = () => {
    const { settings } = useContext(UserContext)
    return (
        <AppWrapper>
            <div className='about' style={{ background: settings?.color }}>
                <div className="about-hero">
                    <h2>JDM Momemnts</h2>
                    <h1 style={{ color: settings?.color2 }}>About Us</h1>
                    <span>Now get your custom jewellery designs online with JDM Moments</span>
                    <button className='about-contact-button' style={{ background: settings?.color2 }}>Contact Us</button>
                </div>
                <div className="about-content">
                    <div className="left">
                        <span className='tag'>JDM MOMENTS</span>
                        <h2>Best Handcrafted And <br /> Custom Jewelry Designs</h2>
                        <p>{settings.about}</p>
                    </div>
                    <div className="right">
                        <img src={testprod2} alt="" />
                    </div>
                </div>
                <div className="about-content">
                    <div className="left">
                        <img src={pvkabout} alt="" />
                    </div>
                    <div className="right pvkabout">
                        <span className='tag'>JDM MOMENTS (info)</span>
                        <h2>About Polki </h2>
                        <p>Polki jewellery is crafted using uncut, raw diamonds that retain their natural form. It is one of the oldest forms of traditional jewellery in India and has been an integral part of Indian culture for centuries.</p>
                        <h2>About Kundan</h2>
                        <p>Kundan jewellery is a traditional Indian jewellery style, renowned for its intricate craftsmanship and the use of highly refined gold (kundan). It often features gemstones and glass pieces embedded in a gold base.</p>
                        <h2>About Victorian</h2>
                        <p>Victorian jewellery is inspired by the styles prevalent during the Victorian era (1837–1901). It is characterized by its vintage charm, understated elegance, and the use of semi-precious stones.</p>

                    </div>
                </div>
                <div className="about-content">
                    <div className="left">
                        <span className='tag'>JDM MOMENTS</span>
                        <h2>Our Diamond Collections</h2>
                        <span>At JDM MOMENTS, we bring you the finest diamond jewellery, designed to make every moment sparkle. With an exquisite range of styles and designs, our diamonds are ethically sourced and carefully crafted to perfection. From dazzling solitaires to intricately designed statement pieces, our collection is perfect for those who cherish timeless elegance. Whether it's for a celebration, a gift, or a treat for yourself, our diamonds reflect the brilliance of your special moments.</span>
                    </div>
                    <div className="right diamondabout">
                        <img src={diamondabout} alt="" />
                    </div>
                </div>
            </div>
        </AppWrapper>
    )
}

export default About
