import { Router } from 'express'
import { create } from '../controllers/event.js'

const app = Router()

app.post('/', event)

export default app