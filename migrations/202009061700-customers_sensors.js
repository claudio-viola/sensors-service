'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers_sensors', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.STRING(36),
        unique: true,
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING(36),
        unique: true,
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
    await queryInterface.addConstraint('customers_sensors', ['customerId'], {
      type: 'FOREIGN KEY',
      name: 'related_customerId_fkey',
      references: {
        table: 'customers',
        field: 'id'
      }
    })


    await queryInterface.addConstraint('customers_sensors', ['sensorId'], {
      type: 'FOREIGN KEY',
      name: 'related_sensorId_fkey',
      references: {
        table: 'sensors',
        field: 'id'
      }
    })

    await queryInterface.addConstraint('customers_sensors', ['sensorId', 'customerId'], {
      type: 'unique',
      name: 'customers_sensors_unique_sensor_id_customer_id'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers_sensors');
  }
};
