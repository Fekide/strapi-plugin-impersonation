'use strict'

module.exports = {
  async index(ctx) {
    const { user } = ctx.request.body

    if (!user) {
      ctx.badRequest('user missing')
      return
    }
    try {
      ctx.body = await strapi
        .plugin('impersonation')
        .service('impersonate')
        .impersonate(user)
    } catch (error) {
      if (error.message) {
        ctx.badRequest(error.message)
      } else {
        ctx.internalServerError()
      }
    }
  },
}
