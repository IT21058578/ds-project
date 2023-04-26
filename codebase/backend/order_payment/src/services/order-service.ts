import axios from "axios";
import { Order } from "../models";
import {
	IAuthorizedUser,
	IOrder,
	IOrderPageRequest,
	IPage,
	Role,
} from "../types";
import { ITEM_REVIEW_HOST } from "../constants";

const searchOrders = async (orderSearchOptions: IOrderPageRequest) => {
	const {
		pageSize = 10,
		pageNum = 1,
		sortCol = "_id",
		sortDir = "asc",
		...searchOptions
	} = orderSearchOptions;

	console.log("Building multiple queries");
	const baseQuery = Order.find({
		...(searchOptions.userId ? { userId: searchOptions.userId } : {}),
		...(searchOptions.paymentStatus
			? { paymentStatus: searchOptions.paymentStatus }
			: {}),
		...(searchOptions.deliveryStatus
			? { deliveryStatus: searchOptions.deliveryStatus }
			: {}),
		...(searchOptions.includesItemId
			? { items: { $elemMatch: { id: searchOptions.includesItemId } } }
			: {}),
		...(searchOptions.excludesItemId
			? {
					$nor: [
						{ items: { $elemMatch: { id: searchOptions.includesItemId } } },
					],
			  }
			: {}),
		...(searchOptions.createdOn ? { createdOn: searchOptions.createdOn } : {}),
		...(searchOptions.createdBefore
			? { createdOn: { $lt: searchOptions.createdBefore } }
			: {}),

		...(searchOptions.createdAfter
			? { createdOn: { $gt: searchOptions.createdAfter } }
			: {}),
		...(searchOptions.lastEditedOn
			? { lastEditedOn: searchOptions.lastEditedOn }
			: {}),
		...(searchOptions.lastEditedBefore
			? { lastEditedOn: { $lt: searchOptions.lastEditedBefore } }
			: {}),
		...(searchOptions.lastEditedAfter
			? { lastEditedOn: { $gt: searchOptions.lastEditedAfter } }
			: {}),
	});
	const pageQuery = baseQuery
		.sort({ [sortCol]: sortDir })
		.skip(pageSize * (pageNum - 1))
		.limit(pageSize);

	console.log("Executing multiple queries");
	const totalElementsPromise = baseQuery.clone().count().exec();
	const totalPagesPromise = pageQuery.clone().count().exec();
	const ordersPromise = pageQuery.clone().exec();
	const [totalElements, totalPages, orders] = await Promise.all([
		totalElementsPromise,
		totalPagesPromise,
		ordersPromise,
	]);

	const page: IPage = {
		content: orders,
		isFirst: pageNum === 1,
		isLast: pageNum === Math.ceil(totalElements / pageSize),
		pageNum,
		pageSize,
		totalElements,
		totalPages,
		searchOptions,
		sort: {
			sortDir,
			sortCol,
		},
	};

	return page;
};

// Only buyers can create
const createOrder = async (order: Partial<IOrder>, user: IAuthorizedUser) => {
	// Validate all items are exist
	if (!order.items) throw Error("Order is empty");
	const getItemPromises = order.items.map(({ id }) =>
		axios.get(`${ITEM_REVIEW_HOST}/products/${id}`)
	);
	const itemResponses = await Promise.all(getItemPromises);

	order.userId = user.id;
	order.createdOn = new Date();
	order.paymentStatus = "UNPAID";
	order.deliveryStatus = "NOT_STARTED";

	const newOrder = new Order(order);
	return (await newOrder.save()).toObject;
};

// Only owners can edit
const updateOrder = async (order: Partial<IOrder>, user: IAuthorizedUser) => {
	const existingOrder = await Order.findById(order.id).exec();
	if (existingOrder === null) throw Error("Product does not exist");

	console.log("Checking whether user has ownership");
	if (user.id === order.userId || user.roles?.includes(Role.ADMIN)) {
		throw Error("User does not have access to this product");
	}

	existingOrder.deliveryStatus =
		order.deliveryStatus || existingOrder.deliveryStatus;
	existingOrder.paymentStatus =
		order.paymentStatus || existingOrder.paymentStatus;
	existingOrder.items = order.items || existingOrder.items;
	existingOrder.shippingDetails =
		order.shippingDetails || existingOrder.shippingDetails;
	existingOrder.paymentDetails =
		order.paymentDetails || existingOrder.paymentDetails;
	existingOrder.lastEditedOn = new Date();

	return (await existingOrder.save()).toObject;
};

// Only admins can delete
const deleteOrder = async (id: string) => {
	await Order.findByIdAndDelete(id).exec();
	return;
};

const getOrder = async (id: string) => {
	console.log("Getting order with id:", id);
	const existingOrder = await Order.findById(id).exec();
	if (existingOrder === null) throw Error("Order does not exist");
	return existingOrder.toObject();
};

export const OrderService = {
	getOrder,
	deleteOrder,
	updateOrder,
	createOrder,
	searchOrders,
};
