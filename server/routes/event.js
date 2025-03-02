import { Router } from 'express'
import { create } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)

export default app