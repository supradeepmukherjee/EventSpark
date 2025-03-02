import { Router } from 'express'
import { store } from '../controllers/venue.js'

const app = Router()

app.post('/', store)

export default app