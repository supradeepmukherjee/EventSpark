import { Router } from 'express'
import user from './user.js'
import contact from './contact.js'
import event from './event.js'
import decoration from './decoration.js'
import entertainment from './entertainment.js'
import lighting from './lighting.js'
import venue from './venue.js'

const router = Router()

router.use('/user', user)
router.use('/contact', contact)
router.use('/event', event)
router.use('/decoration', decoration)
router.use('/entertainment', entertainment)
router.use('/lighting', lighting)
router.use('/venue', venue)

export default router