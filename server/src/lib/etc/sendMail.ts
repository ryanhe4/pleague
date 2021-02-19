import nodemailer from 'nodemailer'

type EmailParams = {
  to: string | string[];
  subject: string;
  body: string;
  from: string;
};

const sendMail = ({ to, subject, body, from }: EmailParams) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  return new Promise((resolve, reject) => {
    transport.sendMail({ from, to, subject, html: body }, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })

}
export default sendMail
