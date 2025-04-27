import { Router } from 'express'
import { get, store } from '../controllers/review.js'

const app = Router()

app.post('/', store)
app.get('/', get)

export default app