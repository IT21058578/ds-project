// Order - Checkout requests
//* POST
export interface ICreateOrderRequestData {
	userId: string;
	date: string;
	deliveryStatus: "IN_PROGRESS" | "NOT_STARTED" | "FINISHED";
	paymentStatus: "PAID" | "UNPAID";
	shippingDetails: {
		firstName: string;
		lastName: string;
		address: {
			firstLine: string;
			secondLine: string;
		};
		city: string;
		state: string;
		postalCode: number;
		country: string;
	};
	paymentDetails: {
		name: string;
		cardNumber: number;
		expDate: string;
		cvv: number;
	};
}

export interface ISearchOrdersRequestData {
	pageNum: number;
	pageSize: number;
	sortCol: string;
	sortDir: "asc" | "desc";
	search?: string;
}

//* GET
export interface IGetAllUserOrdersRequestData {
	userId: string;
}

export interface IGetOrderRequestData {
	orderId: string;
}

//* PUT
export interface IUpdateOrderDeliveryStatusRequestData {
	orderId: string;
	deliveryStatus: "IN_PROGRESS" | "NOT_STARTED" | "FINISHED";
}

export interface IUpdateOrderPaymentStatusRequestData {
	orderId: string;
	paymentStatus: "PAID" | "UNPAID";
}

//* DELETE
export interface IDeleteOrderRequestData {
	orderId: string;
}

// Product - Review requests
//* POST
export interface ICreateProductRequestData {
	brandId: string;
	brandName: string;
	name: string;
	price: number;
	imageUrl: string[];
	description: string;
	countInStock: number;
	category: string;
}

export interface ICreateReviewRequestData {
	userId: string;
	createdBy: string;
	productId: string;
	productName: string;
	comment: string;
	rating: number;
}

export interface ISearchReviewsRequestData {
	pageNum: number;
	pageSize: number;
	sortCol: string;
	sortDir: "asc" | "desc";
	search?: string;
}

export interface ISearchProductsRequestData {
	pageNum: number;
	pageSize: number;
	sortCol: string;
	sortDir: "asc" | "desc";
	search?: string;
}

//* GET
export interface IGetAllUserReviewsRequestData {
	userId: string;
}

export interface IGetReviewRequestData {
	reviewId: string;
}

export interface IGetAllSellerProductsRequestData {
	userId: string;
}

export interface IGetProductRequestData {
	productId: string;
}

//* PUT
export interface IUpdateReviewRequestData {
	reviewId: string;
	rating?: number;
	comment?: string;
}

export interface IUpdateProductRequestData {
	productId: string;
	name?: string;
	price?: number;
	imageUrl?: string[];
	description?: string;
	countInStock?: number;
	category?: string;
}

//* DELETE
export interface IDeleteReviewRequestData {
	reviewId: string;
}

export interface IDeleteProductRequestData {
	productId: string;
}

// User Requests
//* POST
export interface ISearchUsersRequestData {
	pageNum: number;
	pageSize: number;
	sortCol: string;
	sortDir: "asc" | "desc";
	search?: string;
}

//* GET
export interface IGetUserRequestData {
	userId: string;
}

//* PUT
export interface IEditUserRequestData {
	userId: string;
	firstName?: string;
	lastName?: string;
	brandName?: string;
	profileImageUrl?: string;
}

//* DELETE
export interface IDeleteUserRequestData {
	userId: string;
}

// Cart Requests
//* GET

//* PUT

//* DELETE
