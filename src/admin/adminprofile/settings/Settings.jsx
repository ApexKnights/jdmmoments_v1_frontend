import React, { useContext, useState } from 'react'
import { HexColorPicker } from "react-colorful";
import "./styles.scss"
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import { server } from '../../../main';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Settings = () => {
    const { settings } = useContext(UserContext)
    const [color, setColor] = useState("#1e201e")
    const [color2, setColor2] = useState("#3c3d37")
    const [about, setAbout] = useState(settings.about)
    const [heading, setHeading] = useState(settings.heading)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const updateTexts = async () => {
        try {

            const res = await axios.put(`${server}/settings/update-texts/${settings._id}`, { about, heading }, { withCredentials: true })
            Swal.fire({
                title: "Your Website Content has been updated",
                icon: "info",
                timer: 1500
            })

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const updateColor = async () => {
        try {

            const res = await axios.put(`${server}/settings/update-color/${settings._id}`, { color, color2 }, { withCredentials: true })
            Swal.fire({
                title: "Your Website Colors has been updated",
                icon: "info",
                timer: 1500
            })

        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    const updateLogo = async () => {
        try {
            setLoading(true)
            let logo = ""
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename

                try {
                    const imgupload = await axios.post(`${server}/upload`, data, { withCredentials: true })
                    console.log(imgupload.data.message.url)
                    logo = imgupload.data.message.url;
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.put(`${server}/settings/update-logo/${settings._id}`, { logo }, { withCredentials: true })
            Swal.fire({
                title: "Your Website Logo has been updated",
                icon: "info",
                timer: 1500
            })
            setLoading(false)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const updateAboutImage = async () => {
        try {
            setLoading2(true)
            let aboutimg = ""
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename

                try {
                    const imgupload = await axios.post(`${server}/upload`, data, { withCredentials: true })
                    console.log(imgupload.data.message.url)
                    aboutimg = imgupload.data.message.url;
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.put(`${server}/settings/about-img/${settings._id}`, { aboutimg }, { withCredentials: true })
            Swal.fire({
                title: "Your Website About Image has been changed",
                icon: "info",
                timer: 1500
            })
            setLoading2(false)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    const updateHeroImage = async () => {
        try {
            setLoading3(true)
            let heroimg = ""
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('img', filename)
                data.append('file', file)
                // post.photo = filename

                try {
                    const imgupload = await axios.post(`${server}/upload`, data, { withCredentials: true })
                    console.log(imgupload.data.message.url)
                    heroimg = imgupload.data.message.url;
                } catch (error) {
                    console.log("Image cannot be uploaded, due to some error")
                    console.log(error)
                }
            }
            const res = await axios.put(`${server}/settings/hero-img/${settings._id}`, { heroimg }, { withCredentials: true })
            Swal.fire({
                title: "Your Website Landing page image has been changed",
                icon: "info",
                timer: 1500
            })
            setLoading3(false)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className='web-settings'>
            <div className="change-content">
                <label style={{ color: "#fff" }}>Enter Notice or Alert Message :-</label>
                <textarea rows={7} cols={40} type="text" placeholder='Change Heading of Website' value={heading} onChange={(e) => setHeading(e.target.value)} />
                <label style={{ color: "#fff" }}>Enter About Us details :-</label>
                <textarea rows={7} cols={40} type="text" placeholder='Change About Content' value={about} onChange={(e) => setAbout(e.target.value)} />
                <button onClick={updateTexts}>Change</button>


            </div>
            <div className="color-change">
                <div className="color-box">
                    <div className="primary">
                        <h3>Change Website Primary Color</h3>
                        <HexColorPicker color={color} onChange={(e) => setColor(e)} />
                        <input type='text' value={color} onChange={(e) => setColor(e.target.value)} />

                    </div>
                    <div className="secondary">
                        <h3>Change Website Secondary Color</h3>
                        <HexColorPicker color={color2} onChange={(e) => setColor2(e)} />
                        <input type='text' value={color2} onChange={(e) => setColor2(e.target.value)} />
                    </div>
                </div>
                <button onClick={updateColor}>Change Color</button>


            </div>
            <div className="logo-change">
                <label>Change Website Logo :-</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                {loading ? <h4 style={{ color: "#fff" }}>Loading....</h4> : <button onClick={updateLogo}>Change Logo</button>
                }

            </div>
            <div className="aboutimg-change">
                <label className='upload-about'>Change About Image :-
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                {loading2 ? <h4 style={{ color: "#fff" }}>Loading....</h4> : <button onClick={updateAboutImage}>Change About Image</button>
                }

            </div>
            <div className="heroimg-change">
                <label className='upload-hero'>
                    Upload Hero Image :-
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                </label>
                {loading3 ? <h4 style={{ color: "#fff" }}>Loading....</h4> : <button onClick={updateHeroImage}>Change Hero Image</button>
                }

            </div>
        </div>
    )
}

export default Settings
