import { tryCatch } from '../middlewares/error.js'
import { Entertainment } from '../models/Entertainment.js'
import { Event } from '../models/Event.js'
import { Lighting } from '../models/Lighting.js'
import { User } from '../models/User.js'
import { Food } from '../models/FoodNDrink.js'
import { Venue } from '../models/Venue.js'
import { Decoration } from '../models/Decoration.js'
import { ErrorHandler } from '../utils/utility.js'

const create = tryCatch(async (req, res, next) => {
    const { start, end } = req.body
    const starting = new Date(start);
    const ending = new Date(end);
    const today = new Date();
    today.setHours(5, 30, 0, 0);
    if (starting <= today || ending <= today) return next(new ErrorHandler(400, 'Start date & End date must be atleast tomorrow.'))
    const events = await Event.find({
        user: req.user,
        status: { $in: ['Approved', 'Pending'] }
    })
    let eventExists = false
    events.forEach(e => {
        const endDate = new Date(e.end);
        if (endDate >= today) eventExists = true
    });
    if (eventExists) return res.status(400).json({ success: false, msg: 'You have already created an event which has been either approved/pending. Also, if the event has been approved, it has not ended yet.' })
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
    const events = await Event.find({ user: req.user }).lean()
    let modifiedEvents = []
    events.forEach(e => {
        if (e.status === 'Approved') {
            const endDate = new Date(e.end);
            const today = new Date();

            // Set today's time to 00:00:00 to compare only dates (optional)
            today.setHours(5, 30, 0, 0)

            if (endDate < today) modifiedEvents.push({ ...e, status: 'Completed' })
            else modifiedEvents.push(e)
        }
        else modifiedEvents.push(e)
    });
    res.status(200).json({ success: true, events: modifiedEvents })
})

const updateStatus = tryCatch(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: req.body.status })
    res.status(200).json({ success: true, event })
})

const analytics = tryCatch(async (req, res, next) => {
    const [totalUsers, totalEvents] = await Promise.all([
        User.countDocuments({ role: 'User' }),
        Event.find({})
    ])

    const pendingEvents = totalEvents.filter(e => e.status === 'Pending').length
    const approvedEvents = totalEvents.filter(e => e.status === 'Approved').length
    const rejectedEvents = totalEvents.filter(e => e.status === 'Rejected').length

    const today = new Date();
    today.setHours(5, 30, 0, 0)

    let activeEvents = 0

    totalEvents.forEach(e => {
        const startDate = new Date(e.start);
        const endDate = new Date(e.end);

        if (endDate >= today && startDate <= today) activeEvents++
    });

    res.status(200).json({ totalUsers, totalEvents: totalEvents.length, activeEvents, rejectedEvents, approvedEvents, pendingEvents })
})

const getServicesData = tryCatch(async (req, res, next) => {
    const events = await Event.find({
        user: req.user,
        status: 'Approved'
    })
    let event = ''
    events.forEach(e => {
        const endDate = new Date(e.end);
        const today = new Date();

        // Set today's time to 00:00:00 to compare only dates (optional)
        today.setHours(5, 30, 0, 0)

        if (endDate >= today) event = e._id
    });
    const [entertainment, lighting, food, venue, decoration] = await Promise.all([
        Entertainment.findOne({ event }).populate('event'),
        Lighting.findOne({ event }).populate('event'),
        Food.findOne({ event }).populate('event'),
        Venue.findOne({ event }).populate('event'),
        Decoration.findOne({ event }).populate('event'),
    ])
    res.status(200).json({ success: true, entertainment, lighting, food, venue, decoration })
})

const getAllServicesData = tryCatch(async (req, res, next) => {
    const [entertainment, lighting, food, venue, decoration] = await Promise.all([
        Entertainment.find({}).populate('event'),
        Lighting.find({}).populate('event'),
        Food.find({}).populate('event'),
        Venue.find({}).populate('event'),
        Decoration.find({}).populate('event'),
    ])
    res.status(200).json({ success: true, entertainment, lighting, food, venue, decoration })
})

const savePrice = tryCatch(async (req, res, next) => {
    let price = 0
    for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key))
            price += Number(req.body[key]);
    }
    const event = await Event.findByIdAndUpdate(req.params.id, { price }, { new: true })
    res.status(200).json({ success: true, event, msg: `Total Cost of Services for Event ID ${req.params.id} saved successfully` })
})

export { create, getEventDetails, allEvents, eventsByUser, updateStatus, analytics, getServicesData, getAllServicesData, savePrice }
