import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Payment = () => {
    const payBtn = useRef(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    let gTotal = 0
    const shippingCharge = gTotal > 499 ? 0 : 100
    const tax = gTotal * .18
    const total = gTotal + tax + shippingCharge
    const submitHandler = async e => {
        e.preventDefault()
        setLoading(true)
        payBtn.current.disabled = true
        try {
            const { data: { paymentOrder } } = await axios.put(`${import.meta.env.VITE_SERVER}/payment/checkout/${id}`,
                { amount: total },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            const { data: { key } } = await axios.get(`${import.meta.env.VITE_SERVER}/payment/key`, { withCredentials: true })
            const rzp = new window.Razorpay({
                key,
                amount: 100,//dynamic kor
                currency: "INR",
                name: "EventSpark",
                description: "Payment Gateway",
                image: "",
                order_id: paymentOrder.id,
                callback_url: `${import.meta.env.VITE_SERVER}/payment/verify`,
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                notes: { address: "Razorpay Corporate Office" },
                theme: { color: "#3399cc" }
            })
            rzp.open()
        } catch (err) {
            console.log(err)
            payBtn.current.disabled = false
        } finally {
            setLoading(false)
        }
    }
    return (
        <p>
            <div className="payment">
                <button
                    type="submit"
                    ref={payBtn}
                    disabled={loading}
                    onClick={submitHandler}
                    className='paymentBtn'
                >
                    {loading ? 'Please Wait...' : `Pay Rs. ${total}`}
                </button>
            </div>
        </p>
    )
}

export default Payment