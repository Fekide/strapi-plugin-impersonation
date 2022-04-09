'use strict'

module.exports = ({ strapi }) => ({
  async impersonate(user) {
    const baseUrl = await await strapi
      .store({
        type: 'plugin',
        name: 'impersonation',
      })
      .get({ key: 'baseURL' })
    if (!baseUrl) {
      throw new Error('errors.not-initialized')
    }
    const token = await strapi
      .service('plugin::users-permissions.jwt')
      .issue({ id: user.id })
    return {
      impersonateURL: `${baseUrl}${token}`,
    }
  },
})
