import React, { useContext, useEffect, useState } from 'react'
import "./styles.scss"
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { server } from '../../main';
import Swal from 'sweetalert2';

const Review = () => {
    const [loading, setLoading] = useState(false)
    const { user, settings } = useContext(UserContext)
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState('')
    const [all_reviews, setAll_Reviews] = useState([])

    const handleReviewPost = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${server}/review/post-review/${user?.email}`, {
                username: user?.username,
                desc,
                rating,
            }, { withCredentials: true })
            Swal.fire({
                title: res.data.response,
                timer: 1500,
                icon: 'success'
            })
            setLoading(false)
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: 'error'
            })
        }
    }

    const getReviews = async () => {
        try {
            const res = await axios.get(`${server}/review/get-reviews`, { withCredentials: true });
            setAll_Reviews(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getReviews()
    }, [loading])
    return (
        <>
            <div className="review-cards">
                {
                    all_reviews?.length === 0 ? <h3>Sorry, No reviews to show</h3> :
                        all_reviews?.map((r) => (
                            <div className="r-card" style={{ background: settings.color2 }}>
                                <h3>{r.username}</h3>
                                <div className="qouted-rev">
                                    <FaQuoteLeft className='quotes' />
                                    <p>{r.desc}</p>
                                    <FaQuoteRight className='quotes' />
                                </div>
                                <div className="rates">
                                    <MdOutlineStar className='star' />
                                    <p> <b>{r.rating} Out of 5 </b></p>
                                </div>
                            </div>
                        ))

                }

            </div >

            {
                user ? <div className="give-rev">
                    <h2 h2 > Please give your valuable revivew about us</h2 >
                    <div className="rev-form">
                        <textarea cols={30} rows={10} type="text" placeholder='Write Your Review' onChange={(e) => setDesc(e.target.value)} />
                        <div className="review-num">
                            <label>Rate us out of 5 - {rating}</label>
                            <input type="range" max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
                        </div>
                        {
                            loading ? <h4>Uploading your Review ....</h4> :
                                <button onClick={handleReviewPost}>Submit Review</button>
                        }

                    </div>
                </div > : null
            }
        </>
    )
}

export default Review
