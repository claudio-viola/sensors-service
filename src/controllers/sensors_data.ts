import {
  createSensorData,
  createSensorNotification,
  findOneSensorData,
  findOneSensorThreshold,
  findSensorData,
  getCustomerForSensor,
  getLastNotificationSent,
} from '../services/database';
import {
  sendEmail,
} from '../services/email_notification';
import { CreateSensorDataBody, GetSensorDataParams } from './interfaces';

/**
 * [create description]
 * @param  req [description]
 * @param  res [description]
 * @return     [description]
 */
export async function create (req, res) {
  try {
    const sensorData: CreateSensorDataBody = <CreateSensorDataBody> req.body;
    if (await isDuplicate(sensorData.sensorId, sensorData.time) === true) {
      return res.sendStatus(409);
    }
    await createSensorData(sensorData);
    const sensorThresholdInstance = await findOneSensorThreshold(sensorData.sensorId);
    if (sensorThresholdInstance !== null) {
      const sensorThreshold = sensorThresholdInstance.get();
      // @ts-ignore add sequelize interfaces;
      if (sensorThreshold.threshold < sensorData.value) {
        const [notificationSent, customer] = await Promise.all([
          getLastNotificationSent(sensorData.sensorId),
          getCustomerForSensor(sensorData.sensorId),
        ]);
        if (notificationSent === null && customer !== null) {
          // @ts-ignore add sequelize interfaces;
          const customerEmail = customer.get().customer.email;
          const text = `Alert for ${sensorData.sensorId}, threshold limit exceeded`;
          await sendEmail(customerEmail, text);
          await createSensorNotification(sensorData.sensorId);
        }
      }
    }
    res.sendStatus(204);

    return;
  } catch (err) {
    res.sendStatus(500);
  }
}

/**
 * [isDuplicate description]
 * @param  sensorId [description]
 * @param  time     [description]
 * @return          [description]
 */
async function isDuplicate (sensorId, time) {
  const record = await findOneSensorData(sensorId, time);
  if (record === null) {
    return false;
  }

  return true;
}

/**
 * [getAll description]
 * @param  req [description]
 * @param  res [description]
 * @return     [description]
 */
export async function getAll (req, res) {
  try {
    const params: GetSensorDataParams = <GetSensorDataParams> req.query;
    const sensorsData = await findSensorData(params.sensorId, params.since, params.until);

    return res.send(sensorsData.map(sensorData => sensorData.get()));
  } catch (err) {
    res.sendStatus(500);
  }
}
