'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sensors_data', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING(36),
        unique: 'unique_sensor_date_data'
      },
      time: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: 'unique_sensor_date_data'
      },
      value: {
        allowNull: true,
        type: Sequelize.DECIMAL(16,8),
        unique: false,
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
    await queryInterface.addConstraint('sensors_data', ['sensorId'], {
      type: 'FOREIGN KEY',
      name: 'related_sensorId_fkey',
      references: {
        table: 'sensors',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('sensors_data', ['sensorId', 'time'], {
      type: 'unique',
      name: 'sensors_unique_sensor_id_time_data'
    })

    // await Sequelize.db.query(`SELECT create_hypertable('sensors_data', 'time');`)


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('sensors_data', 'sensors_unique_sensor_id_time_data')
    await queryInterface.dropTable('sensors_data');
  }
};
