import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'
import { User } from '../models/User.js'

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

const analytics = tryCatch(async (req, res, next) => {
    const [totalUsers, totalEvents] = await Promise.all([
        User.countDocuments({}),
        Event.find({})
    ])

    const pendingEvents = totalEvents.filter(e => e.status === 'Pending').length
    const approvedEvents = totalEvents.filter(e => e.status === 'Approved').length
    const rejectedEvents = totalEvents.filter(e => e.status === 'Rejected').length

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activeEvents = 0

    totalEvents.forEach(e => {
        const startDate = e.startDate.setHours(0, 0, 0, 0);
        const endDate = e.endDate.setHours(0, 0, 0, 0);

        if (today >= startDate && today <= endDate) activeEvents++
    });

    res.status(200).json({ totalUsers, totalEvents: totalEvents.length, activeEvents, rejectedEvents, approvedEvents, pendingEvents })
})

export { create, getEventDetails, allEvents, eventsByUser, updateStatus, analytics }
