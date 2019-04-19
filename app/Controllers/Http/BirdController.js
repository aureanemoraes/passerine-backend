'use strict'

const Bird = use('App/Models/Bird')

class BirdController {
  async index () {
    const birds = Bird.all()
    return birds
  }

  async store ({ request, response }) {
  }

  async show ({ params }) {
    const bird = await Bird.findOrFail(params.id)
    await bird.load('images')
    return bird
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, auth, response }) {
    const bird = await Bird.findOrFail(params.id)
    if(bird.user_cpf !== auth.user.cpf) {
      return response.status(401).send(
        { error: 'Não autorizado' }
      )
    }
    await bird.delete()
  }
}

module.exports = BirdController
