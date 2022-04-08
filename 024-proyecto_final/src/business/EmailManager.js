import { createTransport } from 'nodemailer'

import { config } from '../config/config.js'

const transporterConfig = {
    auth: {
        user: config.EMAIL_ACCOUNT_USER,
        pass: config.EMAIL_ACCOUNT_PASS,
    }
}

if (config.EMAIL_SMTP_HOST == 'gmail') {
    transporterConfig.service = config.EMAIL_SMTP_HOST
} else {
    transporterConfig.host = config.EMAIL_SMTP_HOST
    transporterConfig.port = config.EMAIL_SMTP_PORT
}

class EmailManager {
    constructor() {
        this.transporter = createTransport(transporterConfig)
    }

    createMailDataText(to, subject, text) {
        return {
            from: 'Servidor Node.js',
            to: to,
            subject: subject,
            text: text
        }
    }

    createMailDataHTML(to, subject, html) {
        return {
            from: 'Servidor Node.js',
            to: to,
            subject: subject,
            text: html
        }
    }
    
    async sendMail(mailData) {
        try {
            await this.transporter.sendMail(mailData)
        } catch (error) {
            throw new Error(`Error al enviar mail:\n${error}`)
        }
    }
}

export default EmailManager
