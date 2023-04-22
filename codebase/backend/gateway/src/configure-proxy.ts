import express from "express";
import proxy from "express-http-proxy";
import { routesConfig } from "./route-config";
import { authorizeRequest } from "./middleware/authorize-request";
import initializeLogger from "./logger";
import { ENVIRONMENT } from "./constants";

const log = initializeLogger(__filename.split("\\").pop() || "");

/**
 * Will take in the express app and apply all the proxies necessary along with the
 * required authorization as per the specification of the route config
 * @see route-config.ts
 * @param {Express} app
 */
export const configureProxy = (app: ReturnType<typeof express>) => {
	log.info(`Attaching proxy routes`);
	log.info(`Environment detected was ${ENVIRONMENT}`);
	console.table(routesConfig);
	
	routesConfig.forEach(({ paths, proxyHost, roles }) => {
		paths.forEach((path) => {
			app.use(
				path,
				(req, _res, next) => {
					log.info(`Request url was ${req.baseUrl}`);
					log.info(`Request received to ${proxyHost}${path}'`);
					next();
				},
				authorizeRequest(roles),
				proxy(`${proxyHost}`, {
					proxyReqPathResolver: (req) => `${path}${req.url}`,
				})
			);
		});
	});
};
