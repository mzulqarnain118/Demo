
const nodemailer = require('nodemailer');
const MailInfo = require('./MailInfo');

const sendMail = (to, subject, text) => {

    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MailInfo.email,
                pass: MailInfo.password
            }
        });

        const mailOptions = {
            from: MailInfo.email,
            to: to,
            subject: subject,
            html: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                resolve({ status: false, error: error });
            } else {
                resolve({ status: true, info: info });
            }
        });

    });

}

module.exports.sendMail = sendMail;
