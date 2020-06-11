import { SchemaObject } from './interfaces';

export const sensorsThresholdCreate: SchemaObject = {
  $id: '/sensors/threshold',
  additionalProperties: false,
  properties: {
    threshold: {
      type: 'number',
    },
  },
  required: [ 'threshold'],
  type: 'object',
};
