import React from 'react'
import "./styles.scss"
import { ThreeDots } from 'react-loader-spinner'
import logo from "../../assets/jdmlogo.png"

const Loading = () => {
    return (
        <div className='load-page'>
            <img src={logo} alt="" />
            <ThreeDots
                visible={true}
                height="60"
                width="60"
                color="#e4a951"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loading
