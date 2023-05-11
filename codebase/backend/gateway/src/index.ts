import express, { json, urlencoded } from "express";

import helmet from "helmet";
import dotenv from "dotenv";

import { PORT, SERVICE } from "./constants";
import initializeLogger from "./logger";
import { configureProxy } from "./configure-proxy";
import path from "path";

const log = initializeLogger(__filename.split("\\").pop() || "");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

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

//Start server
app.listen(PORT || 3000, () => {
	log.info(`Started ${SERVICE} service. Listening to port ${PORT}`);
});
