import { Router } from 'express'
import { all, reply, store } from '../controllers/contact.js'

const app = Router()

app.post('/', store)
app.get('/', all)
app.put('/:id', reply)

export default app