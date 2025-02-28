import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

export const Contact = mongoose.models.Contact || model('Contact', schema)