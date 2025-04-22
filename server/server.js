import app from './app.js'
import { v2 } from 'cloudinary'
import Pay from 'razorpay'
import { connectDatabase } from './config/database.js'

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
})

export const instance = new Pay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

connectDatabase()

app.listen(process.env.PORT, () => console.log(process.env.PORT))