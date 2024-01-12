import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

export const updateAll = (obj: any, reqObj: any) => {
  try {
    Object.keys(reqObj).map((key) => {
      obj[key] = reqObj[key]
    })
    return obj
  } catch (error) {
    throw error
  }
}

export const generateOTP = async () => {
  const otpLength = 6
  const digits = '0123456789'
  let otp = ''

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length)
    otp += digits[randomIndex]
  }

  return otp
}

export const generateOTPExpiration = async (mins: number) => {
  return new Date(Date.now() + mins * 60 * 1000) //  minutes in expiry
}

export const sendEmail = async (to, subject, name, body) => {
  try {
    await Mail.send((message) => {
      message
        .from('smtp@codefusion.com')
        .to(to)
        .subject(subject)
        .html(
          `<html>\
            <head>\
                <meta charset="UTF-8">\
                <title>Your Email Title</title>\
                <style>\
                body {\
                    font-family: Arial, sans-serif;\
                    font-size: 14px;\
                    line-height: 1.6;\
                    background-color: #f6f6f6;\
                    margin: 0;\
                    padding: 0;\
                }\
                \
                .container {\
                    max-width: 600px;\
                    margin: 0 auto;\
                    padding: 20px;\
                    background-color: #ffffff;\
                }\
                \
                h1 {\
                    color: #333333;\
                    margin: 0 0 20px;\
                    font-size: 24px;\
                }\
                \
                p {\
                    margin: 0 0 20px;\
                }\
                \
                a {\
                    color: #007bff;\
                    text-decoration: underline;\
                }\
                </style>\
            </head>\
            <body>\
                <div class="container">\
                <h1>Codefusion Communication Inc.</h1>\
                <p>Hello ${name}</p>\
                <p>${body}</p>\
                </div>\
            </body>\
          </html>`
        )
    })
    console.log('Email sent successfully! in utils')
  } catch (error) {
    console.log('Error in sending email!', error)
  }
}

export const sendEmailMailjet = async (args: any) => {
  const { customer, subject, body } = args
  const API_KEY = Env.get('MAILJET_API_KEY')
  const SECRET_KEY = Env.get('MAILJET_SECRET_KEY')
  const EMAIL_FROM = 'Codefusion Communications Inc. <no-reply@codefusion.com>' // need to change product mail url
  const EMAIL_SUBJECT = subject
  const EMAIL_TEXT = body
  if (customer.email) {
    try {
      const response = await axios.post(
        'https://api.mailjet.com/v3.1/send',
        {
          Messages: [
            {
              From: { Email: EMAIL_FROM },
              To: [{ Email: customer.email, Name: customer.name }],
              Subject: EMAIL_SUBJECT,
              TextPart: EMAIL_TEXT,
              HTMLPart: `<html>\
                              <head>\
                                  <meta charset="UTF-8">\
                                  <title>Your Email Title</title>\
                                  <style>\
                                  body {\
                                      font-family: Arial, sans-serif;\
                                      font-size: 14px;\
                                      line-height: 1.6;\
                                      background-color: #f6f6f6;\
                                      margin: 0;\
                                      padding: 0;\
                                  }\
                                  \
                                  .container {\
                                      max-width: 600px;\
                                      margin: 0 auto;\
                                      padding: 20px;\
                                      background-color: #ffffff;\
                                  }\
                                  \
                                  h1 {\
                                      color: #333333;\
                                      margin: 0 0 20px;\
                                      font-size: 24px;\
                                  }\
                                  \
                                  p {\
                                      margin: 0 0 20px;\
                                  }\
                                  \
                                  a {\
                                      color: #007bff;\
                                      text-decoration: underline;\
                                  }\
                                  </style>\
                              </head>\
                              <body>\
                                  <div class="container">\
                                  <h1>Codefusion Communication Inc.</h1>\
                                  <p>Hello ${customer.name}</p>\
                                  <p>${body}</p>\
                                  </div>\
                              </body>\
                          </html>`,
            },
          ],
        },
        { auth: { username: API_KEY, password: SECRET_KEY } }
      )
      console.log('Email sent successfully!', response.data)
    } catch (error) {
      console.log('Error in sending email!', error)
    }
  }
}
