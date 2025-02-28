import { compare } from 'bcrypt'
import { v2 } from 'cloudinary'
import crypto from 'crypto'
import { tryCatch } from '../middlewares/error.js'
import { User } from '../models/User.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'
import sendToken, { cookieOptions } from '../utils/jwtToken.js'
import { ErrorHandler } from '../utils/utility.js'
import sendEmail from '../utils/sendEmail.js'

const register = tryCatch(async (req, res, next) => {
    const { name, password, email } = req.body
    const file = req.file
    if (!file) return next(new ErrorHandler(400, 'Please upload Chavi'))
    const userExists = await User.findOne({ email })
    if (userExists) return next(new ErrorHandler(400, 'Email already registered'))
    const chaviResult = await uploadToCloudinary([file])
    const chavi = {
        publicID: chaviResult[0].publicID,
        url: chaviResult[0].url,
    }
    const user = await User.create({ name, password, chavi, email })
    sendToken(res, user, 201, 'Registration Successful')
})

const login = tryCatch(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler(400, 'Username or Password is incorrect'))
    const isMatch = await compare(password, user.password)
    if (!isMatch) return next(new ErrorHandler(400, 'Username or Password is incorrect'))
    user.password = undefined
    sendToken(res, user, 200, `Welcome Back, ${user.name}`)
})

const getMyProfile = tryCatch(async (req, res, next) => {
    const user = await User.findById(req.user)
    if (!user) return next(new ErrorHandler(404, 'User not found'))
    res.status(200).json({ success: true, user })
})

const logOut = tryCatch(async (req, res, next) => {
    res.status(200).cookie('user', null, { ...cookieOptions, maxAge: 0 }).json({ success: true, msg: 'Logged Out Successfully' })
})

const updateProfile = tryCatch(async (req, res, next) => {
    const { name, email } = req.body
    const file = req.file
    const user = await User.findById(req.user)
    if (!user) return next(new ErrorHandler(404, 'User not found'))
    if (name) user.name = name
    if (email) user.email = about
    if (file) {
        await v2.uploader.destroy(user.chavi.publicID)
        const chaviResult = await uploadToCloudinary([file])
        const chavi = {
            publicID: chaviResult[0].publicID,
            url: chaviResult[0].url,
        }
        user.chavi = chavi
    }
    await user.save()
    res.status(200).json({ success: true, msg: 'Profile Updated Successfully' })
})

const updatePassword = tryCatch(async (req, res, next) => {
    const { old, newP } = req.body
    const user = await User.findById(req.user).select('+password')
    if (!user) return next(new ErrorHandler(404, 'User not found'))
    if (!(old && newP)) return next(new ErrorHandler(400, 'Please provide old & new password'))
    const isMatch = await compare(old, user.password)
    if (!isMatch) return next(new ErrorHandler(400, 'Old Password entered is incorrect'))
    user.password = newP
    await user.save()
    res.status(200).json({ success: true, msg: 'Password Updated Successfully' })
})

const forgotPassword = tryCatch(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler(404, 'User not found'))
    const resetToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpiry = Date.now() + 1800000
    await user.save()
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`
    const text = `Reset your password by clicking on the link below:\n\n ${resetUrl}`
    try {
        await sendEmail({ to: user.email, subject: 'Reset your password', text })
        return res.status(200).json({ success: true, msg: `Email sent to ${user.email}` })
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined
        user.resetPasswordExpiry = undefined
        await user.save()
        return res.status(500).json({ success: false, msg: err.msg })
    }
})

const resetPassword = tryCatch(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpiry: { $gt: Date.now() } })
    if (!user) return next(new ErrorHandler(401, 'Token is invalid or has expired'))
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    user.password = req.body.password
    await user.save()
    res.status(200).json({ success: true, msg: 'Password updated successful' })
})

const delAccount = tryCatch(async (req, res, next) => {

    res.status(200).json({ success: true, msg: 'Account Deleted Successfully' })
})

export { login, register, getMyProfile, logOut, updateProfile, updatePassword, forgotPassword, resetPassword, delAccount }