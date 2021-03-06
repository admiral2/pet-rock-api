'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Apps',
      'developerId', {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'developerId',
        references: {
          model: 'Developers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict'
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Apps',
      'developerId');
  }
};
