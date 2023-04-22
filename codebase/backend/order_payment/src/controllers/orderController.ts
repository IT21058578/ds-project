import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { Order } from "../models";
import { IOrder, IPage } from "../types";

const searchOrders = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to search orders");
		const {
			userId,
			deliveryStatus,
			paymentStatus,
			pageSize = 10,
			pageNum = 1,
			sortCol = "_id",
			sortDir = "asc",
		} = req.body;

		const baseQuery = Order.find({
			...(userId ? { userId } : {}),
			...(paymentStatus ? { paymentStatus } : {}),
			...(deliveryStatus ? { deliveryStatus } : {}),
		});
		const totalElements = await baseQuery.clone().count().exec();
		const pageQuery = baseQuery
			.sort({ [sortCol]: sortDir })
			.skip(pageSize * (pageNum - 1))
			.limit(pageSize);
		const totalPages = await pageQuery.clone().count().exec();
		const orders = await pageQuery.clone().exec();

		const page: IPage = {
			content: orders,
			isFirst: pageNum === 1,
			isLast: pageNum === Math.ceil(totalElements / pageSize),
			pageNum,
			pageSize,
			totalElements,
			totalPages,
			searchOptions: {
				userId,
				paymentStatus,
				deliveryStatus,
			},
			sort: {
				sortDir,
				sortCol,
			},
		};

		return res.status(HttpStatusCode.Ok).send(page);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const getOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to get order");
		const { id } = req.params as { id: string };
		const order = await Order.findById(id).exec();
		if (order === null) throw Error("Order not found");
		else {
			return res.status(HttpStatusCode.Ok).json(order);
		}
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to create order");
		const {
			items,
			paymentDetails,
			shippingDetails,
			userId,
			paymentStatus = "UNPAID",
			deliveryStatus = "NOT_STARTED",
		} = req.body as Partial<IOrder>;

		const order = new Order({
			items,
			userId,
			paymentDetails,
			shippingDetails,
			paymentStatus,
			deliveryStatus,
			createdOn: new Date(),
			lastEditedOn: new Date(),
		});

		const savedOrder = await order.save();
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
		const {
			deliveryStatus,
			paymentStatus,
			items,
			shippingDetails,
			paymentDetails,
		} = req.body as Partial<IOrder>;

		const order = await Order.findById(id).exec();
		if (order === null) throw Error("Order not found");
		else {
			order.deliveryStatus = deliveryStatus || order.deliveryStatus;
			order.paymentStatus = paymentStatus || order.paymentStatus;
			order.items = items || order.items;
			order.shippingDetails = shippingDetails || order.shippingDetails;
			order.paymentDetails = paymentDetails || order.paymentDetails;
			order.lastEditedOn = new Date();
		}

		const savedOrder = await order.save();
		return res.status(HttpStatusCode.Created).json(savedOrder);
	} catch (error) {
		console.log("An error occured: ", error);
		return res.status(HttpStatusCode.InternalServerError).send();
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to delete order");
		const { id } = req.params as { id: string };
		const order = await Order.findByIdAndDelete(id).exec();
		if (order === null) throw Error("Order not found");
		else {
			return res.status(HttpStatusCode.NoContent);
		}
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
