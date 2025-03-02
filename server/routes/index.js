import { Router } from 'express'
import user from './user.js'
import contact from './contact.js'
import event from './event.js'
import decoration from './decoration.js'

const router = Router()

router.use('/user', user)
router.use('/contact', contact)
router.use('/event', event)
router.use('/event', event)
router.use('/decoration', decoration)

export default router