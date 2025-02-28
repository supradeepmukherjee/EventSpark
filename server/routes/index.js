import { Router } from 'express'
import user from './user.js'
import contact from './contact.js'
import event from './event.js'

const router = Router()

router.use('/user', user)
router.use('/contact', contact)
router.use('/event', event)

export default router