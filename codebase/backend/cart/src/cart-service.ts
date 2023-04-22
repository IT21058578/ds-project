import { Cart } from "./cart-model";
import { ICart } from "./types";

const getCart = async (userId: string) => {
	let cart = await Cart.findOne({ userId }).exec();
	if (cart === null) {
		cart = new Cart({ userId, products: [] });
		return (await cart.save()).toObject();
	}
	return cart.toObject();
};

const editCart = async (
	userId: string,
	products: Partial<ICart>["products"]
) => {
	const cart = await Cart.findOne({ userId }).exec();
	if (cart === null) throw Error("Card does not exist");
	cart.products = products || [];
	return (await cart.save()).toObject();
};

const deleteCart = async (userId: string) => {
	const cart = await Cart.findOneAndDelete({ userId }).exec();
	if (cart === null) throw Error("Card does not exist");
	return;
};

export const CartService = { getCart, editCart, deleteCart };
