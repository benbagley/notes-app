'use strict'

const { validateAll } = use('Validator')
const Note = use('App/Models/Dashboard/Note')

class NoteController {
  // dashboard/notes
  async index ({ view, auth }) {
    let notes = await Note.all()

    return view.render('dashboard.notes.index', {
      notes: notes.toJSON()
    })
  }

  // dashboard/notes/:id
  async show ({ view, params }) {
    let note = await Note.findBy('id', params.id)

    return view.render('dashboard.notes.show', {
      note: note.toJSON()
    })
  }

  // dashboard/notes/create
  create ({ view }) {
    return view.render('dashboard.notes.create')
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

    // dashboard/notes/:id/edit
    async edit ({view, params }) {
      const note = await Note.findBy('id', params.id)

      return view.render('dashboard.notes.edit', {
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
