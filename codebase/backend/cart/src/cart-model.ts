import mongoose, { model, Schema, Types } from "mongoose";

import { ICart } from "./types";

const productSchema = new Schema<ICart["products"][number]>({
	id: String,
	name: String,
	price: Number,
	qty: Number,
});

const cartSchema = new Schema<ICart>({
	userId: String,
	products: [productSchema],
});

const Cart = model<ICart>("Cart", cartSchema);

export { Cart };
