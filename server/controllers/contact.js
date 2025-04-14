import { tryCatch } from '../middlewares/error.js'
import { Contact } from '../models/Contact.js'

const store = tryCatch(async (req, res, next) => {
    const q = req.body
    if (req.user) q = { ...q, user: req.user }
    await Contact.create(q)
    res.status(200).json({ success: true, msg: 'Thank you for Contacting Us.' })
})

const all = tryCatch(async (req, res, next) => {
    const queries = await Contact.find({})
    res.status(200).json({ success: true, queries })
})

const reply = tryCatch(async (req, res, next) => {
    const reply = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            reply: req.body.reply,
            isResolved: true
        },
        { new: true }
    )
    res.status(200).json({ success: true, reply })
})

export { store, all, reply }
