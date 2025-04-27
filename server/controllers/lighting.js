import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'
import { Lighting } from '../models/Lighting.js'

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
        today.setHours(0, 0, 0, 0);

        if (endDate >= today) event = e._id
    });
    const lighting = await Lighting.create({ ...req.body, event })
    res.status(200).json({ success: true, data: lighting, msg: 'Lighting Details Stored Successfully' })
})


export { store }

