'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Apps', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.UUID
      },
      hearts: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Apps');
  }
};