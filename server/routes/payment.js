import { Router } from 'express'
import { checkout, key, verifyPayment } from '../controllers/payment.js'

const app = Router()

app.put('/checkout/:id', checkout)
app.get('/key', key)
app.post('/verify', verifyPayment)

export default app