import { NextFunction, Request, Response } from "express";

import { Schema, checkSchema, validationResult } from "express-validator";
import { HttpStatusCode } from "axios";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

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
			log.info(`Request to ${req.url} rejected due to being a bad request`);
			return res
				.status(HttpStatusCode.BadRequest)
				.json({ errors: errors.array() });
		} else {
			log.info(`Request to ${req.url} has a valid schema`);
			next();
		}
	};
	return [check, handle];
};
