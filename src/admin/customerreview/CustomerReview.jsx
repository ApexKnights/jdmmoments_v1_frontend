import React, { useEffect, useState } from 'react'
import './styles.scss'
import axios from 'axios'
import { server } from '../../main'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import Swal from 'sweetalert2';

const CustomerReview = () => {
    const [all_reviews, setAll_Reviews] = useState([])
    const getReviews = async () => {
        try {
            const res = await axios.get(`${server}/review/get-reviews`, { withCredentials: true });
            setAll_Reviews(res.data.response)
        } catch (error) {
            console.log(error)
        }
    }

    const delReview = async (id) => {
        try {
            const res = await axios.delete(`${server}/review/delete-review/${id}`, { withCredentials: true });
            Swal.fire({
                title: res.data.response,
                timer: 2000,
                icon: 'success'
            })
        } catch (error) {
            Swal.fire({
                title: "Something Went Wrong",
                timer: 1500,
                icon: 'error'
            })
        }
    }

    useEffect(() => {
        getReviews()
    }, [])
    return (
        <div className='customer-reviews'>
            <div className="review-cards">
                {
                    all_reviews?.length === 0 ? <h3>Sorry, No reviews to show</h3> :
                        all_reviews?.map((r) => (
                            <div className="r-card" key={r._id}>
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
                                <button onClick={() => delReview(r._id)}>Delete Review?</button>
                            </div>
                        ))

                }

            </div >
        </div>
    )
}

export default CustomerReview
