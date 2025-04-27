import { Router } from 'express'
import { store } from '../controllers/review.js'

const app = Router()

app.post('/', store)

export default app