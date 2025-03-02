import { Router } from 'express'
import { store } from '../controllers/decoration.js'

const app = Router()

app.post('/', store)

export default app