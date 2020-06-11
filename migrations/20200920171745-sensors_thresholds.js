'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensors_thresholds', {
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING(36),
      },
      threshold: {
        allowNull: false,
        type: Sequelize.DECIMAL(16,8),
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
    await queryInterface.addConstraint('sensors_thresholds', ['sensorId'], {
      type: 'FOREIGN KEY',
      name: 'related_sensorId_fkey',
      references: {
        table: 'sensors',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('sensors_thresholds', ['sensorId', 'threshold'], {
      type: 'unique',
      name: 'sensors_unique_sensor_id_threshold'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('sensors_thresholds', 'sensors_unique_sensor_id_threshold')
    await queryInterface.dropTable('sensors_thresholds');
  }
};
