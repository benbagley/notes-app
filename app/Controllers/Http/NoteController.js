'use strict'

const { validateAll } = use('Validator')
const Note = use('App/Models/Note')

class NoteController {
  // notes
  async index ({ view, auth }) {
    let notes = await Note.all()

    return view.render('notes.index', {
      notes: notes.toJSON()
    })
  }

  // notes/:id
  async show ({ view, params }) {
    let note = await Note.findBy('id', params.id)

    return view.render('notes.show', {
      note: note.toJSON()
    })
  }

  // notes/create
  create ({ view }) {
    return view.render('notes.create')
  }

  // store and save note
  async store ({ request, session, response, auth }) {
    const { title, body } = request.all()

    const rules = {
      title: 'required',
      body: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashAll()

        return response.redirect('back')
      }

      const note = new Note()

      note.fill({
        title,
        body,
        user_id: auth.user.id
      })

      await note.save()

      return response.route('notes.index')
    }

    // notes/:id/edit
    async edit ({view, params }) {
      const note = await Note.findBy('id', params.id)

      return view.render('notes.edit', {
        note: note.toJSON()
      })
    }

    async update ({ params, request, session, response }) {
      const data = request.only(['title', 'body'])

      const validation = await validateAll(data, {
        title: 'required',
        body: 'required'
      })

      if (validation.fails()) {
        session.withErrors(validation.messages())
          .flashAll()

        return response.redirect('back')
      }

      const note = await Note.findOrFail(params.id)
      note.merge(data)
      await note.save()

      return response.route('notes.index')
    }

    async destroy ({ params, response }) {
      const note = await Note.findOrFail(params.id)
      await note.delete()

      return response.route('notes.index')
    }
}

module.exports = NoteController
