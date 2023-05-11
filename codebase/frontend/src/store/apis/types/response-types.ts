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
	comment: string;
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
	createdOn: string;
	lastEditedOn: string;
}

export interface IOrderDTO {
	id: string;
	userId: string;
	deliveryStatus: "IN_PROGRESS" | "NOT_STARTED" | "FINISHED";
	paymentStatus: "PAID" | "UNPAID";
	createdOn: string;
	lastEditedOn: string;
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

export interface IPageDTO<T> {
	isLast: boolean;
	isFirst: boolean;
	totalPages: number;
	totalElements: number;
	pageNum: number;
	pageSize: number;
	content: T[];
	searchOptions?: { [key: string]: any };
	sort?: {
		sortDir: "asc" | "desc";
		sortCol: string;
	};
}

export interface ICartDTO {
	id?: string;
	userId?: string;
	items?: {
		qty?: number;
		price?: number;
		name?: string;
		imageUrl?: string;
	}[];
}
