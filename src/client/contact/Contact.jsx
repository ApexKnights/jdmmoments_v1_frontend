import React, { useContext } from 'react'
import AppWrapper from '../../components/AppWrapper'
import "./styles.scss"
import { UserContext } from '../../context/userContext'

const Contact = () => {
    const { settings } = useContext(UserContext)
    return (
        <AppWrapper>
            <div className="contact" style={{ background: settings.color }}>
                <div className="contact-hero">
                    <span>JDM Moments</span>
                    <h1>Contact Us</h1>
                    <span>At JDM, We are here to help you with all your queries, Whether you buy something, or need any custom design <br /> contact us by filling the form below, we contact you shortly</span>
                </div>
                <div className="contact-form">
                    <div className='left'>
                        <h1 className='head' style={{ color: settings?.color2 }}>Want to talk or <br /> Want a  custom Design?</h1>
                        <h3 className='conts'>Contact Us, fill Up the details We will contact you <br /> within 24 hours.</h3>
                    </div>
                    <div className="right">
                        <form>
                            <h1>Fill up the form below</h1>
                            <input style={{ border: `1px solid ${settings.color2}` }} type="text" placeholder='Enter Your Name' />
                            <input style={{ border: `1px solid ${settings.color2}` }} type="email" placeholder='Enter Your Email' />
                            <input style={{ border: `1px solid ${settings.color2}` }} type="Number" placeholder='Enter your Mobile Number' />
                            <button style={{ background: settings?.color2 }}>Contact Now</button>
                        </form>
                        <h2>OR</h2>
                        <a href='#' className='wp'>Whatsapp ?</a>
                    </div>
                </div>
            </div>
        </AppWrapper>
    )
}

export default Contact
