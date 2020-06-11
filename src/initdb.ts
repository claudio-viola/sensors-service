import { Sequelize } from 'sequelize';
import * as config from './config';
import { Customer } from './models/customers';
import { CustomerSensor } from './models/customers_sensors';
import { Sensor } from './models/sensors';
import { SensorData } from './models/sensors_data';
import { SensorNotification } from './models/sensors_notifications';
import { SensorThreshold } from './models/sensors_thresholds';

let sequelize: Sequelize;

/**
 * Initialize the database, getting a connection
 */

export async function initDb () {
  sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
    },
  );

  await sequelize.authenticate();

  const models = [
    Sensor,
    Customer,
    CustomerSensor,
    SensorThreshold,
    SensorData,
    SensorNotification,
  ];
  models.forEach((model) => {
    if (model.initialize) {
      model.initialize(sequelize);
    }
  });
  CustomerSensor.belongsTo(Customer, { as: 'customer', foreignKey: 'customerId' });

}
