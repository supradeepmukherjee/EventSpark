import { Router } from 'express'
import { allEvents, create, eventsByUser, getEventDetails } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)
app.get('/all', allEvents)
app.get('/by-account', eventsByUser)

export default app