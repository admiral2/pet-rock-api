'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Releases', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      version: {
        type: Sequelize.STRING
      },
      publishDate: {
        type: Sequelize.DATE
      },
      releaseNotes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      appId: {
        allowNull: false,
        type: Sequelize.UUID
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Releases');
  }
};