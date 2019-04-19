'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BirdSchema extends Schema {
  up () {
    this.create('birds', (table) => {
      table.string('anilhaCode').notNullable().unique()
      table.string('name').notNullable()
      table.date('birthDate')
      table.enu('gender', ['M', 'F']).notNullable()
      table.string('profilePicture')
      table.integer('category_id').unsigned().references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('user_cpf').unsigned().references('cpf').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.primary(['anilhaCode'])
      table.timestamps()
    })
  }

  down () {
    this.drop('birds')
  }
}

module.exports = BirdSchema
