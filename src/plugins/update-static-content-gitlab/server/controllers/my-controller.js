'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('update-static-content-gitlab')
      .service('myService')
      .getWelcomeMessage();
  },
});
