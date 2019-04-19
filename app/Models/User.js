'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  // O padrão de primarykey é o id, este código é necessário para alterar o return de primary key
  static get primaryKey () {
    return 'cpf'
  }

  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  birds() {
    return this.hasMany('App/Models/Bird')
  }
}

module.exports = User
