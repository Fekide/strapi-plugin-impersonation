module.exports = {
  async set(ctx) {
    const { data } = ctx.request.body

    try {
      ctx.body = {
        data: await strapi
          .plugin('impersonation')
          .service('settings')
          .set(data),
      }
    } catch (error) {
      if (error.message) {
        ctx.badRequest(error.message)
      } else {
        ctx.internalServerError()
      }
    }
  },
  async get(ctx) {
    try {
      ctx.body = {
        data: await strapi.plugin('impersonation').service('settings').get(),
      }
    } catch (error) {
      if (error.message) {
        ctx.badRequest(error.message)
      } else {
        ctx.internalServerError()
      }
    }
  },
}
