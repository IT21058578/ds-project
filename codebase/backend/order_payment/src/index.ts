import express, { json, urlencoded } from "express";

import dotenv from "dotenv";
import helmet from "helmet";
import Mongoose from "mongoose";

import { REDIS_URI, MONGO_URI, PORT, SERVICE } from "./constants";

// Routes
import orderRoutes from "./routes/orderRoutes";
import paypalRoutes from "./routes/paypalRoutes";

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
console.log("Attached routes");

//Connect to relevant databases and services
Mongoose.set("strictQuery", false);
console.log({ REDIS_URI, MONGO_URI });
Mongoose.connect(MONGO_URI || "").then((client) => (mongoose = client));
console.log("Connected to databases and services");

app.use("/api/orders/", orderRoutes);
app.use("/api/config/paypal", paypalRoutes);

//Start server
app.listen(PORT || 3000, () => {
	console.log(`Started ${SERVICE} service. Listening to port ${PORT}`);
});

export { mongoose };
