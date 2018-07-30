'use strict'

const Model = use('Model')

class Note extends Model {
  user () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = Note
