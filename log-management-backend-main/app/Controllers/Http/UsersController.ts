import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import { generateOTP, generateOTPExpiration, sendEmail, updateAll } from 'App/Utils'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UsersController {
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      let { email, password } = request.body()
      let user: any = await User.findBy('email', email)
      const token = await auth.use('api').attempt(email, password, { expiresIn: '10 mins' })
      user = user.toJSON()
      user.auth = token
      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.unauthorized({ msg: 'Invalid credentials' })
    }
  }

  public async doesUserExist({ request, response }: HttpContextContract) {
    try {
      let { email } = request.body()
      let user: any = await User.findBy('email', email)
      if (user) {
        return response.status(200).json({ userExists: true, msg: `${email} is registered.` })
      }
      return response.status(404).json({ userExists: false, msg: `${email} is not registered.` })
    } catch (error) {
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async sendOTP({ request, response }: HttpContextContract) {
    try {
      let reqData = request.body()
      let user: any = await User.firstOrCreate({ email: reqData.email }, reqData)

      if (user) {
        const otp = await generateOTP()

        const mins = 10
        const otpExpiration = await generateOTPExpiration(mins)

        user.meta = {
          otp: otp,
          otpExpiration: otpExpiration,
          isVerified: false,
        }
        user.meta = JSON.stringify(user.meta)

        await user.save()

        // await sendEmail({
        //   customer: {
        //     name: user.name,
        //     email: user.email,
        //   },
        //   subject: 'One Time Password to verify / update profile',
        //   body: `${otp} is the one time password (OTP) to verify / update your profile. Don't share OTP with anyone. Please enter the OTP to proceed. Note: otp will expire in ${mins} Minutes`,
        // })

        // await Mail.send((message) => {
        //   message
        //     .from('Codefusion Communications Inc. <no-reply@codefusion.com>')
        //     .to(reqData.email)
        //     .subject('One Time Password to verify profile')
        //     .html('Hiii')
        // })
        await sendEmail(
          reqData.email,
          'One Time Password to verify profile',
          user.name,
          `${otp} is the one time password (OTP) to verify / update your profile. Don't share OTP with anyone. Please enter the OTP to proceed. Note: otp will expire in ${mins} Minutes`
        )

        return response.status(200).json({ msg: 'OTP sent successfully' })
      }
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async verifyOTP({ request, response, auth }: HttpContextContract) {
    try {
      let reqData = request.body()
      let user: any = await User.findBy('email', reqData.email)

      if (user) {
        const otp = user.meta.otp
        const otpExpiration = new Date(user.meta.otpExpiration)
        const currentTime = new Date()

        if (otp === reqData.otp && otpExpiration > currentTime && !user.meta.isVerified) {
          user.meta.isVerified = true
          user.meta = JSON.stringify(user.meta)
          await user.save()
          const token = await auth.use('api').generate(user, { expiresIn: '10 mins' })
          user = user.toJSON()
          user.auth = token
          return response.status(200).json(user)
        }
        return response.status(401).json({ msg: 'Invalid or expired OTP' })
      }
      return response.badRequest({ msg: `${reqData.email} is not registered.` })
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async create({ request, response, auth }: HttpContextContract) {
    try {
      const userRole: any = auth?.user?.role
      if (!['admin', 'technician'].includes(userRole)) {
        return response.forbidden({ msg: 'Not authorized' })
      }
      let reqData = request.body()
      let user: any = await User.findBy('email', reqData.email)
      if (user)
        return response.status(422).json({ msg: 'User is already registered with this email.' })

      user = await User.create(reqData)
      return response.status(201).json(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async getUser({ params, response, auth }: HttpContextContract) {
    try {
      const userRole: any = auth?.user?.role
      if (!['admin', 'technician'].includes(userRole)) {
        return response.forbidden({ msg: 'Not authorized' })
      }

      let user = await User.query()
        .where('id', params?.id)
        .firstOrFail()
      // user = JSON.parse(JSON.stringify(user))

      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async update({ request, response, auth, params }: HttpContextContract) {
    try {
      const userRole: any = auth?.user?.role
      if (!['admin', 'technician'].includes(userRole)) {
        return response.forbidden({ msg: 'Not authorized' })
      }

      let reqData = request.body()

      let user: any = await User.query()
        .where('id', params?.id)
        .firstOrFail()

      if (!user) {
        return response.status(404).json({ msg: `User not found with id: ${params.id}}.` })
      }
      user = updateAll(user, reqData)
      await user.save()

      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async delete({ params, response, auth }: HttpContextContract) {
    try {
      const userRole: any = auth?.user?.role
      if (!['admin', 'technician'].includes(userRole)) {
        return response.forbidden({ msg: 'Not authorized' })
      }
      let user: any = await User.find(params?.id)
      await user.delete()
      return response.status(200).json({ msg: 'Deleted Successfully' })
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async list({ response, auth }: HttpContextContract) {
    try {
      const userRole: any = auth?.user?.role
      if (!['admin', 'technician'].includes(userRole)) {
        return response.forbidden({ msg: 'Not authorized' })
      }
      let user = await User.all()
      response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async show({ response, auth }: HttpContextContract) {
    try {
      let user = await User.find(auth?.user?.id)
      response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.badRequest({ msg: 'Invalid input' })
    }
  }

  public async updatePassword({ request, response, auth }: HttpContextContract) {
    try {
      const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

      const user: any = auth.user
      const userPassword = user.password
      const isPasswordValid = await Hash.verify(currentPassword, userPassword)
      if (!isPasswordValid) {
        return response.status(400).json({ msg: 'Current password is incorrect.' })
      }

      user.password = await Hash.make(newPassword)
      await user.save()

      return response.status(200).json({ msg: 'Password updated successfully.' })
    } catch (error) {
      console.error('Error updating password:', error)
      return response.status(500).json({ msg: 'An error occurred while updating password.' })
    }
  }
}
