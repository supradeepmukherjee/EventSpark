import { tryCatch } from '../middlewares/error.js'
import { Decoration } from '../models/Decoration.js'

const store = tryCatch(async (req, res, next) => {
    const decoration = await Decoration.create(req.body)
    res.status(200).json({ success: true, data: decoration, msg: 'Decoration Details Stored Successfully' })
})


export { store }

