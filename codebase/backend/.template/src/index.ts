import dotenv from "dotenv";
import express, { json, urlencoded } from "express";

import helmet from "helmet";
import Mongoose from "mongoose";

import { REDIS_URI, MONGO_URI, PORT, SERVICE } from "./constants";

dotenv.config();

const app = express();

//Confguring express erver
app.use(helmet());
app.use(json());
app.use(urlencoded());
app.disable("x-powered-by");
console.log("Configured application");

//Need to attach relevant routes
console.log("Attached routes");

//Connect to relevant databases and services
Mongoose.set("strictQuery", false);
console.log({ REDIS_URI, MONGO_URI });
export const mongoose = await Mongoose.connect(MONGO_URI || "");
console.log("Connected to databases and services");

//Start server
app.listen(PORT || 3000, () => {
	console.log(`Started ${SERVICE} service. Listening to port ${PORT}`);
});
