import { Router } from 'express'
import { store } from '../controllers/lighting.js'

const app = Router()

app.post('/', store)

export default app