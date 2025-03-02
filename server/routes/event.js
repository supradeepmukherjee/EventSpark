import { Router } from 'express'
import { create, getEventDetails } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)

export default app