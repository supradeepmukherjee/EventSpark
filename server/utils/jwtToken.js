import jwt from "jsonwebtoken"

export const cookieOptions = {
    maxAge: 60 * 60 * 24 * 15000,
    sameSite: 'none',
    httpOnly: true,
    secure: true
}

const sendToken = (res, user, code, msg = '') => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    return res
        .status(code)
        .cookie('user', token, cookieOptions)
        .json({ success: true, user, token, msg })
}

export default sendToken