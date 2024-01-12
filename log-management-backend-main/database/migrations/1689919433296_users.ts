import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('phone').unique()
      table.string('password')
      table.boolean('is_password_reseted')
      table.integer('role_id').notNullable()
      table.string('role')
      table.date('dob')
      table.text('photo_url')
      table.json('other_urls')
      table.text('address1')
      table.text('address2')
      table.string('city')
      table.integer('zip_code')
      table.string('state')
      table.string('country')
      table.json('meta')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
