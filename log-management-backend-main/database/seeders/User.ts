import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'himanshu.2922t@gmail.com',
        password: 'Admin#123',
        firstName: 'Himanshu',
        lastName: 'Rathore',
        phone: '7073001938',
        roleID: 1,
      },
      {
        email: 'support@codefusion.com',
        password: 'Admin#123',
        firstName: 'Test',
        lastName: 'Admin',
        phone: '9800734333',
        roleID: 1,
      },
      {
        email: 'test@codefusion.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Technician',
        phone: '9999977777',
        roleID: 2,
      },
      {
        email: 'test@client.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Client',
        phone: '9900077770',
        roleID: 3,
      },
    ])
  }
}
