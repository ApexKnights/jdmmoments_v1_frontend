import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'

const AppWrapper = ({ children }) => {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default AppWrapper
