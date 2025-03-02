import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    theme: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    flowers: {
        type: String,
        required: true,
    },
    extras: String,
},
    { timestamps: true }
)

export const Decoration = mongoose.models.Decoration || model('Decoration', schema)