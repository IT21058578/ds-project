import { CustomValidator } from "express-validator";
import Axios from "axios";

import { API_ROLES, INTERNAL_API_KEY } from "./constants";
import { Role } from "./types";

/**
 * The instance of axios that should be used for calling internal apis. Already has the api key configured.
 */
export const axios = Axios.create({
	baseURL: "",
	headers: { Authorization: `Bearer ${INTERNAL_API_KEY}` },
});

/**
 * A custom validator function to be used with express-validator.
 * Validates that the user is giving roles that actually exist within the API
 * @param value - an array of strings
 * @returns a prejected or resolved promise
 */
export const hasValidRoles: CustomValidator = (value: string[]) => {
	return value?.every((role) => API_ROLES.includes(role.toUpperCase() as Role))
		? Promise.resolve("Roles are valid")
		: Promise.reject("Roles are invalid");
};
