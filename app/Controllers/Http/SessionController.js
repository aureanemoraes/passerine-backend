'use strict'

class SessionController {
  async create ( {request, auth} ) {
    const { cpf, password } = request.all()

    const token = await auth.attempt(cpf, password)

    return token
  }
}

module.exports = SessionController
