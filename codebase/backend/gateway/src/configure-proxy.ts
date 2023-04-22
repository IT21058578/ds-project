import express from "express";
import proxy from "express-http-proxy";
import { routesConfig } from "./route-config";
import {
	authorizeRequest,
	isRequestAuthorized,
} from "./middleware/authorize-request";
import initializeLogger from "./logger";
import { ENVIRONMENT } from "./constants";
import { Role, UserErrorMessage } from "./types";
import { HttpStatusCode } from "axios";

const log = initializeLogger(__filename.split("\\").pop() || "");

/**
 * Will take in the express app and apply all the proxies necessary along with the
 * required authorization as per the specification of the route config
 * @see route-config.ts
 * @param {Express} app
 */
export const configureProxy = (app: ReturnType<typeof express>) => {
	log.info("Attaching proxy routes");
	log.info(`Environment detected was ${ENVIRONMENT}. Routes are as follows`);

	routesConfig.forEach(({ endpoints, host }) => {
		endpoints.forEach(([path, method, roles]) => {
			console.log(`${host} --- ${path} ${method ? `:: ${method}` : ""}`);
			app.use(
				path,
				async (req, res, next) => {
					const toPath = `${host}${req.originalUrl}`;
					const proxyPath = `${host}${path}`;

					log.info(`Request url was ${req.originalUrl}`);
					log.info(`Attempting to forward request to ${proxyPath}'`);

					if (proxyPath.startsWith(toPath) && method === req.method && roles) {
						log.info("Trying to access a protected route");
						if (
							!(await isRequestAuthorized(roles, req.headers.authorization))
						) {
							log.info("User does not have appropriate permissions");
							return res
								.status(HttpStatusCode.Unauthorized)
								.send(UserErrorMessage.INVALID_CREDENTIALS);
						} else {
							log.info("User has appropriate permissions");
						}
					} else {
						log.info("Route is not protected");
					}
					next();
				},
				proxy(`${host}`, {
					proxyReqPathResolver: (req) => `${path}${req.url}`,
				})
			);
		});
	});
};
