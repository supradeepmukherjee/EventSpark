import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
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
    reply: String,
    isResolved: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

export const Contact = mongoose.models.Contact || model('Contact', schema)