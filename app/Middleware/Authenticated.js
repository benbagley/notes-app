'use strict'

class Authenticated {
  async handle ({ request, auth, response }, next) {
    try {
      await auth.check()
    } catch (error) {
      return response.route('auth.login')
    }

    await next()
  }
}

module.exports = Authenticated
