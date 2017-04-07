'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Apps',
      'screenshotHardware',
      Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Apps',
      'screenshotHardware');
  }
};
