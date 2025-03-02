import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'

const create = tryCatch(async (req, res, next) => {
    await Event.create(req.body)
    res.status(200).json({ success: true, msg: 'Event Created Successfully' })
})

const getEventDetails = tryCatch(async (req, res, next) => {
    const event = await Event.findOne(req.body)
    res.status(200).json({ success: true, data: event })
})

export { create, getEventDetails }
