import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'

const create = tryCatch(async (req, res, next) => {
    const event = await Event.create(req.body)
    res.status(200).json({ success: true, msg: 'Event Created Successfully', event })
})

const getEventDetails = tryCatch(async (req, res, next) => {
    const event = await Event.findOne(req.body)
    res.status(200).json({ success: true, data: event })
})

const allEvents = tryCatch(async (req, res, next) => {
    const events = await Event.find({})
    res.status(200).json({ success: true, events })
})

const eventsByUser = tryCatch(async (req, res, next) => {
    console.log(req.user)
    const events = await Event.find({ user: req.user })
    res.status(200).json({ success: true, events })
})

export { create, getEventDetails, allEvents, eventsByUser }
