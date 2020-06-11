import {
  createSensorThreshold as createThreshold,
  findOneSensorThreshold,
  findSensor,
} from '../services/database';
import { CreateSensorThreshold } from './interfaces';

/**
 * [create description]
 * @param  req [description]
 * @param  res [description]
 * @return     [description]
 */
export async function create (req, res) {
  try {
    if (await findSensor(req.params.id) === null) {
      return res.sendStatus(404);
    }
    if (await findOneSensorThreshold(req.params.id) !== null) {
      return res.sendStatus(409);
    }
    const thresholdBody: CreateSensorThreshold = <CreateSensorThreshold> req.body;

    await createThreshold(req.params.id, thresholdBody.threshold);

    return res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}
