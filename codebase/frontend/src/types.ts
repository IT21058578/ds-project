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


//products types
export interface Iproduct {
	productID: string;
	productName: string;
	productDescription: string;
	image: string[];
	price: number;
	rating: number;
	review: string;
	countInStock: number;
	brand: string;
	categery: string;
  }

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

//reviews

export interface IReview {
	userID:string;
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


