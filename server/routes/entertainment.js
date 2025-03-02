import { Router } from 'express'
import { store } from '../controllers/entertainment.js'

const app = Router()

app.post('/', store)

export default app