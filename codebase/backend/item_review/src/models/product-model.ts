import { Schema, Types, model } from "mongoose";
import { IProduct, IReview } from "../types/product";

const reviewSchema = new Schema<IReview>({
	userId: Types.ObjectId,
	productId: Types.ObjectId,
	createdOn: Date,
	lastEditedOn: Date,
	rating: Number,
	comment: String,
});

reviewSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

reviewSchema.set("toJSON", {
	virtuals: true,
});

const productSchema = new Schema<IProduct>({
	brandId: Types.ObjectId,
	category: String,
	countInStock: Number,
	description: String,
	imageUrl: [String],
	name: String,
	price: Number,
	createdOn: Date,
	lastEditedOn: Date,
});

productSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

productSchema.set("toJSON", {
	virtuals: true,
});

const Review = model<IReview>("User", reviewSchema);
const Product = model<IProduct>("Product", productSchema);

export { Review, Product };
