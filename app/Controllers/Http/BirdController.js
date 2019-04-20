'use strict'

const Bird = use('App/Models/Bird')
const User = use('App/Models/User')

class BirdController {
  async index () {
    // const birds = await Bird.all()
    const birds = Bird.query().with('images').fetch()
    return birds
  }

  async store ({ auth, request }) {
    const { cpf } = auth.user
    const data = request.only([
      'anilhaCode',
      'name',
      'category_id',
      'birthDate',
      'gender'
    ])
    const bird = await Bird.create({ ...data, user_cpf :cpf })
    return bird
  }

  async show ({ params }) {
    const bird = await Bird.findOrFail(params.id)
    await bird.load('images')
    return bird
  }

  async update ({ params, request, response }) {
    const bird = await Bird.findOrFail(params.id)

    const data = request.only([
      'anilhaCode',
      'name',
      'category_id',
      'birthDate',
      'gender',
      'user_cpf'
    ])

    const user = await User.find(data.user_cpf)
    if (!user) {
      return response.send("Usuário não cadastrado.")
    }

    bird.merge(data)

    await bird.save()

    return bird
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
