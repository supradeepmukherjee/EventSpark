import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'
import { Review } from '../models/Review.js'

const store = tryCatch(async (req, res, next) => {
    const { event, rating, comment } = req.body
    const review = await Review.create({ event, rating, comment })
    const reviewedEvent = await Event.findByIdAndUpdate(event, { reviewGiven: true }, { new: true })
    res.status(200).json({ success: true, msg: 'Review Submitted Successfully', review, reviewedEvent })
})

export { store }
