// Database Model Types
export interface IUserDTO {
	id: string;
	firstName: string;
	lastName: string;
	brandName?: string; // Only for seller users
	roles: ("ADMIN" | "SELLER" | "BUYER")[];
	email: string;
	mobile: string;
	isSubscribed: boolean;
	isAuthorized: boolean;
	createdOn: string;
	lastLoggedOn: string;
	updatedOn: string;
}

export interface ISellerRequestDTO {
	id: string;
	userId: string;
	description: string;
}

export interface IReviewDTO {
	id: string;
	userId: string;
	productId: string;
	productName: string;
	createdBy: string;
	createdOn: string;
	review: string;
	rating: number;
}

export interface IProductDTO {
	id: string;
	brandId: string;
	brandName: string;
	name: string;
	price: number;
	imageUrl: string[];
	description: string;
	countInStock: number;
	category: string;
}

export interface IOrderDTO {
	id: string;
	userId: string;
	date: string;
	deliveryStatus: "IN_PROGRESS" | "NOT_STARTED" | "FINISHED";
	paymentStatus: "PAID" | "UNPAID";
	createdOn: string;
	lastUpdatedOn: string;
	items: {
		name: string;
		imageUrl: string;
		qty: number;
		amountPerUnit: number;
	}[];
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

// Order - Checkout requests
//* POST
export interface ICreateOrderResponseData extends IOrderDTO {}

export interface ISearchOrdersResponseData {
	content: IOrderDTO[];
}

//* GET
export interface IGetAllUserOrdersResponseData {
	content: IOrderDTO[];
}

export interface IGetOrderResponseData extends IOrderDTO {}

//* PUT
export interface IUpdateOrderDeliveryStatusResponseData extends IOrderDTO {}

export interface IUpdateOrderPaymentStatusResponseData extends IOrderDTO {}

//* DELETE
export interface IDeleteOrderResponseData {
	// Response is empty
}

// Product - Review requests
//* POST
export interface ICreateProductResponseData extends IProductDTO {}

export interface ICreateReviewResponseData extends IReviewDTO {}

export interface ISearchReviewsResponseData {
	content: IReviewDTO[];
}

export interface ISearchProductsResponseData {
	content: IProductDTO[];
}

//* GET
export interface IGetAllUserReviewsResponseData {
	content: IReviewDTO[];
}

export interface IGetReviewResponseData extends IReviewDTO {}

export interface IGetAllSellerProductsResponseData {
	content: IProductDTO;
}

export interface IGetProductResponseData extends IProductDTO {}

//* PUT
export interface IUpdateReviewResponseData extends IReviewDTO {}

export interface IUpdateProductResponseData extends IProductDTO {}

//* DELETE
export interface IDeleteReviewResponseData {
	//Response is empty
}

export interface IDeleteProductResponseData {
	//Response is empty
}

// User Requests
//* POST
export interface ISearchUsersResponseData {
	content: IUserDTO[];
}

//* GET
export interface IGetUserResponseData extends IUserDTO {}

//* PUT
export interface IEditUserResponseData extends IUserDTO {}

//* DELETE
export interface IDeleteUserResponseData {
	// Response is empty
}

// Cart Requests
//* GET

//* PUT

//* DELETE
