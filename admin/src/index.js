import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import permissions from './permissions'
import ImpersonateButton from './components/ImpersonateButton'

const name = pluginPkg.strapi.name

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    })
  },

  bootstrap(app) {
    app.addSettingsLink(
      // Add settings to users-permissions since it is connected to the users there
      'users-permissions',
      {
        intlLabel: {
          id: 'impersonation.settings-link',
          defaultMessage: 'Impersonation Plugin',
        },
        id: 'impersonation.settings',
        to: '/settings/impersonation',
        Component: async () => {
          const component = await import(
            /* webpackChunkName: "impersonation-settings" */ './pages/Settings'
          )

          return component
        },
        permissions: permissions.settings,
      }
    )
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'impersonate.button ',
      Component: ImpersonateButton,
    })
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      })
    )

    return Promise.resolve(importedTrads)
  },
}
