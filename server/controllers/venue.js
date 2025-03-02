import { tryCatch } from '../middlewares/error.js'
import { Venue } from '../models/Venue.js'

const store = tryCatch(async (req, res, next) => {
    const venue = await Venue.create({
        ...req.body,
        date: req.body.date.split('-').reverse().join('-')
    })
    res.status(200).json({ success: true, data: venue, msg: 'Venue Details Stored Successfully' })
})


export { store }
