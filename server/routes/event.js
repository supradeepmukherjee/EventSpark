import { Router } from 'express'
import { allEvents, analytics, create, eventsByUser, getEventDetails, updateStatus } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)
app.get('/all', allEvents)
app.get('/by-account', eventsByUser)
app.put('/:id', updateStatus)
app.put('/analytics', analytics)

export default app