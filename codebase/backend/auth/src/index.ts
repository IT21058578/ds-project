import dotenv from "dotenv";
import express, { json, urlencoded } from "express";

import Redis from "ioredis";
import helmet from "helmet";
import Mongoose from "mongoose";

import auth from "./routes/auth-routes";
import token from "./routes/token-routes";
import user from "./routes/user-routes";

import { REDIS_URI, MONGO_URI, PORT, SERVICE } from "./constants";

dotenv.config();

const app = express();

//Confguring express erver
let mongoose: typeof Mongoose | undefined;

app.use(helmet());
app.use(json());
app.use(urlencoded());
app.disable("x-powered-by");
console.log("Configured application");

//Need to attach relevant routes
app.use("/api/auth", auth);
app.use("/api/token", token);
app.use("/api/user", user);
console.log("Attached routes");

//Connect to relevant databases and services
Mongoose.set("strictQuery", false);
console.log({ REDIS_URI, MONGO_URI });
Mongoose.connect(MONGO_URI || "").then((client) => (mongoose = client));
const tokenRedis = new Redis(REDIS_URI || "", { db: 0 });
console.log("Connected to databases and services");

//Start server
app.listen(PORT || 3000, () => {
	console.log(`Started ${SERVICE} service. Listening to port ${PORT}`);
});

export { tokenRedis, mongoose };
