import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    event: {
        ref: 'Event',
        type: Schema.Types.ObjectId,
        required:true
    },
    eventType: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    extras: String,
},
    { timestamps: true }
)

export const Venue = mongoose.models.Venue || model('Venue', schema)