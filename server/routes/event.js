import { Router } from 'express'
import { allEvents, analytics, create, eventsByUser, getEventDetails, getServicesData, updateStatus, getAllServicesData, savePrice } from '../controllers/event.js'

const app = Router()

app.post('/', create)
app.get('/', getEventDetails)
app.get('/all', allEvents)
app.get('/by-account', eventsByUser)
app.put('/:id', updateStatus)
app.get('/analytics', analytics)
app.get('/user-services', getServicesData)
app.get('/admin-services', getAllServicesData)
app.put('/save-price/:id', savePrice)

export default app