import { tryCatch } from '../middlewares/error.js'
import { Food } from '../models/FoodNDrink.js'

const store = tryCatch(async (req, res, next) => {
    const entertainment = await Food.create({
        ...req.body,
        date: req.body.date.split('-').reverse().join('-')
    })
    res.status(200).json({ success: true, data: entertainment, msg: 'Food & Drink Details Stored Successfully' })
})


export { store }

