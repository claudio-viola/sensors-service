// tslint:disable:arrow-return-shorthand
// tslint:disable:max-func-body-length
// tslint:disable:no-big-function
// tslint:disable:no-duplicate-string
// tslint:disable:no-unused
// tslint:disable:no-identical-functions
// tslint:disable:max-line-length
import { Customer } from '../../src/models/customers';
import { CustomerSensor } from '../../src/models/customers_sensors';
import { Sensor } from '../../src/models/sensors';
import { SensorData } from '../../src/models/sensors_data';
import { SensorThreshold } from '../../src/models/sensors_thresholds';

import * as emailNotification from '../../src/services/email_notification';

import {
  expect,
  request,
  SANDBOX,
  sinon,
} from './setup';

describe('Sensors Data Tests', (): void => {

  before(async () => {
    await Customer.create({
      email: 'somecustomer@email.com',
      id: 'c0b025e7-d4ba-471f-999b-0dd930e55999',
      name: 'Test Customer',
      phone_number: '+4412345678',
    });
    await Sensor.create({
      id: 'f0b025e7-d4ba-471f-999b-0dd930e55887',
      location: 'CheeseGrater',
      name: 'Temperature Sensor Left Corner',
      type: 'Temperature',
    });
    await Sensor.create({
      id: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
      location: 'CheeseGrater',
      name: 'Temperature Sensor Right Corner',
      type: 'Temperature',
    });
    await CustomerSensor.create({
      customerId: 'c0b025e7-d4ba-471f-999b-0dd930e55999',
      id: 1,
      sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
    });

    await SensorData.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });
    await SensorThreshold.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });

  });

  after(async () => {
    await Sensor.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });
    await Customer.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });
    await SensorData.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });

  });
  describe('PUT /data', (): void => {

    it('should return 400 if the packet does not contain `sensorId`', async () => {
      return request
       .put('/data')
       .send({
         time: 123123123,
         value: 2.3,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 400 BAD REQUEST if the packet does not contain `time`', async () => {
      return request
       .put('/data')
       .send({
         sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
         value: 2.45,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it(`should return 409 CONFLICT if the packet is a duplicate  -
      '(sensorId, time)' pairings should be unique;`, async () => {
      await SensorData.create({
        sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
        time: 123456,
        value: 2.45,
      });

      return request
       .put('/data')
       .send({
         sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
         time: 123456,
         value: 2.45,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(409);
       });
    });

    it(`should return 204 No Content if the packet structure is valid, and the packet was successfully
      stored in the persistent storage;`, async () => {
      return request
       .put('/data')
       .send({
         sensorId: 'f0b025e7-d4ba-471f-999b-0dd930e55887',
         time: 123456789,
         value: 2.45,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(204);
         const sensorDataInstance = await SensorData.findOne({
           where: {
             sensorId: 'f0b025e7-d4ba-471f-999b-0dd930e55887',
             time: 123456789,
           },
         });
         // tslint:disable-next-line
         expect(sensorDataInstance).to.not.be.null;
       });
    });

  });

  describe('GET /data', (): void => {

    it('should return 400 if filtering params are not provided', async () => {
      return request
       .get('/data')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 200 and return filtered sensor data', async () => {
      return request
       .get('/data?sensorId=f0b025e7-d4ba-471f-999b-0dd930e55887&since=123456&until=123456789')
       .then(async (res) => {
         expect(res.body).excluding([
           'createdAt',
           'updatedAt',
         ])
         .to.deep.members([
           {
             id: 2,
             sensorId: 'f0b025e7-d4ba-471f-999b-0dd930e55887',
             time: '1970-01-02T10:17:36.789Z',
             value: '2.45000000',
           },
         ]);
       });
    });
  });

  describe('POST /sensors/:id/threshold', (): void => {

    it('should return 400 if the packet does not contain `threshold`', async () => {
      return request
       .post('/sensors/f0b025e7-d4ba-471f-999b-0dd930e55887/threshold')
       .send({
         value: 2.3,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 404 if the sensor does not exist', async () => {
      return request
       .post('/sensors/f0b025e7-d4ba-471f-999b-fake/threshold')
       .send({
         threshold: 2.3,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(404);
       });
    });
    it(`should return 204 CREATED if the threshold is valid and threshold record is created`, async () => {
      return request
       .post('/sensors/c0b025e7-d4ba-471f-999b-0dd930e55887/threshold')
       .send({
         threshold: 2.3,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(204);
       });
    });

    it(`should return 409 CONFLICT if the threshold already exist`, async () => {
      return request
       .post('/sensors/c0b025e7-d4ba-471f-999b-0dd930e55887/threshold')
       .send({
         threshold: 2.3,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(409);
       });
    });
  });

  describe('Threshold alerts', (): void => {
    it(`should return 204 No Content and alert customer via email if threshold is exceeded`, async () => {
      const sendEmailStub = SANDBOX.stub(emailNotification, 'sendEmail');

      return request
       .put('/data')
       .send({
         sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
         time: 123456790,
         value: 2.9,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(sendEmailStub.callCount).to.equal(1);
         expect(sendEmailStub.lastCall.args[0]).to.equal('somecustomer@email.com');
         expect(sendEmailStub.lastCall.args[1]).to.equal('Alert for c0b025e7-d4ba-471f-999b-0dd930e55887, threshold limit exceeded');

         // add more expectations
       });
    });

    it(`should return 204 No Content and NOT alert the customer
      via email if threshold was exceeded
      but a notification was already sent within last 10 minutes`, async () => {

      const sendEmailStub = SANDBOX.stub(emailNotification, 'sendEmail');

      return request
       .put('/data')
       .send({
         sensorId: 'c0b025e7-d4ba-471f-999b-0dd930e55887',
         time: 123456792,
         value: 2.9,
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(sendEmailStub.callCount).to.equal(0);
         // add more expectations
       });
    });
  });

});
