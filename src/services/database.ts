import * as moment from 'moment';
import * as SequelizeStatic from 'sequelize';
import { Customer } from '../models/customers';
import { CustomerSensor } from '../models/customers_sensors';
import { Sensor } from '../models/sensors';
import { SensorData } from '../models/sensors_data';
import { SensorNotification } from '../models/sensors_notifications';
import { SensorThreshold } from '../models/sensors_thresholds';

const Op = SequelizeStatic.Op;

/**
 * [createSensorData description]
 * @param  sensorData [description]
 * @return            [description]
 */
export function createSensorData (sensorData): SequelizeStatic.Promise<any> {
  return SensorData.create(sensorData);
}

/**
 * [findOneSensorData description]
 * @param  sensorId [description]
 * @param  time     [description]
 * @return          [description]
 */
export function findOneSensorData (sensorId: string, time: number): SequelizeStatic.Promise<any> {
  return SensorData.findOne({
    where: {
      sensorId: sensorId,
      time: time,
    },
  });
}

/**
 * [findSensorData description]
 * @param  whereFilter [description]
 * @return             [description]
 */
export function findSensorData (sensorId, since, until): SequelizeStatic.Promise<any> {
  return SensorData.findAll({
    where: {
      sensorId: sensorId,
      time: {
        [Op.gte]: since,
        [Op.lte]: until,
      },
    },
  });
}

/**
 * [findOneSensorThreshold description]
 * @param  sensorId [description]
 * @return          [description]
 */
export function findOneSensorThreshold (sensorId: string): SequelizeStatic.Promise<any> {
  return SensorThreshold.findOne({
    where: {
      sensorId: sensorId,
    },
  });
}

/**
 * [findOneSensorThreshold description]
 * @param  sensorId [description]
 * @return          [description]
 */
export function createSensorThreshold (sensorId: string, threshold: number): SequelizeStatic.Promise<any> {
  return SensorThreshold.create({
    sensorId: sensorId,
    threshold: threshold,
  });
}

/**
 * [findSensor description]
 * @param  id [description]
 * @return    [description]
 */
export function findSensor (id: string): SequelizeStatic.Promise<any> {
  return Sensor.findOne({
    where: {
      id: id,
    },
  });
}

/**
 * [getLastNotificationSent description]
 * @param  sensorId [description]
 * @return          [description]
 */
export function getLastNotificationSent (sensorId: string): SequelizeStatic.Promise<any> {
  const last10minutes = moment.utc().subtract(10, 'minutes').toISOString();

  return SensorNotification.findOne({
    where: {
      createdAt: {
        [Op.gte]: last10minutes,
      },
      sensorId: sensorId,
    },
  });
}

/**
 * [createSensorNotification description]
 * @param  sensorId [description]
 * @return          [description]
 */
export function createSensorNotification (sensorId): SequelizeStatic.Promise<any> {
  return SensorNotification.create({
    createdAt: moment.utc().toISOString(),
    notificationStatus: 'sent',
    sensorId: sensorId,
  });
}

/**
 * [getCustomerForSensor description]
 * @param  sensorId [description]
 * @return          [description]
 */
export function getCustomerForSensor (sensorId): SequelizeStatic.Promise<any> {
  return CustomerSensor.findOne({
    include: [
      {
        as: 'customer',
        model: Customer,
      },
    ],
    where: {
      sensorId: sensorId,
    },
  });

}
