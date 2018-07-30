'use strict'

const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.string('title')
      table.text('body')
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NotesSchema
