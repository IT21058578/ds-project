import express, { json, urlencoded } from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import Mongoose from "mongoose";
import cors from "cors";

import { REDIS_URI, MONGO_URI, PORT, SERVICE, ALL_HOSTS } from "./constants";
import cart from "./cart-routes";

dotenv.config();

const app = express();

//Confguring express erver
let mongoose: typeof Mongoose | undefined;

app.use(cors({ origin: ALL_HOSTS }));

app.use((req, _res, next) => {
	console.log(`Request received by ${SERVICE} service to '${req.originalUrl}'`);
	next();
});

app.use(helmet());
app.use(json());
app.use(urlencoded());
app.disable("x-powered-by");
console.log("Configured application");

//Need to attach relevant routes
app.use("/api/carts", cart);
console.log("Attached routes");

//Connect to relevant databases and services
Mongoose.set("strictQuery", false);
console.log({ REDIS_URI, MONGO_URI });
Mongoose.connect(MONGO_URI || "").then((client) => (mongoose = client));
console.log("Connected to databases and services");

//Start server
app.listen(PORT || 3000, () => {
	console.log(`Started ${SERVICE} service. Listening to port ${PORT}`);
});

export { mongoose };
