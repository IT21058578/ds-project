import express from "express";
import proxy from "express-http-proxy";
import { routesConfig } from "./route-config";
import { authorizeRequest } from "./middleware/authorize-request";
import initializeLogger from "./logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

/**
 * Will take in the express app and apply all the proxies necessary along with the
 * required authorization as per the specification of the route config
 * @see route-config.ts
 * @param {Express} app
 */
export const configureProxy = (app: ReturnType<typeof express>) => {
	routesConfig.forEach(({ path, proxyHost, roles }) => {
		app.use(
			path,
			(_req, _res, next) => {
				log.info(`Request receive. sending to ${proxyHost}${path}`);
				next();
			},
			authorizeRequest(roles),
			proxy(`${proxyHost}`)
		);
	});
};