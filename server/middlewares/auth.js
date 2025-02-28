import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    const { user } = req.cookies
    if (!user) return res.status(401).json({})
    const { _id } = jwt.verify(user, process.env.JWT_SECRET)
    req.user = _id
    next()
}