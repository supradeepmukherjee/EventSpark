import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'
import { Food } from '../models/FoodNDrink.js'
import { ErrorHandler } from '../utils/utility.js'

const store = tryCatch(async (req, res, next) => {
    const events = await Event.find({
        user: req.user,
        status: 'Approved'
    })
    let event = ''
    console.log(events)
    events.forEach(e => {
        const endDate = new Date(e.end);
        const today = new Date();

        // Set today's time to 00:00:00 to compare only dates (optional)
        today.setHours(5, 30, 0, 0)

        if (endDate >= today) event = e._id
    });
    const exists = await Food.findOne({ event })
        if (exists) return next(new ErrorHandler(400, 'You have already submitted the details of this service for the Ongoing Approved Event.'))
    const entertainment = await Food.create({
        ...req.body,
        event,
        date: req.body.date.split('-').reverse().join('-')
    })
    res.status(200).json({ success: true, data: entertainment, msg: 'Food & Drink Details Stored Successfully' })
})


export { store }

