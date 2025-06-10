import { tryCatch } from '../middlewares/error.js'
import { Decoration } from '../models/Decoration.js'
import { Event } from '../models/Event.js'

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
    const exists = await Decoration.findOne({ event })
    if (exists) return next(new ErrorHandler(400, 'You have already submitted the details of this service for the Ongoing Approved Event.'))
    const decoration = await Decoration.create({ ...req.body, event })
    res.status(200).json({ success: true, data: decoration, msg: 'Decoration Details Stored Successfully' })
})


export { store }

