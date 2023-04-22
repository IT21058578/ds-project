import { model, Schema } from "mongoose";
import { IOrder } from "../types";

const orderSchema = new Schema<IOrder>({
	userId: String,
	deliveryStatus: String,
	paymentStatus: String,
	createdOn: Date,
	lastEditedOn: Date,
	items: [
		{
			name: String,
			imageUrl: String,
			qty: Number,
			amountPerUnit: Number,
		},
	],
	shippingDetails: {
		firstName: String,
		lastName: String,
		address: {
			firstLine: String,
			secondLine: String,
		},
		city: String,
		state: String,
		postalCode: Number,
		country: String,
	},
	paymentDetails: {
		name: String,
		cardNumber: Number,
		expDate: String,
		cvv: Number,
	},
});

orderSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

orderSchema.set("toJSON", {
	virtuals: true,
});

export const Order = model("Order", orderSchema);
