import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    event: {
        ref: 'Event',
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

export const Review = mongoose.models.Review || model('Review', schema)
