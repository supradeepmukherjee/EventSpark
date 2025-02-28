import { Router } from 'express'
import { store } from '../controllers/contact.js'

const app = Router()

app.post('/', store)

export default app