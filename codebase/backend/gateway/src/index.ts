import express, { json, urlencoded } from "express";

import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import { PORT, SERVICE, ORIGINS } from "./constants";
import initializeLogger from "./logger";
import { configureProxy } from "./configure-proxy";

const log = initializeLogger(__filename.split("\\").pop() || "");

dotenv.config();

const app = express();

//Confguring express erver
app.use(helmet());
app.use(json());
app.use(urlencoded());
app.disable("x-powered-by");
log.info("Configured application");

//Need to attach relevant routes
configureProxy(app);
log.info("Attached routes");

//Connect to relevant databases and services
log.info("Connected to databases and services");

//Start server
app.listen(PORT || 3000, () => {
	log.info(`Started ${SERVICE} service. Listening to port ${PORT}`);
});
