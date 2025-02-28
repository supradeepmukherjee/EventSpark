import { Router } from 'express'
import user from './user.js'
import contact from './contact.js'

const router = Router()

router.use('/user', user)
router.use('/contact', contact)

export default router