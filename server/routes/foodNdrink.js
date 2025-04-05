import { Router } from 'express'
import { store } from '../controllers/foodNdrink.js'

const app = Router()

app.post('/', store)

export default app