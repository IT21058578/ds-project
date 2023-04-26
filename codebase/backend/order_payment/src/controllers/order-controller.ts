import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { IOrder, IOrderPageRequest, IPage, Role } from "../types";
import { OrderService } from "../services/order-service";

const searchOrders = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search orders");
		const orderSearchOptions = req.body as IOrderPageRequest;
		const ordersPage = await OrderService.searchOrders(orderSearchOptions);
		return res.status(HttpStatusCode.Ok).send(ordersPage);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const getOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get order");
		const { id } = req.params as { id: string };
		const order = await OrderService.getOrder(id);
		return res.status(HttpStatusCode.Ok).send(order);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create order");
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as Role[] | undefined;
		const order = req.body as Partial<IOrder>;
		const savedOrder = await OrderService.createOrder(order, {
			id: userId,
			roles: userRoles,
		});
		return res.status(HttpStatusCode.Created).json(savedOrder);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const updateOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to update order");
		const { id } = req.params as { id: string };
		const order = req.body as Partial<IOrder>;
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as Role[] | undefined;
		const updatedOrder = await OrderService.updateOrder(
			{ id, ...order },
			{
				id: userId,
				roles: userRoles,
			}
		);
		return res.status(HttpStatusCode.Ok).json(updatedOrder);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete order");
		const { id } = req.params as { id: string };
		await OrderService.deleteOrder(id);
		return res.status(HttpStatusCode.NoContent).send();
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

export const OrderController = {
	searchOrders,
	getOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};
