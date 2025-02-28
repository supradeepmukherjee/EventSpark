import { connect } from 'mongoose'

export const connectDatabase = () => {
    connect(process.env.MONGO_URI)
        .then(con => console.log(`db ${con.connection.host}`))
        .catch(err => console.log(err))
}