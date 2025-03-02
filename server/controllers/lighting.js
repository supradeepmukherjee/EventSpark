import { tryCatch } from '../middlewares/error.js'
import { Lighting } from '../models/Lighting.js'

const store = tryCatch(async (req, res, next) => {
    const lighting = await Lighting.create(req.body)
    res.status(200).json({ success: true, data: lighting, msg: 'Lighting Details Stored Successfully' })
})


export { store }

