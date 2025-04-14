import { Router } from 'express'
import { all, reply, store, user } from '../controllers/contact.js'

const app = Router()

app.post('/', store)
app.get('/user', user)
app.get('/', all)
app.put('/:id', reply)

export default app