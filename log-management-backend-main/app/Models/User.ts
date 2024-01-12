import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, computed } from '@ioc:Adonis/Lucid/Orm'
import roles from 'App/CustomEnties'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public password: string
  @column()
  public isPasswordReseted: boolean

  @column()
  public firstName: string
  @column()
  public lastName: string
  @column()
  public email: string
  @column()
  public phone: string
  @column()
  public roleID: number
  @column()
  public role: string
  @column()
  public dob: DateTime
  @column()
  public photoURL: any
  @column()
  public otherURLs: any
  @column()
  public address1: any
  @column()
  public address2: any
  @column()
  public state: string
  @column()
  public city: string
  @column()
  public zipCode: number
  @column()
  public country: string
  @column()
  public meta: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @beforeSave()
  public static setRole(user: User) {
    if (!user.role) {
      user.role = roles[user.roleID]
    }
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
