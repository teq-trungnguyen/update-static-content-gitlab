const pluginId = require("../../utils/pluginId");
module.exports = [
  {
    method: "GET",
    path: "/config",
    handler: "config.getPluginConfig",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: [`plugin::${pluginId}.settings`],
          },
        },
      ],
    },
  },
  {
    method: "GET",
    path: "/gitlab-actions-history",
    handler: "gitlabActions.history",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
  {
    method: "POST",
    path: "/gitlab-actions-trigger",
    handler: "gitlabActions.trigger",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: [`plugin::${pluginId}.trigger`],
          },
        },
        `plugin::${pluginId}.validatePluginConfig`,
      ],
    },
  },
];
