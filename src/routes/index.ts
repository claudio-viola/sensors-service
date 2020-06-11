// tslint:disable:no-duplicate-string
import * as express from 'express';
import * as sensorsDataController from '../controllers/sensors_data';
import * as sensorsThresholdController from '../controllers/sensors_threshold';

import { paramsValidator, schemaValidator } from '../middleware/validation';

const router: express.Router = express.Router();
router.put('/data',
  schemaValidator('/sensors/create'), sensorsDataController.create);
router.get('/data',
    paramsValidator('/sensors/retrieve'), sensorsDataController.getAll);

router.post('/sensors/:id/threshold',
    schemaValidator('/sensors/threshold'), sensorsThresholdController.create);

export {
    router,
};
