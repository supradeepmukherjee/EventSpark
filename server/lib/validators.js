import { body,  param, validationResult } from 'express-validator'
import { ErrorHandler } from '../utils/utility.js'

const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) next()
    else next(new ErrorHandler(400, errors.array().map(({ msg }) => msg).join(', ')))
}

const registerValidator = () => [
    body('name', 'Please Enter name').notEmpty(),
    body('password').isLength({ min: 8 }).withMessage('Password must be of minimum 8 characters'),
    body('email').notEmpty().withMessage('Please enter an email ID').isEmail().withMessage('Invalid email format'),
]

const loginValidator = () => [
    body('email').notEmpty().withMessage('Please enter an email ID').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be of minimum 8 characters'),
]

const sendAttachmentsValidator = () => [body('id', 'Please Enter Chat ID').notEmpty()]

const chatIDValidator = () => [param('id', 'Please Enter Chat ID').notEmpty()]

const forgotPasswordValidator = () => [body('email', 'Please Enter Email ID').notEmpty()]

const resetPasswordValidator = () => [body('password', 'Please Enter Password').notEmpty()]

export { validateHandler, registerValidator, loginValidator, sendAttachmentsValidator, chatIDValidator, forgotPasswordValidator, resetPasswordValidator }