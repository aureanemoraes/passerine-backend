'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.string('cpf', 11).notNullable().unique()
      table.string('name', 162).notNullable()
      table.string('email', 254).notNullable()
      table.string('password', 60).notNullable()
      table.enu('gender', ['M', 'F'])
      table.date('birthDate')
      table.string('profilePicture')
      table.integer('level').defaultTo(0)
      table.primary(['cpf'])
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
