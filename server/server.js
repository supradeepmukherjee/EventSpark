import app from './app.js'
import { v2 } from 'cloudinary'
import { connectDatabase } from './config/database.js'

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
})

connectDatabase()

app.listen(process.env.PORT, () => console.log(process.env.PORT))