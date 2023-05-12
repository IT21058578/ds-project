import {
	CustomerListTableColumns,
	EDeliveryStatusOptions,
	EPaymentStatusOptions,
	OrderTableColumns,
	ProductsListTableColumns,
	ReviewListTableColumns,
	SellerListTableColumns,
} from "./constants/constants";
import { store } from "./store/store";

/* UI */
export type NavLinkItem = { label: string; link?: string };
export type NavLinkItemWithIcon = NavLinkItem & { icon?: React.ReactNode };

/* Store */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ApiRole = "ADMIN" | "SELLER" | "BUYER";

export interface IAuthState {
	user?: IUser;
	accessToken?: string;
	refreshToken?: string;
}

export interface IUser {
	firstName: string;
	lastName: string;
	roles: ApiRole[];
	email: string;
	mobile: string;
	id: string;
	isSubscribed: boolean;
	isAuthorized: boolean;
}

export interface IEndpoint {
	url: string;
	method: "post" | "delete" | "put" | "get" | "patch";
}

/* Api Responses and Requests */
export interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
}

export interface IRegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	mobile: string;
	dateOfBirth: string;
	isSubscribed: boolean;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface Iproduct {
	id: string;
	brandId: string;
	name: string;
	price: number;
	imageUrl: string[];
	description: string;
	countInStock: number;
	category: string;
	createdOn: Date;
	lastEditedOn: Date;
}

/**
 * Represents a product review
 */
export interface IReview {
	id: string;
	userId: string;
	productId: string;
	createdOn: Date;
	comment: string;
	lastEditedOn: Date;
	rating: number;
}

// //products types
// export interface Iproduct {
// 	productID: string;
// 	productName: string;
// 	productDescription: string;
// 	image: string[];
// 	price: number;
// 	rating: number;
// 	review: string;
// 	countInStock: number;
// 	brand: string;
// 	categery: string;
//   }

//product initial state
export interface productState {
    products?: Iproduct[];
	product?: Iproduct | null;
  }

//cart state

export interface CartItem extends Iproduct {
	quantity: number;
  }

export interface cartState {
	items: CartItem[];
	totalPrice: number;
    totalCount: number;
  }

//no result

export interface INoResultsImg {
	imgUrl: string;
	title: string;
  }

// //reviews

// export interface IReview {
// 	userID:string;
// 	productName: string;
// 	review: string;
// 	rating: number;
//   }

export interface IShippingAddress {
	firstName: string;
	lastName: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	postalCode: number;
	country: string;
}

export interface ICard {
	name: string;
	cardNumber: number;
	expDate: string;
	cvv: number;
}

export interface IForgotPasswordRequest {
	email: string;
}

export interface IResetPasswordRequest {
	resetToken: string;
	password: string;
}
export interface IOrder {
	orderId: string;
	userId: string;
	date: string;
	deliveryFee: number;
	payment: string;
	total: number;
	deliveryStatus: string;
	history: {
		image: string;
		productName: string;
		amount: number;
		price: number;
	}[];
}

export interface IPageRequest {
	pageSize?: number;
	pageNum?: number;
	sortDir?: "asc" | "desc";
	sortCol?: string;
	search?: string;
}

export interface IReview {
	userId: string;
	productName: string;
	review: string;
	rating: number;
}

export interface IShippingAddress {
	firstName: string;
	lastName: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	postalCode: number;
	country: string;
}

export interface ICard {
	name: string;
	cardNumber: number;
	expDate: string;
	cvv: number;
}

export interface IProduct {
	productId: string;
	productName: string;
	productDescription: string;
	image: string[];
	price: number;
	rating: number;
	review: string;
	countInStock: number;
	brand: string;
	category: string;
}

export type OrderTableColumn =
	typeof OrderTableColumns[keyof typeof OrderTableColumns];

export type ProductListTableColumn =
	typeof ProductsListTableColumns[keyof typeof ProductsListTableColumns];

export type CustomerListTableColumn =
	typeof CustomerListTableColumns[keyof typeof CustomerListTableColumns];

export type SellerListTableColumn =
	typeof SellerListTableColumns[keyof typeof SellerListTableColumns];

export type ReviewListTableColumn =
	typeof ReviewListTableColumns[keyof typeof ReviewListTableColumns];

export type OrderTableItem = {
	[K in OrderTableColumn]: string;
} & { deliveryStatus: DeliverStatusOptionsKeyType };

export type ProductListTableItem = {
	[K in ProductListTableColumn]: string;
};

export type CustomerListTableItem = {
	[K in CustomerListTableColumn]: string;
};

export type SellerListTableItem = {
	[K in SellerListTableColumn]: string;
};

export type ReviewListTableItem = {
	[K in ReviewListTableColumn]: string;
};

export type DeliverStatusOptionsKeyType =
	typeof EDeliveryStatusOptions[keyof typeof EDeliveryStatusOptions]["value"];

export type PaymentStatusOptionsKeyType =
	typeof EPaymentStatusOptions[keyof typeof EPaymentStatusOptions]["value"];