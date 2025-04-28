import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'
import { User } from '../models/User.js'

const create = tryCatch(async (req, res, next) => {
    const events = await Event.find({
        user: req.user,
        status: { $in: ['Approved', 'Pending'] }
    })
    let eventExists= false
    events.forEach(e => {
        const endDate = new Date(e.end);
        const today = new Date();

        // Set today's time to 00:00:00 to compare only dates (optional)
        today.setHours(0, 0, 0, 0);

        if (endDate >= today) eventExists = true
    });
    if(eventExists)return res.status(400).json({ success: false, msg: 'You have already created an event which has been either approved/pending. Also, if the event has been approved, it has not ended yet.' })
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
    const events = await Event.find({ user: req.user })
    let modifiedEvents=[]
    events.forEach(e => {
        if(e.status==='Approved'){
        const endDate = new Date(e.end);
        const today = new Date();

        // Set today's time to 00:00:00 to compare only dates (optional)
        today.setHours(0, 0, 0, 0);

        if (endDate >= today) modifiedEvents.push({...e, status:'Completed'})
        }else modifiedEvents.push(e)
    });
    res.status(200).json({ success: true, events })
})

const updateStatus = tryCatch(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: req.body.status })
    res.status(200).json({ success: true, event })
})

const analytics = tryCatch(async (req, res, next) => {
    const [totalUsers, totalEvents] = await Promise.all([
        User.countDocuments({role:'User'}),
        Event.find({})
    ])

    const pendingEvents = totalEvents.filter(e => e.status === 'Pending').length
    const approvedEvents = totalEvents.filter(e => e.status === 'Approved').length
    const rejectedEvents = totalEvents.filter(e => e.status === 'Rejected').length

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activeEvents = 0

    totalEvents.forEach(e => {
        const startDate = new Date(e.start);
        const endDate = new Date(e.end);
        const today = new Date();

        // Set today's time to 00:00:00 to compare only dates (optional)
        today.setHours(0, 0, 0, 0);

        if (endDate >= today&&startDate<=today) activeEvents++
    });

    res.status(200).json({ totalUsers, totalEvents: totalEvents.length, activeEvents, rejectedEvents, approvedEvents, pendingEvents })
})

export { create, getEventDetails, allEvents, eventsByUser, updateStatus, analytics }
