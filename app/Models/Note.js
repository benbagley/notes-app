'use strict'

const Model = use('Model')

class Note extends Model {
  static boot () {
    super.boot()
    this.addTrait('Slugify')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Note
