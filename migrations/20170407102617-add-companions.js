'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Apps',
      'iosCompanion',
      Sequelize.STRING);
    queryInterface.addColumn(
      'Apps',
      'androidCompanion',
      Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Apps',
      'iosCompanion');
    queryInterface.removeColumn(
      'Apps',
      'androidCompanion');
  }
};
