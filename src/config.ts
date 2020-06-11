/**
 * @file this file should contain all the configuration used across the service
 */

import * as assert from 'assert';
import * as dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT: number = Number(process.env.SERVER_PORT);
export const DB_NAME: string = <string> process.env.DB_NAME;
export const DB_HOST: string = <string> process.env.DB_HOST;
export const DB_PASSWORD: string = <string> process.env.DB_PASSWORD;
export const DB_PORT: number = Number(process.env.DB_PORT);
export const DB_USERNAME: string = <string> process.env.DB_USERNAME;
export const SENDGRID_API_KEY: string = <string> process.env.SENDGRID_API_KEY;
assert(!isNaN(SERVER_PORT) && SERVER_PORT > 0,
  'SERVER_PORT env var must be a valid port number');
