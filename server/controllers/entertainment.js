import { tryCatch } from '../middlewares/error.js'
import { Entertainment } from '../models/Entertainment.js'

const store = tryCatch(async (req, res, next) => {
    const entertainment = await Entertainment.create(req.body)
    res.status(200).json({ success: true, data: entertainment, msg: 'Entertainment Details Stored Successfully' })
})


export { store }

