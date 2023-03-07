'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'multiboolean',
    plugin: 'ppt-customfields',
    type: 'json',
  });
};
