import mongoose, { model, Schema, Types } from "mongoose";
import { API_ROLES } from "../constants";

import { IUser, Role } from "../types";

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	brandName: { tyoe: String },
	mobile: { type: String, required: true },
	isSubscribed: { type: Boolean, required: true },
	password: { type: String, required: true },
	isAuthorized: Boolean,
	authorizationToken: String,
	resetToken: String,
	roles: [String],
	createdAt: Date,
	lastLoggedAt: Date,
});

const User = model<IUser>("User", userSchema);

export { User };
