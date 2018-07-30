'use strict'

const Model = use('Model')

class Note extends Model {
  static boot () {
    super.boot()
    this.addTrait('Slugify')
  }

  user () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = Note
