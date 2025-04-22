import { createHmac } from 'crypto'
import { tryCatch } from "../middlewares/error.js"
import { instance } from '../server.js'
import { Payment } from '../models/Payment.js'
import { ErrorHandler } from "../utils/utility.js"
import { Event } from '../models/Event.js'

const checkout = tryCatch(async (req, res, next) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    }
    const paymentOrder = await instance.orders.create(options)
    const createdOrder = await Event.findByIdAndUpdate(req.params.id,
        {
            paymentInfo: {
                orderID: paymentOrder.id,
                status: 'Pending'
            }
        },
        { new: true }
    )
    res.status(200).json({ success: true, msg: 'Payment Initiated', createdOrder })
})

const verifyPayment = tryCatch(async (req, res, next) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature =
        createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex')
    const { signature } = await Payment.create({
        paymentID: razorpay_payment_id,
        orderID: razorpay_order_id,
        signature: razorpay_signature
    })
    if (expectedSignature !== signature) return next(new ErrorHandler(400, 'Invalid Payment Signature'))
    const order = await Event.findOneAndUpdate(
        { 'paymentInfo.orderID': razorpay_order_id },
        {
            paymentInfo: {
                paymentID: razorpay_payment_id,
                status: 'Successful'
            },
            paidAt: Date.now()
        },
        { new: true }
    )
    res.redirect(`${process.env.CLIENT_URL}/success?ref=${razorpay_payment_id}`)
})

const key = async (req, res) => res.status(200).json({ success: true, key: process.env.RAZORPAY_KEY })

export { checkout, key, verifyPayment }