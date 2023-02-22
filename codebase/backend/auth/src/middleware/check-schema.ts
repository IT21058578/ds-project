import { NextFunction, Request, Response } from "express";

import { Schema, checkSchema, validationResult } from "express-validator";
import { HttpStatusCode } from "axios";
import { Middleware } from "express-validator/src/base";

/**
 * An extension of the express-validator checkSchema function.
 * This function checks the given schema, then does appropriate common error handling before
 * sending it further
 * @param schema
 * @returns An array of middleware functions
 */
export const checkSchemaAndHandleErrors = (schema: Schema) => {
	const check = checkSchema(schema);
	const handle = (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.json({ errors: errors.array() })
				.status(HttpStatusCode.BadRequest)
				.send();
		} else {
			next();
		}
	};
	return [check, handle];
};
