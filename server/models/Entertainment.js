import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    event: {
        ref: 'Event',
        type: Schema.Types.ObjectId,
        required:true
    },
    music: {
        type: String,
        required: true,
    },
    games: {
        type: String,
        required: true,
    },
    play: {
        type: String,
        required: true,
    },
    extras: String,
},
    { timestamps: true }
)

export const Entertainment = mongoose.models.Entertainment || model('Entertainment', schema)