'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
          'Releases',
          'url',
          Sequelize.STRING);
    queryInterface.addColumn(
          'Releases',
          'sha256',
          Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Releases',
      'url');
    queryInterface.removeColumn(
      'Releases',
      'sha256');
  }
};
