import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    event: {
        ref: 'Event',
        type: Schema.Types.ObjectId,
        required:true
    },
    guests: {
        type: String,
        required: true,
    },
    date: String,
    cuisines: [{
        type: String,
        required: true,
    }],
    beverages: [{
        type: String,
        required: true,
    }],
    dietaryRestrictions: String,
    specialRequests: String,
},
    { timestamps: true }
)

export const Food = mongoose.models.Food || model('Food', schema)