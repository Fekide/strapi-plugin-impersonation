module.exports = [
  {
    method: 'POST',
    path: '/impersonate',
    handler: 'impersonate.index',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::impersonation.impersonate'] },
        },
      ],
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'settings.get',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::impersonation.settings'] },
        },
      ],
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'settings.set',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::impersonation.settings'] },
        },
      ],
    },
  },
]
