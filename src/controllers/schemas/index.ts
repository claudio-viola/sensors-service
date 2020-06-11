/**
 * Schema validation
 * can be used by routers etc.
 */

import * as Ajv from 'ajv';
import { SchemaObject } from './interfaces';
import { sensorsCreateSchema, sensorsRetrieveParamsSchema } from './sensors_data';
import { sensorsThresholdCreate } from './sensors_threshold';

export const ajvValidator = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
});

// REGISTER SCHEMAS TO VALIDATE HERE
const SCHEMAS: SchemaObject[] = [
  sensorsCreateSchema,
  sensorsRetrieveParamsSchema,
  sensorsThresholdCreate,
];

/**
 * [addSchemas Add json schemas to AJV validator]
 * @param schemas [list of schemas to add]
 */
export function registerSchemas (): void {
  SCHEMAS.forEach(schema => {
    ajvValidator.addSchema(schema, schema.$id);
  });
}

/**
 * [isValid Returns true if a given json is valid for a given schema]
 * @param  json   [the json to validate]
 * @param  schema [the schema to validate it with]
 * @return        [true or fales]
 */
export function validateObject (json: Object, schemaId: string): boolean {
  const valid = ajvValidator.validate(
    schemaId,
    json,
  );
  if (valid === true) {
    return true;
  }

  return false;
}
