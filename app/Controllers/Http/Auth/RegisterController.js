'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')

class RegisterController {
  index ({ view }) {
    return view.render('auth.register')
  }

 async register ({ request, response, session, auth }) {
    const { email, fullName, password } = request.all()

    const rules = {
      email: 'required|email|unique:users,email',
      fullName: 'required',
      password: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashAll()
      
      return response.redirect('back')
    }

    const user = new User()

    user.fill({
      email,
      fullName,
      password
    })

    await user.save()

    await auth.attempt(email, password)

    return response.route('home')
  }
}

module.exports = RegisterController
