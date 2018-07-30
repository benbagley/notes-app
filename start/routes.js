'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')
  .as('home')

Route
  .group(() => {
    Route.resource('notes', 'NoteController')
  })
  .middleware(['auth'])

Route.get('/auth/register', 'Auth/RegisterController.index')
  .as('auth.register')
  .middleware(['guest'])

Route.post('/auth/register', 'Auth/RegisterController.register')
  .as('auth.register')
  .middleware(['guest'])

Route.get('/auth/login', 'Auth/LoginController.index')
  .as('auth.login')
  .middleware(['guest'])

Route.post('/auth/login', 'Auth/LoginController.login')
  .as('auth.login')
  .middleware(['guest'])

Route.post('/auth/logout', 'Auth/LogoutController.logout')
  .as('auth.logout')
  .middleware(['auth'])
