import { Cart } from "./cart-model";
import { ICart } from "./types";

const getCart = async (id: string, userId: string) => {
	const cart = await Cart.findById(id).exec();
	if (cart === null) {
		const newCart = new Cart({
			userId,
			products: [],
		});
		return await newCart.save();
	}
	return cart;
};

const editCart = async ({ id, userId, products }: { id: string } & ICart) => {
	const cart = await Cart.findById(id).exec();
	if (cart === null) {
		const newCart = new Cart({
			userId,
			products,
		});
		return await newCart.save();
	}
	cart.products = products;
	return await cart.save();
};

const deleteCart = async (id: string) => {
	await Cart.findByIdAndDelete(id).exec();
	return;
};

export const CartService = { getCart, editCart, deleteCart };
