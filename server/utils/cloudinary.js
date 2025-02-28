import { v2 } from 'cloudinary'

export const uploadToCloudinary = async files => {
    let options = {
        resource_type: 'auto',
        folder: 'Event',//?
        crop: 'scale',
    }
    const uploadPromises = files.map(f =>
        new Promise((resolve, reject) => {
            v2.uploader.upload(
                `data:${f.mimetype};base64,${f.buffer.toString('base64')}`,
                options,
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                })
        })
    )
    try {
        const rawResults = await Promise.all(uploadPromises)
        const results = rawResults.map(r => ({
            id: r.public_id,
            url: r.secure_url
        }))
        return results
    } catch (err) {
        console.log(err)
        throw new Error('Error uploading files to cloudinary', err)
    }
}

export const delCloudinaryFiles = async files => {
    const delPromises = files.map(f =>
        new Promise((resolve, reject) => {
            v2.uploader.destroy(f, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    )
    try {
        await Promise.all(delPromises)
    } catch (err) {
        console.log(err)
        throw new Error('Error deleting files in cloudinary', err)
    }
}