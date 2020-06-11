import { SchemaObject } from './interfaces';

export const sensorsCreateSchema: SchemaObject = {
  $id: '/sensors/create',
  additionalProperties: false,
  properties: {
    sensorId: {
      format: 'uuid',
      type: 'string',
    },
    time: {
      type: 'number',
    },
    value: {
      type: 'number',
    },
  },
  required: [ 'sensorId', 'time' ],
  type: 'object',
};

export const sensorsRetrieveParamsSchema: SchemaObject = {
  $id: '/sensors/retrieve',
  additionalProperties: false,
  properties: {
    sensorId: {
      format: 'uuid',
      type: 'string',
    },
    since: {
      type: 'number',
    },
    until: {
      type: 'number',
    },
  },
  required: [ 'sensorId', 'since', 'until' ],
  type: 'object',
};
