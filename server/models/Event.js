import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    services: [{
        type: String,
        required: true,
    }],
    additionalInfo: String,
},
    { timestamps: true }
)

export const Event = mongoose.models.Event || model('Event', schema)