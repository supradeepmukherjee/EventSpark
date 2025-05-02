import { Router } from 'express'
import { allEvents, analytics, create, eventsByUser, getEventDetails, getServicesData, updateStatus, getAllServicesData, savePrice, completedEvents, getEventById } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)
app.get('/all', allEvents)
app.get('/completed', completedEvents)
app.get('/by-account', eventsByUser)
app.get('/analytics', analytics)
app.get('/user-services', getServicesData)
app.get('/admin-services', getAllServicesData)
app.put('/save-price/:id', savePrice)
app.put('/:id', updateStatus)
app.get('/:id', getEventById)

export default app