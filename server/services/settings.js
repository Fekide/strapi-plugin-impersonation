'use strict'

module.exports = ({ strapi }) => ({
  async get() {
    const baseURL = await strapi
      .store({
        type: 'plugin',
        name: 'impersonation',
      })
      .get({ key: 'baseURL' })
    return {
      baseURL,
    }
  },
  async set({ baseURL }) {
    await strapi
      .store({
        type: 'plugin',
        name: 'impersonation',
      })
      .set({ key: 'baseURL', value: baseURL })
    return {
      baseURL,
    }
  },
})
