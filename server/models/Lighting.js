import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    event: {
        ref: 'Event',
        type: Schema.Types.ObjectId,
        required:true
    },
    lightingType: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    intensity: {
        type: String,
        required: true,
    },
    extras: String,
},
    { timestamps: true }
)

export const Lighting = mongoose.models.Lighting || model('Lighting', schema)