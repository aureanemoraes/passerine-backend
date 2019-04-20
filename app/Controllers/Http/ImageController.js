'use strict'
const Image = use('App/Models/Image')
const Bird = use('App/Models/Bird')
const Helpers = use('Helpers')

class ImageController {
    async store ({ params, request }) {
        const bird = await Bird.findOrFail(params.id)

        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })
    
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
          }))
          
        if (!images.movedAll()) {
        return images.errors()
        }

        await Promise.all(
            images
              .movedList()
              .map(image => bird.images().create({ path: image.fileName }))
          )
    }

    async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }
}

module.exports = ImageController
