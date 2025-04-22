import { Router } from 'express'
import user from './user.js'
import contact from './contact.js'
import event from './event.js'
import decoration from './decoration.js'
import entertainment from './entertainment.js'
import lighting from './lighting.js'
import venue from './venue.js'
import food from './foodNdrink.js'
import payment from './payment.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = Router()

router.use('/user', user)
router.use('/contact', contact)

router.use(isAuthenticated)
router.use('/event', event)
router.use('/decoration', decoration)
router.use('/entertainment', entertainment)
router.use('/food',food)
router.use('/lighting', lighting)
router.use('/venue', venue)
router.use('/payment', payment)

export default router