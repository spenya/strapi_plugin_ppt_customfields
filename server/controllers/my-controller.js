'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ppt-customfields')
      .service('myService')
      .getWelcomeMessage();
  },
});
