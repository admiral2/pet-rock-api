'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Apps',
      'developerId',
      Sequelize.UUID);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Apps',
      'developerId');
  }
};
