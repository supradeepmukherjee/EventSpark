import { Router } from 'express'
import { all, store } from '../controllers/contact.js'

const app = Router()

app.post('/', store)
app.get('/', all)

export default app