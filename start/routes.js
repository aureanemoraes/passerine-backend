'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('/birds', 'BirdController')
  .apiOnly()
  .middleware(new Map([
    [
      ['store', 'update', 'destroy'], ['auth']
    ]
    ]))

Route.post('/birds/:id/images', 'ImageController.store')
    .middleware(['auth'])

    Route.get('/images/:path', 'ImageController.show')