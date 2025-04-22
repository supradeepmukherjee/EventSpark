import mongoose, { Schema, model, Types } from 'mongoose'

const paymentSchema = new Schema({
    paymentID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
})

export const Payment = mongoose.models.EventPayment || model('EventPayment', paymentSchema)