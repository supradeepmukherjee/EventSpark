import { tryCatch } from '../middlewares/error.js'
import { Event } from '../models/Event.js'

const create = tryCatch(async (req, res, next) => {
    await Event.create(req.body)
    res.status(200).json({ success: true, msg: 'Thank you for Contacting Us.' })
})


export { create }

