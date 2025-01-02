import React from 'react'
import "./styles.scss"
import { RxCross2 } from "react-icons/rx";


const ImageModal = ({ img, setOpenImage }) => {
    return (
        <div className='image-modal'>
            <RxCross2 className='cross' onClick={() => setOpenImage(false)} />
            <img src={img} alt="" />
        </div>

    )
}

export default ImageModal
