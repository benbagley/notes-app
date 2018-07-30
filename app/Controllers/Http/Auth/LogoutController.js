'use strict'

class LogoutController {
  async logout ({ response, auth }) {
    await auth.logout()

    return response.redirect('/')
  }
}

module.exports = LogoutController
