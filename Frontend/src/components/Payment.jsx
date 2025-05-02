import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Payment = () => {
    const payBtn = useRef(null)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [clickable, setClickable] = useState(false)
    const { id } = useParams();
    const { user } = useContext(AuthContext);
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
                amount: total,
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
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/event/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(({ data }) => {
                let s = 0
                for (const key in data?.event?.price) {
                    if (Object.prototype.hasOwnProperty.call(data?.event?.price, key)) {
                        s += Number(data?.event?.price[key])
                    }
                }
                setTotal(s)
                setClickable(true)
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <p>
            <div className="payment">
                <button
                    type="submit"
                    ref={payBtn}
                    disabled={loading || !clickable}
                    onClick={submitHandler}
                    className='paymentBtn'
                >
                    {(loading || !clickable) ? 'Please Wait...' : `Pay Rs. ${total}`}
                </button>
            </div>
        </p>
    )
}

export default Payment