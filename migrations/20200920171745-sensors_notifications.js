'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensors_notifications', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING(36),
      },
      notificationStatus: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('sensors_notifications', ['sensorId'], {
      type: 'FOREIGN KEY',
      name: 'related_sensorId_fkey',
      references: {
        table: 'sensors',
        field: 'id'
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sensors_notifications');
  }
};
