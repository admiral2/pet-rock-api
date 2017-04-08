'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Apps',
      'source',
      Sequelize.STRING);
    queryInterface.addColumn(
      'Apps',
      'website',
      Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Apps',
      'source');
    queryInterface.removeColumn(
      'Apps',
      'website');
  }
};
