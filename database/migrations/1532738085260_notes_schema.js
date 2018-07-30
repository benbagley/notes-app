'use strict'

const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.string('title')
      table.text('body')
      table.integer('user_id').unsigned().index()
      table.timestamps()

      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NotesSchema
