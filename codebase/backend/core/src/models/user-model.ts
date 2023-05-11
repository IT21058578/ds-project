import mongoose, { model, Schema, Types } from "mongoose";
import { API_ROLES } from "../constants";

import { IUser, Role } from "../types";

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, text: true },
		firstName: { type: String, required: true, text: true },
		lastName: { type: String, required: true, text: true },
		profileImageUrl: { type: String, required: true },
		brandName: { type: String, text: true },
		mobile: { type: String, required: true, text: true },
		isSubscribed: { type: Boolean, required: true },
		password: { type: String, required: true },
		isAuthorized: Boolean,
		authorizationToken: String,
		resetToken: String,
		roles: [String],
		createdAt: Date,
		lastLoggedAt: Date,
		lastEditedAt: Date,
	},
	{ autoIndex: true }
);

userSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

userSchema.set("toJSON", {
	virtuals: true,
});

const User = model<IUser>("User", userSchema);
export { User };
