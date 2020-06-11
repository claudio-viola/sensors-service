/**
 * Index
 */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as config from './config';
import { registerSchemas } from './controllers/schemas';
import { initDb } from './initdb';
import { router } from './routes';

/**
 * init Runs the app
 */
export async function initServer (): Promise<http.Server> {
  await initDb();
  registerSchemas();
  const app: express.Application = express();
  app.use(bodyParser.json());
  app.use('/', router);

  return app.listen(config.SERVER_PORT);
}
