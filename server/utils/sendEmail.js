import { createTransport } from 'nodemailer'

const sendEmail = async ({ to, subject, text }) => {
    const transporter = createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD 
        },
    })
    await transporter.sendMail({ from: process.env.SMTP_MAIL, to, text, subject })
}

export default sendEmail