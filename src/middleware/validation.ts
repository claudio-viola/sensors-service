import { validateObject } from '../controllers/schemas';

/**
 * [schemaValidatorMiddleware Given a schema id validates the body of a request]
 * @param  schemaId [The schema id to be used to validate]
 * @return          [void]
 */
export function schemaValidator (schemaId: string) {

  return (req, res, next) => {
    if (req.body !== null && req.body !== undefined) {
      const validationResult: boolean = validateObject(req.body, schemaId);
      if (validationResult === true) {
        next();
      } else {
        res.status(400).json();
      }
    } else {
      res.status(400).json();

      return;
    }
  };
}

/**
 * [paramsValidator Given a schema id validates the parameters of a request]
 * @param  schemaId [The schema id to be used to validate]
 * @return          [void]
 */
export function paramsValidator (schemaId: string) {

  return (req, res, next) => {
    if (req.query !== null && req.query !== undefined) {
      const validationResult: boolean = validateObject(req.query, schemaId);
      if (validationResult === true) {
        next();
      } else {
        res.status(400).json();
      }
    } else {
      res.status(400).json();

      return;
    }
  };
}
