'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bird extends Model {
    static get primaryKey () {
        return 'anilhaCode'
      }

    user() {
        return this.belongsTo('App/Models/User')
    }

    images() {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Bird
