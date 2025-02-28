import { tryCatch } from '../middlewares/error.js'
import { Contact } from '../models/Contact.js'

const store = tryCatch(async (req, res, next) => {
    await Contact.create(req.body)
    res.status(200).json({ success: true, msg: 'Thank you for Contacting Us.' })
})


export { store }
