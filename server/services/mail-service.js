const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(email, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Activation account on' + process.env.API_URL,
      html: `<div>
      <h1>For activation your account follow the link</h1>
      <a href="${link}">${link}</a></div> `,
    });
  }
}

module.exports = new MailService();
