import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'

const create = tryCatch(async (req, res, next) => {
    console.log(req.user)
    const event = await Event.create({ ...req.body, user: req.user })
    res.status(200).json({ success: true, msg: 'Event Created Successfully', event })
})

const getEventDetails = tryCatch(async (req, res, next) => {
    const event = await Event.findOne(req.body)
    res.status(200).json({ success: true, data: event })
})

const allEvents = tryCatch(async (req, res, next) => {
    const query = {}
    const { status } = req.query
    if (status) query.status = status
    const events = await Event.find(query).populate('user')
    res.status(200).json({ success: true, events })
})

const eventsByUser = tryCatch(async (req, res, next) => {
    const event = await Event.findOne({ user: req.user })
    res.status(200).json({ success: true, event: event._id })
})

const updateStatus = tryCatch(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: req.body.status })
    res.status(200).json({ success: true, event })
})

export { create, getEventDetails, allEvents, eventsByUser, updateStatus }
