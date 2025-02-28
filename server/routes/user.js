import { Router } from 'express'
import { delAccount, forgotPassword, getMyProfile, login, logOut, register, resetPassword, updatePassword, updateProfile } from '../controllers/user.js'
import { forgotPasswordValidator, loginValidator, registerValidator, resetPasswordValidator, validateHandler } from '../lib/validators.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { singleChavi } from '../middlewares/multer.js'

const app = Router()

app.post('/register', singleChavi, registerValidator(), validateHandler, register)
app.put('/login', loginValidator(), validateHandler, login)
app.put('/forgot-password', forgotPasswordValidator(), validateHandler, forgotPassword)
app.put('/reset-password/:token', resetPasswordValidator(), validateHandler, resetPassword)

app.use(isAuthenticated)
app.get('/my-profile', getMyProfile)
app.get('/logout', logOut)
app.put('/update-profile', singleChavi, updateProfile)
app.put('/update-password', updatePassword)
app.delete('/', delAccount)

export default app