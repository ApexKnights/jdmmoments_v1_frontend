import React, { useContext } from 'react'
import "./styles.scss"
import { Link } from "react-router-dom"
import { UserContext } from '../../context/userContext'

const Footer = () => {
    const { settings } = useContext(UserContext)
    return (
        <>
            <div className='footer' style={{ background: settings.color2 }}>
                <div className="jdm_dsc">
                    <h2>JDM MOMENTS</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod reiciendis enim aliquid voluptas veritatis dolore placeat quam dolor. Ratione, animi!
                    </p>
                </div>
                <div className="jdm_routes">
                    <Link className='link' onClick={() => scrollTo(0, 0)} to={"/contact"}>Contact</Link>
                    <Link className='link' onClick={() => scrollTo(0, 0)} to={"/pvk"}>PVK</Link>
                    <Link className='link' onClick={() => scrollTo(0, 0)} to={"/diamond"}>Diamond</Link>
                </div>
                <div className="jdm_address">
                    <h2>Contact Us</h2>
                    <div className="infos">
                        <h3>Phone Number - +918074855484</h3>
                        <h3>Email Id - manojpatra615@gmail.com</h3>
                    </div>
                </div>
            </div>
            <div className="footer-below" style={{ background: settings.color }}>
                <span>Developed and designed by <a href="https://souparnashee.com">Souparno Shee</a> | All Rights Reserved © 2024 </span>
            </div>
        </>
    )
}

export default Footer
